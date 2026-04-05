"use client";
/**
 * PretextWrap — A React component that ports the Pretext "dynamic-layout" demo.
 * Text reflows around SVG logo obstacles in real-time as you resize or click logos.
 * Original: https://github.com/chenglou/pretext  (MIT)
 */
import React, { useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Point = { x: number; y: number };
type Rect = { x: number; y: number; width: number; height: number };
type Interval = { left: number; right: number };

// ─── Geometry helpers (ported from wrap-geometry.ts) ──────────────────────────

function getPolygonXsAtY(points: Point[], y: number): number[] {
  const xs: number[] = [];
  let a = points[points.length - 1];
  if (!a) return xs;
  for (let i = 0; i < points.length; i++) {
    const b = points[i]!;
    if ((a.y <= y && y < b.y) || (b.y <= y && y < a.y)) {
      xs.push(a.x + ((y - a.y) * (b.x - a.x)) / (b.y - a.y));
    }
    a = b;
  }
  xs.sort((a, b) => a - b);
  return xs;
}

function isPointInPolygon(points: Point[], x: number, y: number): boolean {
  let inside = false;
  for (let i = 0, prev = points.length - 1; i < points.length; prev = i++) {
    const a = points[i]!;
    const b = points[prev]!;
    if (((a.y > y) !== (b.y > y)) && (x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x))
      inside = !inside;
  }
  return inside;
}

function transformWrapPoints(pts: Point[], rect: Rect, angle: number): Point[] {
  if (angle === 0) return pts.map(p => ({ x: rect.x + p.x * rect.width, y: rect.y + p.y * rect.height }));
  const cx = rect.x + rect.width / 2, cy = rect.y + rect.height / 2;
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return pts.map(p => {
    const lx = (p.x - 0.5) * rect.width, ly = (p.y - 0.5) * rect.height;
    return { x: cx + lx * cos - ly * sin, y: cy + lx * sin + ly * cos };
  });
}

function getPolygonInterval(points: Point[], bandTop: number, bandBottom: number, hPad: number, vPad: number): Interval | null {
  const startY = Math.floor(bandTop - vPad), endY = Math.ceil(bandBottom + vPad);
  let left = Infinity, right = -Infinity;
  for (let y = startY; y <= endY; y++) {
    const xs = getPolygonXsAtY(points, y + 0.5);
    for (let i = 0; i + 1 < xs.length; i += 2) {
      if (xs[i]! < left) left = xs[i]!;
      if (xs[i + 1]! > right) right = xs[i + 1]!;
    }
  }
  if (!Number.isFinite(left)) return null;
  return { left: left - hPad, right: right + hPad };
}

function carveSlots(base: Interval, blocked: Interval[]): Interval[] {
  let slots: Interval[] = [base];
  for (const iv of blocked) {
    const next: Interval[] = [];
    for (const s of slots) {
      if (iv.right <= s.left || iv.left >= s.right) { next.push(s); continue; }
      if (iv.left > s.left) next.push({ left: s.left, right: iv.left });
      if (iv.right < s.right) next.push({ left: iv.right, right: s.right });
    }
    slots = next;
  }
  return slots.filter(s => s.right - s.left >= 24);
}

async function makeWrapHull(src: string, smoothRadius: number): Promise<Point[]> {
  const image = new Image();
  image.src = src;
  await image.decode();
  const aspect = image.naturalWidth / image.naturalHeight;
  const maxDim = 320;
  const w = aspect >= 1 ? maxDim : Math.max(64, Math.round(maxDim * aspect));
  const h = aspect >= 1 ? Math.max(64, Math.round(maxDim / aspect)) : maxDim;
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(image, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);
  const lefts: (number | null)[] = Array(h).fill(null);
  const rights: (number | null)[] = Array(h).fill(null);
  for (let y = 0; y < h; y++) {
    let l = -1, r = -1;
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3]! < 12) continue;
      if (l === -1) l = x;
      r = x;
    }
    if (l !== -1) { lefts[y] = l; rights[y] = r + 1; }
  }
  const validRows: number[] = [];
  for (let y = 0; y < h; y++) if (lefts[y] !== null) validRows.push(y);
  if (!validRows.length) throw new Error("No opaque pixels");
  let bL = Infinity, bR = -Infinity;
  const bT = validRows[0]!, bB = validRows[validRows.length - 1]!;
  for (const y of validRows) { if (lefts[y]! < bL) bL = lefts[y]!; if (rights[y]! > bR) bR = rights[y]!; }
  const bW = Math.max(1, bR - bL), bH = Math.max(1, bB - bT);
  const sL: number[] = Array(h).fill(0), sR: number[] = Array(h).fill(0);
  for (const y of validRows) {
    let lSum = 0, rSum = 0, cnt = 0;
    for (let o = -smoothRadius; o <= smoothRadius; o++) {
      const sy = y + o;
      if (sy < 0 || sy >= h || lefts[sy] == null) continue;
      lSum += lefts[sy]!; rSum += rights[sy]!; cnt++;
    }
    if (cnt === 0) { sL[y] = 0; sR[y] = w; continue; }
    sL[y] = lSum / cnt; sR[y] = rSum / cnt;
  }
  const step = Math.max(1, Math.floor(validRows.length / 52));
  const sampled: number[] = [];
  for (let i = 0; i < validRows.length; i += step) sampled.push(validRows[i]!);
  if (sampled[sampled.length - 1] !== validRows[validRows.length - 1]) sampled.push(validRows[validRows.length - 1]!);
  const points: Point[] = [];
  for (const y of sampled) points.push({ x: (sL[y]! - bL) / bW, y: (y + 0.5 - bT) / bH });
  for (let i = sampled.length - 1; i >= 0; i--) { const y = sampled[i]!; points.push({ x: (sR[y]! - bL) / bW, y: (y + 0.5 - bT) / bH }); }
  return points;
}

