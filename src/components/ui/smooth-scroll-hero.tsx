"use client";
import * as React from "react";

import {
	motion,
	useMotionTemplate,
	useReducedMotion,
	useScroll,
	useTransform,
	useMotionValue,
	useSpring,
} from "framer-motion";
import { ArrowUpRight, Globe, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

interface IShowcaseContent {
	accentTitle: string;
	cursorLabel?: string;
	description: string;
	domain: string;
	eyebrow: string;
	handwrittenLabel: string;
	placement?: "left" | "right";
	techStack: string;
	title: string;
}

interface ISmoothScrollHeroProps {
	/**
	 * Height of the scroll section in pixels
	 * @default 1500
	 */
	scrollHeight?: number;
	/**
	 * Iframe SRC URL
	 */
	iframeSrc: string;
	/**
	 * Initial clip path percentage
	 * @default 25
	 */
	initialClipPercentage?: number;
	showcase: IShowcaseContent;
}

const SmoothScrollHeroBackground: React.FC<{
	containerRef: React.RefObject<HTMLDivElement | null>;
	iframeSrc: string;
	initialClipPercentage: number;
	showcase: IShowcaseContent;
}> = ({ containerRef, iframeSrc, initialClipPercentage, showcase }) => {
	const prefersReducedMotion = useReducedMotion();
	const { scrollYProgress: rawScrollProgress } = useScroll({
		target: containerRef as React.RefObject<HTMLElement>,
		offset: ["start start", "end end"],
	});

	// Smooth the scroll-linked transforms so the hero feels deliberate
	// rather than overly reactive to small wheel/touchpad input changes.
	const scrollYProgress = useSpring(rawScrollProgress, {
		stiffness: prefersReducedMotion ? 110 : 82,
		damping: prefersReducedMotion ? 32 : 24,
		mass: prefersReducedMotion ? 0.35 : 0.55,
		restDelta: 0.001
	});

	// Synchronize iframe theme with the current site theme
	const { resolvedTheme, theme } = useTheme();
	const currentTheme = resolvedTheme || theme || "dark";
	const iframeRef = React.useRef<HTMLIFrameElement>(null);

	// Append theme to URL to trigger re-renders in the iframe if it supports it
	const finalIframeSrc = React.useMemo(() => {
		try {
			const url = new URL(iframeSrc);
			url.searchParams.set("theme", currentTheme);
			return url.toString();
		} catch {
			return iframeSrc;
		}
	}, [iframeSrc, currentTheme]);
	const displayUrl = React.useMemo(() => {
		try {
			return new URL(iframeSrc).hostname;
		} catch {
			return iframeSrc.replace(/^https?:\/\//, "");
		}
	}, [iframeSrc]);
	const cursorLabel = showcase.cursorLabel ?? "Open Project";
	const showcasePlacement = showcase.placement ?? "left";

	// Broadcast theme changes to iframe via postMessage for live updates
	React.useEffect(() => {
		if (iframeRef.current?.contentWindow) {
			iframeRef.current.contentWindow.postMessage({ 
				type: 'SET_THEME', 
				theme: currentTheme 
			}, '*');
		}
	}, [currentTheme]);

	const [isHovered, setIsHovered] = React.useState(false);
	
	// Track the pointer directly on the interactive frame so the hover CTA
	// stays locked to the same surface that hides the native cursor.
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const cursorX = useSpring(mouseX, {
		stiffness: prefersReducedMotion ? 1200 : 820,
		damping: prefersReducedMotion ? 70 : 42,
		mass: 0.18,
		restDelta: 0.001,
	});
	const cursorY = useSpring(mouseY, {
		stiffness: prefersReducedMotion ? 1200 : 820,
		damping: prefersReducedMotion ? 70 : 42,
		mass: 0.18,
		restDelta: 0.001,
	});

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		mouseX.set(e.clientX - rect.left);
		mouseY.set(e.clientY - rect.top);
	};

	// Clip path animation using local progress
	const clipPadding = useTransform(
		rawScrollProgress,
		[0, 0.42, 0.88, 1],
		[prefersReducedMotion ? 8 : initialClipPercentage, 0, 0, 0],
	);
	// Smooth rounded corners via inset
	const clipPath = useMotionTemplate`inset(${clipPadding}% ${clipPadding}% ${clipPadding}% ${clipPadding}% round 3.5rem)`;

	// Global sticky exit translation
	const exitTranslateY = useTransform(scrollYProgress, [0.88, 1], ["0%", "-100%"]);
	const exitScale = useTransform(scrollYProgress, [0.88, 1], [1, 0.95]);

	// Scale animation for mock window
	const scale = useTransform(
		scrollYProgress, 
		[0, 0.42, 0.88, 1], 
		[prefersReducedMotion ? 1.02 : 1.08, 1, 1, 0.98]
	);

	// Showcase Panel dynamic animations (True Center to Bottom-Left Corner)
	const showcaseInset = useTransform(
		scrollYProgress,
		[0, 0.38, 0.88, 1],
		["50%", prefersReducedMotion ? "1.25rem" : "1.5rem", prefersReducedMotion ? "1.25rem" : "1.5rem", prefersReducedMotion ? "1.25rem" : "1.5rem"],
	);
	const showcaseTop = useTransform(scrollYProgress, [0, 0.38, 0.88], ["50%", "auto", "auto"]);
	const showcaseBottom = useTransform(
		scrollYProgress,
		[0, 0.38, 0.88, 1],
		["auto", prefersReducedMotion ? "1.25rem" : "1.5rem", prefersReducedMotion ? "1.25rem" : "1.5rem", prefersReducedMotion ? "1.25rem" : "1.5rem"],
	);
	const showcaseX = useTransform(
		scrollYProgress,
		[0, 0.38, 0.88, 1],
		showcasePlacement === "right" ? ["50%", "0%", "0%", "0%"] : ["-50%", "0%", "0%", "0%"],
	);
	const showcaseY = useTransform(scrollYProgress, [0, 0.38, 0.88, 1], ["-50%", "0%", "0%", "0%"]); 
	
	const showcaseScale = useTransform(scrollYProgress, [0, 0.38, 0.88, 1], [prefersReducedMotion ? 1.01 : 1.05, 1, 1, 0.95]);
	const showcaseBlur = useTransform(
		scrollYProgress,
		[0, 0.1, 0.5],
		prefersReducedMotion ? ["blur(0px)", "blur(0px)", "blur(10px)"] : ["blur(8px)", "blur(14px)", "blur(22px)"],
	);
	const showcaseOpacity = useTransform(scrollYProgress, [0, 0.1, 0.88, 1], [0, 1, 1, 0]);

	// Fade-out indicator for initial scroll
	const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

	return (
		<motion.div
			className="pointer-events-none sticky top-0 z-30 flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-background p-3 md:p-12"
			style={{
				clipPath,
				y: exitTranslateY,
				scale: exitScale,
				willChange: "transform, clip-path",
			}}
		>
			{/* Scroll Down Indicator Component (Added to right corner) */}
			<motion.div 
				style={{ opacity: indicatorOpacity }}
				className="absolute bottom-6 right-6 z-[60] flex flex-col items-center gap-4 md:bottom-12 md:right-12"
			>
				<span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-primary/60 [writing-mode:vertical-lr]">
					Explore Project
				</span>
				<div className="relative h-16 w-px bg-primary/10 overflow-hidden">
					<motion.div 
						animate={{ y: ["-100%", "100%"] }}
						transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
						className="h-1/2 w-full bg-gradient-to-b from-transparent via-primary to-transparent"
					/>
				</div>
			</motion.div>
			{/* Persistent Noise Texture for Atmosphere */}
			<div 
				className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay z-0"
				style={{
					backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
					backgroundSize: "150px 150px",
				}}
			/>
 
			{/* Scaled animated container holding the iframe */}
			<motion.a
				href={iframeSrc}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`Open ${displayUrl} in a new tab`}
				className="group/browser relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-card shadow-3xl pointer-events-auto transition-[box-shadow,border-color] duration-500 hover:border-primary/25 hover:shadow-[0_32px_120px_rgba(30,157,241,0.18)] md:cursor-none md:rounded-[3.5rem]"
				style={{
					scale,
					transformOrigin: "center center"
				}}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Custom hover CTA stays in the same coordinate space as the hidden cursor. */}
				<motion.div 
					aria-hidden="true"
					style={{ 
						x: cursorX,
						y: cursorY,
						translateX: "-50%", 
						translateY: "-50%",
						opacity: isHovered ? 1 : 0,
						scale: isHovered ? 1 : 0.96,
						boxShadow: "0 24px 70px rgba(30, 157, 241, 0.28)",
					}}
					transition={{
						opacity: { duration: prefersReducedMotion ? 0.12 : 0.18, ease: [0.22, 1, 0.36, 1] },
						scale: { type: "spring", stiffness: 420, damping: 30, mass: 0.35 },
					}}
					className="pointer-events-none absolute left-0 top-0 z-[100] hidden items-center gap-2 rounded-full border border-primary/25 bg-background/80 p-1 pr-1.5 text-foreground backdrop-blur-2xl md:flex"
				>
					<span className="whitespace-nowrap rounded-full bg-primary px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary-foreground shadow-lg shadow-primary/20">
						{cursorLabel}
					</span>
					<span className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/8 bg-foreground/[0.04] text-primary">
						<ArrowUpRight className="h-3.5 w-3.5" />
					</span>
				</motion.div>

				{/* Top Mock Window Bar */}
				<div className="absolute top-0 left-0 z-20 flex h-12 w-full items-center gap-2 border-b border-white/5 bg-background/60 px-4 backdrop-blur-2xl md:h-14 md:gap-3 md:px-8">
					<div className="flex gap-2">
						<div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
						<div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
						<div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
					</div>
					<div className="ml-2 flex h-7 flex-1 items-center justify-center rounded-xl border border-foreground/[0.08] bg-foreground/[0.04] px-3 md:ml-8 md:h-8 md:px-6">
						<div className="flex items-center gap-2.5 opacity-50">
							<Globe className="w-3.5 h-3.5 text-primary" />
							<span className="truncate font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-foreground/70 md:text-[9px]">{displayUrl}</span>
						</div>
					</div>
					<div className="hidden w-24 md:block" />
				</div>

				<iframe 
					ref={iframeRef}
					src={finalIframeSrc} 
					className="pointer-events-none h-full w-full border-none pt-12 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/browser:scale-[1.008] md:pt-14"
					title="Project Interactive Window"
					loading="lazy"
				/>
				
				{/* Iframe overlay for visual polish */}
				<div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_top,transparent,black/35)] opacity-45 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/browser:opacity-25" />

				{/* Project showcase container */}
				<motion.div 
					className="absolute z-40 w-[min(88vw,340px)] max-w-none overflow-hidden rounded-[1.8rem] border border-white/10 p-2 shadow-3xl pointer-events-none select-none md:w-[23rem] md:rounded-[2.6rem] lg:w-[24rem]"
					style={{
						left: showcasePlacement === "left" ? showcaseInset : "auto",
						right: showcasePlacement === "right" ? showcaseInset : "auto",
						top: showcaseTop,
						bottom: showcaseBottom,
						x: showcaseX,
						y: showcaseY,
						scale: showcaseScale,
						backdropFilter: showcaseBlur,
						opacity: showcaseOpacity
					}}
				>
					{/* Grainy Scrapbook Background */}
					<div 
						className="absolute inset-0 bg-card/70 backdrop-blur-3xl"
						style={{
							backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
							backgroundSize: "120px 120px",
							opacity: 0.6
						}}
					/>
					
					<div className="relative z-10 rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/[0.12] to-transparent p-4 sm:p-5 md:rounded-[2.35rem] md:p-7">
						<div className="mb-5 flex flex-col gap-1.5 md:mb-6">
							<div className="flex items-center gap-3">
								<motion.div 
									animate={{ rotate: 360 }}
									transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
									className="rounded-xl border border-primary/40 bg-primary/25 p-2 shadow-xl shadow-primary/20"
								>
									<Sparkles className="h-[18px] w-[18px] text-primary" />
								</motion.div>
								<h3 className="text-[10px] font-mono font-black uppercase tracking-[0.34em] text-primary/80 md:text-[11px]">
									{showcase.eyebrow}
								</h3>
							</div>
							
							{/* Signature-style title */}
							<span className="block -ml-0.5 -mt-1 font-signature text-[clamp(2rem,7vw,3rem)] leading-tight text-primary opacity-100 drop-shadow-sm select-none md:-ml-1 md:-mt-2 md:text-[4rem]">
								{showcase.handwrittenLabel}
							</span>
						</div>
						
						<h2 className="mb-4 break-words font-display text-[clamp(1.9rem,8vw,2.8rem)] font-black uppercase leading-[0.86] tracking-[-0.045em] text-foreground md:mb-5 md:text-[3.7rem]">
							{showcase.title}<br />
							<span className="font-medium italic text-foreground/35">{showcase.accentTitle}</span>
						</h2>
						
						<p className="mb-6 max-w-full font-body text-[13px] leading-relaxed text-foreground/60 md:mb-7 md:max-w-[18rem] md:text-[14px]">
							{showcase.description}
						</p>

						<div className="mb-6 grid w-full gap-3 rounded-[1.2rem] border border-white/10 bg-foreground/[0.03] p-3 transition-colors duration-500 group-hover/browser:border-primary/20 group-hover/browser:bg-primary/[0.06] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center md:mb-7">
							<div className="min-w-0 flex-1">
								<p className="mb-1 text-[10px] font-mono font-bold uppercase tracking-[0.24em] text-foreground/40">
									Launch
								</p>
								<p className="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/68 md:text-xs">
									{displayUrl}
								</p>
							</div>
							<div className="inline-flex w-fit items-center gap-2 self-start rounded-full bg-primary px-3.5 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-500 group-hover/browser:-translate-y-0.5 sm:self-auto">
								{cursorLabel}
								<span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
									<ArrowUpRight className="h-3.5 w-3.5" />
								</span>
							</div>
						</div>
						
						<div className="grid grid-cols-1 gap-3 border-t border-white/10 pt-5 sm:grid-cols-2 sm:items-start md:gap-5 md:pt-6">
                           <div className="min-w-0 flex flex-col gap-1.5">
                               <span className="text-[10px] font-mono uppercase text-foreground/40 tracking-[0.25em] font-bold">Tech Stack</span>
                               <span className="break-words text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-foreground/80 md:text-[12px]">{showcase.techStack}</span>
                           </div>
                           <div className="min-w-0 flex flex-col gap-1.5">
                               <span className="text-[10px] font-mono uppercase text-foreground/40 tracking-[0.25em] font-bold">Domain</span>
                               <span className="break-words text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-foreground/80 md:text-[12px]">{showcase.domain}</span>
                            </div>
                        </div>
					</div>
				</motion.div>
			</motion.a>
		</motion.div>
	);
};

const SmoothScrollHero: React.FC<ISmoothScrollHeroProps> = ({
	scrollHeight = 1500,
	iframeSrc,
	initialClipPercentage = 25,
	showcase,
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);

	return (
		<div
			ref={containerRef}
			style={{ height: `${scrollHeight}px` }}
			className="relative w-full z-10"
		>
			<SmoothScrollHeroBackground
				containerRef={containerRef}
				iframeSrc={iframeSrc}
				initialClipPercentage={initialClipPercentage}
				showcase={showcase}
			/>
		</div>
	);
};

export default SmoothScrollHero;

