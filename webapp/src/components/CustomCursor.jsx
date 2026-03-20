import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

/**
 * CustomCursor
 * - Dot snaps to the actual pointer position.
 * - Ring lazily follows (lerped).
 * - On hover of interactive elements, both expand.
 * - On hover of .liquid-glass cards, injects --mx / --my CSS custom
 *   properties so the shimmer highlight follows the cursor inside each card.
 */
const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const target  = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      if (!visible.current) {
        if (dotRef.current)  dotRef.current.style.opacity  = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
        visible.current = true;
      }

      // Drive the shimmer on every hovered .liquid-glass element
      const els = document.querySelectorAll('.liquid-glass');
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width)  * 100;
        const my = ((e.clientY - rect.top)  / rect.height) * 100;
        el.style.setProperty('--mx', mx.toFixed(1));
        el.style.setProperty('--my', my.toFixed(1));
      });
    };

    const onLeave = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      visible.current = false;
    };

    const onHoverIn  = () => {
      ringRef.current?.classList.add('hovering');
      dotRef.current?.classList.add('hovering');
    };
    const onHoverOut = () => {
      ringRef.current?.classList.remove('hovering');
      dotRef.current?.classList.remove('hovering');
    };

    const attachHover = () => {
      document
        .querySelectorAll('a, button, .btn-primary, .btn-secondary, .chip, .project-card, .liquid-glass, .timeline-card, .about-card, .contact-link')
        .forEach(el => {
          el.removeEventListener('mouseenter', onHoverIn);
          el.removeEventListener('mouseleave', onHoverOut);
          el.addEventListener('mouseenter', onHoverIn);
          el.addEventListener('mouseleave', onHoverOut);
        });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });
    attachHover();

    let raf;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="custom-cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