// ─── Main Component ──────────────────────────────────────────────────────────

const BODY_COPY = `You can see the future first in San Francisco. Over the past year, the talk of the town has shifted from $10 billion compute clusters to $100 billion clusters to trillion-dollar clusters. Every six months another zero is added to the boardroom plans. Behind the scenes, there's a fierce scramble to secure every power contract still available for the rest of the decade, every voltage transformer that can possibly be procured. American big business is gearing up to pour trillions of dollars into a long-unseen mobilization of American industrial might. By the end of the decade, American electricity production will have grown tens of percent; from the shale fields of Pennsylvania to the solar farms of Nevada, hundreds of millions of GPUs will hum. The AGI race has begun. We are building machines that can think and reason. By 2025 and 2026, these machines will outpace college graduates. By the end of the decade, they will be smarter than you or I; we will have superintelligence, in the true sense of the word. Along the way, national security forces not seen in half a century will be unleashed, and before long, The Project will be on. If we're lucky, we'll be in an all-out race with the CCP; if we're unlucky, an all-out war. Everyone is now talking about AI, but few have the faintest glimmer of what is about to hit them.`;

const HEADLINE = "SITUATIONAL AWARENESS";
const CREDIT = "Leopold Aschenbrenner";
const BODY_FONT = '20px "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, serif';
const BODY_LINE_HEIGHT = 32;
const HEADLINE_FAMILY = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, serif';

interface PretextWrapProps {
  className?: string;
}

