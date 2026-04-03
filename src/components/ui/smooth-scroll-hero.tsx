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
	const { scrollYProgress: rawScrollProgress } = useScroll({
		target: containerRef as React.RefObject<HTMLElement>,
		offset: ["start start", "end end"],
	});

	// High-performance spring for scroll progress
	const scrollYProgress = useSpring(rawScrollProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001
	});
	const prefersReducedMotion = useReducedMotion();

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

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		mouseX.set(e.clientX - rect.left);
		mouseY.set(e.clientY - rect.top);
	};

	// Clip path animation using local progress
	const clipPadding = useTransform(
		scrollYProgress,
		[0, 1],
		[prefersReducedMotion ? 8 : initialClipPercentage, 0],
	);
	// Smooth rounded corners via inset
	const clipPath = useMotionTemplate`inset(${clipPadding}% ${clipPadding}% ${clipPadding}% ${clipPadding}% round 3.5rem)`;

	// Scale animation for mock window
	const scale = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 1.03 : 1.12, 1]);

	// Showcase Panel dynamic animations (True Center to Bottom-Left Corner)
	const showcaseLeft = useTransform(scrollYProgress, [0, 0.45, 0.95], ["50%", "50%", "1.5rem"]);
	const showcaseTop = useTransform(scrollYProgress, [0, 0.45, 0.95], ["50%", "50%", "auto"]);
	const showcaseBottom = useTransform(scrollYProgress, [0, 0.45, 0.95], ["auto", "auto", "1.5rem"]);
	const showcaseX = useTransform(scrollYProgress, [0, 0.45, 0.95], ["-50%", "-50%", "0%"]);
	const showcaseY = useTransform(scrollYProgress, [0, 0.45, 0.95], ["-50%", "-50%", "0%"]); 
	
	const showcaseScale = useTransform(scrollYProgress, [0, 0.45, 0.95], [prefersReducedMotion ? 1.02 : 1.08, prefersReducedMotion ? 1.02 : 1.08, 1]);
	const showcaseBlur = useTransform(
		scrollYProgress,
		[0, 0.1, 0.5],
		prefersReducedMotion ? ["blur(0px)", "blur(0px)", "blur(12px)"] : ["blur(10px)", "blur(18px)", "blur(28px)"],
	);
	const showcaseOpacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [1, 1, 1, 0.92]);

	return (
		<motion.div
			className="pointer-events-none sticky top-0 z-30 flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-background p-3 md:p-12"
			style={{
				clipPath,
				willChange: "transform, clip-path",
			}}
		>
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
				href="https://atmolens.priyanshu.world"
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
						x: mouseX,
						y: mouseY,
						translateX: "-50%", 
						translateY: "-50%",
						opacity: isHovered ? 1 : 0,
						scale: isHovered ? 1 : 0.96,
						boxShadow: "0 24px 70px rgba(30, 157, 241, 0.28)",
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
					className="h-full w-full border-none pt-12 transition-transform duration-1000 group-hover/browser:scale-[1.01] pointer-events-none md:pt-14"
					title="Project Interactive Window"
					loading="lazy"
				/>
				
				{/* Iframe overlay for visual polish */}
				<div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_top,transparent,black/35)] opacity-45 transition-opacity duration-500 group-hover/browser:opacity-25" />

				{/* AtmoLens Showcase Container with Signature font */}
				<motion.div 
					className="absolute z-40 w-[min(92vw,360px)] max-w-none overflow-hidden rounded-[2rem] border border-white/10 p-2 shadow-3xl pointer-events-none select-none md:w-[26rem] md:rounded-[3rem]"
					style={{
						left: showcaseLeft,
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
					
					<div className="relative z-10 rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-white/[0.12] to-transparent p-5 sm:p-6 md:rounded-[2.8rem] md:p-10">
						<div className="mb-7 flex flex-col gap-1.5">
							<div className="flex items-center gap-3.5">
								<motion.div 
									animate={{ rotate: 360 }}
									transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
									className="p-2.5 rounded-2xl bg-primary/25 border border-primary/40 shadow-xl shadow-primary/20"
								>
									<Sparkles className="w-5 h-5 text-primary" />
								</motion.div>
								<h3 className="text-[11px] font-mono text-primary/80 uppercase tracking-[0.4em] font-black">{showcase.eyebrow}</h3>
							</div>
							
							{/* Signature Font Title - Refined position */}
							<span className="block -ml-1 -mt-2 font-signature text-[clamp(2.25rem,8vw,3.2rem)] leading-tight text-primary opacity-100 drop-shadow-sm select-none md:-ml-2 md:-mt-4 md:text-5xl">
								{showcase.handwrittenLabel}
							</span>
						</div>
						
						<h2 className="mb-5 break-words font-display text-[clamp(2rem,9vw,3rem)] font-black uppercase leading-[0.84] tracking-[-0.05em] text-foreground md:text-[4.25rem]">
							{showcase.title}<br />
							<span className="font-medium italic text-foreground/35">{showcase.accentTitle}</span>
						</h2>
						
						<p className="mb-8 max-w-full font-body text-sm leading-relaxed text-foreground/60 md:max-w-[20rem] md:text-[15px]">
							{showcase.description}
						</p>

						<div className="mb-8 flex w-full flex-col gap-3 rounded-[1.4rem] border border-white/10 bg-foreground/[0.03] p-3 transition-colors duration-500 group-hover/browser:border-primary/20 group-hover/browser:bg-primary/[0.06] sm:flex-row sm:items-center">
							<div className="min-w-0 flex-1">
								<p className="mb-1 text-[10px] font-mono font-bold uppercase tracking-[0.24em] text-foreground/40">
									Launch
								</p>
								<p className="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/68 md:text-xs">
									{displayUrl}
								</p>
							</div>
							<div className="inline-flex w-fit items-center gap-2 self-start rounded-full bg-primary px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-500 group-hover/browser:-translate-y-0.5 sm:self-auto">
								{cursorLabel}
								<span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
									<ArrowUpRight className="h-3.5 w-3.5" />
								</span>
							</div>
						</div>
						
						<div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-7 sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] sm:items-start md:gap-6 md:pt-9">
                           <div className="min-w-0 flex flex-col gap-1.5">
                               <span className="text-[10px] font-mono uppercase text-foreground/40 tracking-[0.25em] font-bold">Tech Stack</span>
                               <span className="break-words text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-foreground/80 md:text-[12px]">{showcase.techStack}</span>
                           </div>
                           <div className="hidden h-10 w-[1px] self-stretch bg-white/10 sm:block" />
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
			style={{ height: `calc(${scrollHeight}px + 100vh)` }}
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