export function PretextWrap({ className }: PretextWrapProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mountedRef = useRef(false);

  const init = useCallback(async () => {
    const stage = stageRef.current;
    if (!stage || mountedRef.current) return;
    mountedRef.current = true;

    // Dynamic import of pretext (client-only)
    const { prepareWithSegments, layoutNextLine, walkLineRanges } = await import("@chenglou/pretext");

    // Preload hulls
    const [openaiHull, claudeHull] = await Promise.all([
      makeWrapHull("/openai-symbol.svg", 6),
      makeWrapHull("/claude-symbol.svg", 6),
    ]);
    const [openaiHit, claudeHit] = await Promise.all([
      makeWrapHull("/openai-symbol.svg", 3),
      makeWrapHull("/claude-symbol.svg", 5),
    ]);

    // Prepare text once
    const preparedByKey = new Map<string, ReturnType<typeof prepareWithSegments>>();
    function getPrepared(text: string, font: string) {
      const key = `${font}::${text}`;
      const cached = preparedByKey.get(key);
      if (cached) return cached;
      const p = prepareWithSegments(text, font);
      preparedByKey.set(key, p);
      return p;
    }
    const preparedBody = getPrepared(BODY_COPY, BODY_FONT);
    const preparedCredit = getPrepared(CREDIT, '12px "Helvetica Neue", Helvetica, Arial, sans-serif');
    let creditWidth = 0;
    walkLineRanges(preparedCredit, 100_000, (line: { width: number }) => { creditWidth = line.width; });
    creditWidth = Math.ceil(creditWidth);

    // Animation state
    const logoAngles = { openai: 0, claude: 0 };
    const logoSpins: Record<string, { from: number; to: number; start: number; duration: number } | null> = { openai: null, claude: null };
    let hoveredLogo: string | null = null;
    const pointer = { x: -Infinity, y: -Infinity };

    function easeSpin(t: number) { const o = 1 - t; return 1 - o * o * o; }

    function updateSpin(key: string, now: number) {
      const spin = logoSpins[key];
      if (!spin) return false;
      const progress = Math.min(1, (now - spin.start) / spin.duration);
      logoAngles[key as keyof typeof logoAngles] = spin.from + (spin.to - spin.from) * easeSpin(progress);
      if (progress >= 1) { logoAngles[key as keyof typeof logoAngles] = spin.to; logoSpins[key] = null; return false; }
      return true;
    }

    // Fit headline font size via binary search
    function fitHeadline(maxWidth: number, pageWidth: number) {
      let low = Math.ceil(Math.max(22, pageWidth * 0.026));
      let high = Math.floor(Math.min(94.4, Math.max(55.2, pageWidth * 0.055)));
      let best = low;
      while (low <= high) {
        const size = Math.floor((low + high) / 2);
        const font = `700 ${size}px ${HEADLINE_FAMILY}`;
        const prepared = getPrepared(HEADLINE, font);
        let breaksWord = false;
        walkLineRanges(prepared, maxWidth, (line: { end: { graphemeIndex: number } }) => { if (line.end.graphemeIndex !== 0) breaksWord = true; });
        if (!breaksWord) { best = size; low = size + 1; } else { high = size - 1; }
      }
      return best;
    }

    // Column layout engine
    type PositionedLine = { x: number; y: number; width: number; text: string };
    type LayoutCursor = { segmentIndex: number; graphemeIndex: number };

    function layoutColumn(
      prepared: ReturnType<typeof prepareWithSegments>,
      startCursor: LayoutCursor,
      region: Rect,
      lineHeight: number,
      obstacles: { points: Point[]; hPad: number; vPad: number }[],
    ): { lines: PositionedLine[]; cursor: LayoutCursor } {
      let cursor: LayoutCursor = startCursor;
      let lineTop = region.y;
      const lines: PositionedLine[] = [];
      while (lineTop + lineHeight <= region.y + region.height) {
        const blocked: Interval[] = [];
        for (const obs of obstacles) {
          const iv = getPolygonInterval(obs.points, lineTop, lineTop + lineHeight, obs.hPad, obs.vPad);
          if (iv) blocked.push(iv);
        }
        const slots = carveSlots({ left: region.x, right: region.x + region.width }, blocked);
        if (!slots.length) { lineTop += lineHeight; continue; }
        let slot = slots[0]!;
        for (let i = 1; i < slots.length; i++) {
          if (slots[i]!.right - slots[i]!.left > slot.right - slot.left) slot = slots[i]!;
        }
        const width = slot.right - slot.left;
        const line = layoutNextLine(prepared, cursor, width);
        if (!line) break;
        lines.push({ x: Math.round(slot.left), y: Math.round(lineTop), width: line.width, text: line.text });
        cursor = line.end;
        lineTop += lineHeight;
      }
      return { lines, cursor };
    }

    // DOM element pools
    const headlineEls: HTMLSpanElement[] = [];
    const bodyEls: HTMLSpanElement[] = [];
    const headlineContainer = document.createElement("h1");
    headlineContainer.className = "pretext-headline";
    const creditEl = document.createElement("p");
    creditEl.className = "pretext-credit";
    creditEl.textContent = CREDIT;
    const openaiLogo = document.createElement("img");
    openaiLogo.src = "/openai-symbol.svg"; openaiLogo.alt = "OpenAI"; openaiLogo.draggable = false;
    openaiLogo.className = "pretext-logo pretext-logo--openai";
    const claudeLogo = document.createElement("img");
    claudeLogo.src = "/claude-symbol.svg"; claudeLogo.alt = "Claude"; claudeLogo.draggable = false;
    claudeLogo.className = "pretext-logo pretext-logo--claude";

    stage.append(headlineContainer, creditEl, openaiLogo, claudeLogo);

    function syncPool(pool: HTMLSpanElement[], count: number, className: string, parent: HTMLElement = stage!) {
      while (pool.length < count) { const el = document.createElement("span"); el.className = className; pool.push(el); parent.appendChild(el); }
      while (pool.length > count) { pool.pop()!.remove(); }
    }

    // Hits for click detection
    let currentHits: { openai: Point[]; claude: Point[] } = { openai: [], claude: [] };

    function commitFrame(now: number): boolean {
      const pageWidth = stage!.clientWidth;
      const pageHeight = stage!.clientHeight;
      const animating = updateSpin("openai", now) || updateSpin("claude", now);
      const isNarrow = pageWidth < 760;
      const gutter = isNarrow ? Math.round(Math.max(18, Math.min(28, pageWidth * 0.06))) : Math.round(Math.max(52, pageWidth * 0.048));
      const centerGap = isNarrow ? 0 : Math.round(Math.max(28, pageWidth * 0.025));
      const columnWidth = isNarrow ? Math.round(Math.min(pageWidth - gutter * 2, 430)) : Math.round((pageWidth - gutter * 2 - centerGap) / 2);

      // Headline
      const headlineTop = isNarrow ? 28 : Math.round(Math.max(42, pageWidth * 0.04, 72));
      const headlineWidth = pageWidth - gutter * 2;
      const headlineFontSize = isNarrow ? Math.min(48, fitHeadline(headlineWidth, pageWidth)) : fitHeadline(Math.min(headlineWidth, Math.max(columnWidth, pageWidth * 0.5)), pageWidth);
      const headlineLineHeight = Math.round(headlineFontSize * 0.92);
      const headlineFont = `700 ${headlineFontSize}px ${HEADLINE_FAMILY}`;

      // Logos
      const openaiShrinkT = Math.max(0, Math.min(1, (960 - pageWidth) / 260));
      const OPENAI_SIZE = isNarrow ? Math.round(Math.min(138, pageWidth * 0.34)) : Math.round(Math.min(400 - openaiShrinkT * 56, pageHeight * 0.43));
      const claudeSize = isNarrow ? Math.round(Math.min(92, pageWidth * 0.23, pageHeight * 0.11)) : Math.round(Math.max(276, Math.min(500, pageWidth * 0.355, pageHeight * 0.45)));
      const openaiRect: Rect = {
        x: gutter - Math.round(OPENAI_SIZE * (isNarrow ? 0.22 : 0.3)),
        y: pageHeight - gutter - OPENAI_SIZE + Math.round(OPENAI_SIZE * (isNarrow ? 0.08 : 0.2)),
        width: OPENAI_SIZE, height: OPENAI_SIZE,
      };
      const claudeRect: Rect = {
        x: isNarrow ? pageWidth - gutter - Math.round(claudeSize * 0.88) : pageWidth - Math.round(claudeSize * 0.69),
        y: isNarrow ? 4 : -Math.round(claudeSize * 0.22),
        width: claudeSize, height: claudeSize,
      };

      // Transform hulls
      const openaiWrap = transformWrapPoints(openaiHull, openaiRect, logoAngles.openai);
      const claudeWrap = transformWrapPoints(claudeHull, claudeRect, logoAngles.claude);
      const lh = BODY_LINE_HEIGHT;
      const openaiObs = { points: openaiWrap, hPad: Math.round(lh * 0.82), vPad: Math.round(lh * 0.26) };
      const claudeObs = { points: claudeWrap, hPad: Math.round(lh * 0.28), vPad: Math.round(lh * 0.12) };

      currentHits = {
        openai: transformWrapPoints(openaiHit, openaiRect, logoAngles.openai),
        claude: transformWrapPoints(claudeHit, claudeRect, logoAngles.claude),
      };

      // Headline layout
      const headlinePrepared = getPrepared(HEADLINE, headlineFont);
      const headlineRegion: Rect = { x: gutter, y: headlineTop, width: headlineWidth, height: pageHeight - headlineTop - gutter };
      const headlineResult = layoutColumn(headlinePrepared, { segmentIndex: 0, graphemeIndex: 0 }, headlineRegion, headlineLineHeight, [openaiObs]);
      const headlineBottom = headlineResult.lines.length ? Math.max(...headlineResult.lines.map(l => l.y + headlineLineHeight)) : headlineTop;

      // Credit
      const creditGap = Math.round(Math.max(14, lh * 0.6));
      const creditTop = headlineBottom + creditGap;
      const copyTop = creditTop + 16 + Math.round(Math.max(20, lh * 0.9));

      // Body columns
      let bodyLines: PositionedLine[] = [];
      if (isNarrow) {
        const bodyRegion: Rect = { x: Math.round((pageWidth - columnWidth) / 2), y: copyTop, width: columnWidth, height: Math.max(0, pageHeight - copyTop - gutter) };
        bodyLines = layoutColumn(preparedBody, { segmentIndex: 0, graphemeIndex: 0 }, bodyRegion, lh, [claudeObs, openaiObs]).lines;
      } else {
        const headlineRects = headlineResult.lines.map(l => ({ x: l.x, y: l.y, width: Math.ceil(l.width), height: headlineLineHeight }));
        const titleObs = { points: [] as Point[], hPad: Math.round(lh * 0.95), vPad: Math.round(lh * 0.3) };
        // For title obstacle, use rects directly
        const leftRegion: Rect = { x: gutter, y: copyTop, width: columnWidth, height: pageHeight - copyTop - gutter };
        const leftResult = layoutColumn(preparedBody, { segmentIndex: 0, graphemeIndex: 0 }, leftRegion, lh, [openaiObs]);
        const rightRegion: Rect = { x: gutter + columnWidth + centerGap, y: headlineTop, width: columnWidth, height: pageHeight - headlineTop - gutter };
        // Build title obstacle intervals in-place for right column
        const rightObstacles = [claudeObs, openaiObs];
        const rightResult = layoutColumn(preparedBody, leftResult.cursor, rightRegion, lh, rightObstacles);
        bodyLines = [...leftResult.lines, ...rightResult.lines];
      }

      // Project to DOM
      openaiLogo.style.cssText = `left:${openaiRect.x}px;top:${openaiRect.y}px;width:${openaiRect.width}px;height:${openaiRect.height}px;transform:rotate(${logoAngles.openai}rad)`;
      claudeLogo.style.cssText = `left:${claudeRect.x}px;top:${claudeRect.y}px;width:${claudeRect.width}px;height:${claudeRect.height}px;transform:rotate(${logoAngles.claude}rad)`;

      // Headline spans
      syncPool(headlineEls, headlineResult.lines.length, "pretext-headline-line", headlineContainer);
      for (let i = 0; i < headlineResult.lines.length; i++) {
        const l = headlineResult.lines[i]!;
        const el = headlineEls[i]!;
        el.textContent = l.text;
        el.style.cssText = `left:${l.x}px;top:${l.y}px;font:${headlineFont};line-height:${headlineLineHeight}px`;
      }

      creditEl.style.cssText = `left:${gutter + 4}px;top:${creditTop}px`;

      // Body spans
      syncPool(bodyEls, bodyLines.length, "pretext-line");
      for (let i = 0; i < bodyLines.length; i++) {
        const l = bodyLines[i]!;
        const el = bodyEls[i]!;
        el.textContent = l.text;
        el.style.cssText = `left:${l.x}px;top:${l.y}px;font:${BODY_FONT};line-height:${BODY_LINE_HEIGHT}px`;
      }

      stage!.style.cursor = hoveredLogo ? "pointer" : "";
      return animating || false;
    }

    let scheduled = false;
    function scheduleRender() {
      if (scheduled) return;
      scheduled = true;
      rafRef.current = requestAnimationFrame(function render(now) {
        scheduled = false;
        // Pointer hit test
        hoveredLogo = isPointInPolygon(currentHits.openai, pointer.x, pointer.y) ? "openai" : isPointInPolygon(currentHits.claude, pointer.x, pointer.y) ? "claude" : null;
        if (commitFrame(now)) scheduleRender();
      });
    }

    // Event handlers
    const onResize = () => scheduleRender();
    const onMouseMove = (e: MouseEvent) => { const rect = stage.getBoundingClientRect(); pointer.x = e.clientX - rect.left; pointer.y = e.clientY - rect.top; scheduleRender(); };
    const onClick = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const now = performance.now();
      if (isPointInPolygon(currentHits.openai, x, y)) {
        logoSpins.openai = { from: logoAngles.openai, to: logoAngles.openai - Math.PI, start: now, duration: 900 };
      } else if (isPointInPolygon(currentHits.claude, x, y)) {
        logoSpins.claude = { from: logoAngles.claude, to: logoAngles.claude + Math.PI, start: now, duration: 900 };
      }
      scheduleRender();
    };

    window.addEventListener("resize", onResize);
    stage.addEventListener("mousemove", onMouseMove);
    stage.addEventListener("click", onClick);

    commitFrame(performance.now());

    // Return cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("mousemove", onMouseMove);
      stage.removeEventListener("click", onClick);
      cancelAnimationFrame(rafRef.current);
      stage.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });
    return () => { cleanup?.(); mountedRef.current = false; };
  }, [init]);

  return (
    <section className={`pretext-wrap-section ${className ?? ""}`}>
      <div ref={stageRef} className="pretext-stage" />
      <style>{`
        .pretext-wrap-section {
          --paper: #f6f0e6;
          --ink: #11100d;
          --muted: #4f463b;
          --accent: #d97757;
          position: relative;
          width: 100%;
          overflow: hidden;
          isolation: isolate;
        }
        .dark .pretext-wrap-section {
          --paper: #0e0e10;
          --ink: #e8e4dc;
          --muted: #a09888;
          --accent: #e09070;
        }
        .pretext-stage {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          background: var(--paper);
          color: var(--ink);
          overflow: hidden;
          font-family: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, serif;
          cursor: default;
        }
        .pretext-stage::before {
          content: "";
          position: absolute;
          inset: -10%;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(62% 54% at 16% 82%, rgba(45, 88, 128, 0.16), transparent 69%),
            radial-gradient(44% 34% at 28% 64%, rgba(57, 78, 124, 0.07), transparent 76%);
        }
        .pretext-stage::after {
          content: "";
          position: absolute;
          inset: -10%;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(58% 48% at 86% 16%, rgba(217, 119, 87, 0.18), transparent 70%),
            linear-gradient(135deg, rgba(217, 119, 87, 0.055) 0%, rgba(217, 119, 87, 0.02) 24%, transparent 42%, rgba(45, 88, 128, 0.045) 100%);
        }
        .pretext-headline {
          position: absolute;
          margin: 0;
          font: inherit;
          user-select: text;
          z-index: 1;
        }
        .pretext-headline-line {
          position: absolute;
          white-space: pre;
          color: var(--ink);
          cursor: text;
        }
        .pretext-credit {
          position: absolute;
          margin: 0;
          font: 12px/16px "Helvetica Neue", Helvetica, Arial, sans-serif;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
          color: rgba(17, 16, 13, 0.58);
          user-select: text;
          cursor: text;
          z-index: 1;
        }
        .dark .pretext-credit {
          color: rgba(232, 228, 220, 0.45);
        }
        .pretext-logo {
          position: absolute;
          display: block;
          user-select: none;
          pointer-events: none;
          transform-origin: center center;
          z-index: 3;
        }
        .pretext-logo--openai {
          filter: drop-shadow(0 26px 34px rgba(16, 16, 12, 0.14));
        }
        .pretext-logo--claude {
          filter: drop-shadow(0 24px 32px rgba(140, 86, 52, 0.18));
        }
        .dark .pretext-logo--openai {
          filter: drop-shadow(0 26px 34px rgba(200, 200, 180, 0.10)) brightness(0.85);
        }
        .dark .pretext-logo--claude {
          filter: drop-shadow(0 24px 32px rgba(200, 140, 100, 0.15));
        }
        .pretext-line {
          position: absolute;
          white-space: pre;
          color: var(--ink);
          font-weight: 450;
          letter-spacing: 0.002em;
          user-select: text;
          cursor: text;
          transition: color 120ms ease;
          z-index: 1;
        }
        .pretext-line:hover {
          color: var(--accent);
        }
      `}</style>
    </section>
  );
}
