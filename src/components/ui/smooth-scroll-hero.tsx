"use client";
import * as React from "react";

import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
	useMotionValue,
	useSpring,
} from "framer-motion";
import { ArrowUpRight, Globe, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

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
}

const SmoothScrollHeroBackground: React.FC<{
	containerRef: React.RefObject<HTMLDivElement | null>;
	iframeSrc: string;
	initialClipPercentage: number;
}> = ({ containerRef, iframeSrc, initialClipPercentage }) => {
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

	// Synchronize iframe theme with the current site theme
	const { resolvedTheme, theme } = useTheme();
	const currentTheme = resolvedTheme || theme || "dark";
	// Append theme to URL to trigger re-renders in the iframe if it supports it
	const finalIframeSrc = React.useMemo(() => {
		const url = new URL(iframeSrc);
		url.searchParams.set("theme", currentTheme);
		return url.toString();
	}, [iframeSrc, currentTheme]);

	const [isHovered, setIsHovered] = React.useState(false);
	
	// Fast-tracking mouse for the custom cursor label
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	
	// High-stiffness spring for cursor to prevent "drifting", keep it close to tip
	const cursorX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
	const cursorY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		mouseX.set(e.clientX - rect.left);
		mouseY.set(e.clientY - rect.top);
	};

	// Clip path animation using local progress
	const clipPadding = useTransform(
		scrollYProgress,
		[0, 1],
		[initialClipPercentage, 0],
	);
	// Smooth rounded corners via inset
	const clipPath = useMotionTemplate`inset(${clipPadding}% ${clipPadding}% ${clipPadding}% ${clipPadding}% round 3.5rem)`;

	// Scale animation for mock window
	const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

	// Showcase Panel dynamic animations (True Center to Bottom-Left Corner)
	const showcaseLeft = useTransform(scrollYProgress, [0, 0.45, 0.95], ["50%", "50%", "3rem"]);
	const showcaseTop = useTransform(scrollYProgress, [0, 0.45, 0.95], ["50%", "50%", "auto"]);
	const showcaseBottom = useTransform(scrollYProgress, [0, 0.45, 0.95], ["auto", "auto", "3rem"]);
	const showcaseX = useTransform(scrollYProgress, [0, 0.45, 0.95], ["-50%", "-50%", "0%"]);
	const showcaseY = useTransform(scrollYProgress, [0, 0.45, 0.95], ["-50%", "-50%", "0%"]); 
	
	const showcaseScale = useTransform(scrollYProgress, [0, 0.45, 0.95], [1.15, 1.15, 1]);
	const showcaseBlur = useTransform(scrollYProgress, [0, 0.1, 0.5], ["blur(12px)", "blur(20px)", "blur(30px)"]);
	const showcaseOpacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [1, 1, 1, 0.8]);

	return (
		<motion.div
			className="sticky top-0 h-[100dvh] w-full bg-background flex items-center justify-center p-4 md:p-12 overflow-hidden pointer-events-none z-30"
			style={{
				clipPath,
				willChange: "transform, clip-path",
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Persistent Noise Texture for Atmosphere */}
			<div 
				className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay z-0"
				style={{
					backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
					backgroundSize: "150px 150px",
				}}
			/>

			{/* Custom 'Visit' Cursor with Pulse Effect - Shifted to stay near but not under tip */}
			<motion.div 
				style={{ 
					x: cursorX, 
					y: cursorY, 
					translateX: "24px",  // Shifted right of pointer tip
					translateY: "-50%",
					opacity: isHovered ? 1 : 0,
					scale: isHovered ? 1 : 0
				}}
				className="pointer-events-none absolute z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-full font-mono text-[9px] uppercase tracking-[0.25em] shadow-[0_0_50px_rgba(var(--color-primary-rgb),0.6)] flex items-center gap-3 backdrop-blur-md border border-white/20 font-bold"
			>
				Visit
				<motion.div
					animate={{ x: [0, 4, 0] }}
					transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
				>
					<ArrowUpRight className="w-3.5 h-3.5 font-bold" />
				</motion.div>
			</motion.div>

			{/* Scaled animated container holding the iframe */}
			<motion.a
				href="https://atmolens.priyanshu.world"
				target="_blank"
				rel="noopener noreferrer"
				className="w-full h-full relative rounded-[3.5rem] overflow-hidden bg-card border border-white/10 shadow-3xl pointer-events-auto group/browser cursor-none"
				style={{
					scale,
					transformOrigin: "center center"
				}}
			>
				{/* Top Mock Window Bar */}
				<div className="absolute top-0 left-0 w-full h-14 bg-background/60 backdrop-blur-2xl border-b border-white/5 flex items-center px-8 gap-3 z-20">
					<div className="flex gap-2">
						<div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
						<div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
						<div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
					</div>
					<div className="ml-8 flex-1 h-8 bg-foreground/[0.04] rounded-xl border border-foreground/[0.08] flex items-center justify-center px-6">
						<div className="flex items-center gap-2.5 opacity-50">
							<Globe className="w-3.5 h-3.5 text-primary" />
							<span className="font-mono text-[9px] truncate tracking-[0.2em] uppercase font-bold text-foreground/70">{iframeSrc}</span>
						</div>
					</div>
					<div className="w-24" />
				</div>

				<iframe 
					src={finalIframeSrc} 
					className="w-full h-full pt-14 border-none pointer-events-none group-hover/browser:scale-[1.01] transition-transform duration-1000"
					title="Project Interactive Window"
					loading="lazy"
				/>
				
				{/* Iframe overlay for visual polish */}
				<div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_top,transparent,black/35)] opacity-60" />

				{/* AtmoLens Showcase Container with Signature font */}
				<motion.div 
					className="absolute z-40 p-2 rounded-[3rem] border border-white/10 overflow-hidden shadow-3xl max-w-[340px] md:max-w-md pointer-events-none select-none"
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
					
					<div className="relative z-10 p-8 md:p-10 bg-gradient-to-br from-white/[0.08] to-transparent rounded-[2.8rem] border border-white/5">
						<div className="flex flex-col gap-2 mb-6">
							<div className="flex items-center gap-3">
								<motion.div 
									animate={{ rotate: 360 }}
									transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
									className="p-2 rounded-xl bg-primary/20 border border-primary/30 shadow-lg shadow-primary/20"
								>
									<Sparkles className="w-5 h-5 text-primary" />
								</motion.div>
								<h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-black">Lab-System: Protocol</h3>
							</div>
							
							{/* Signature Font Title */}
							<span className="font-signature text-3xl md:text-5xl text-primary leading-none -mt-1 ml-1 opacity-90 block">
								Cartographix
							</span>
						</div>
						
						<h2 className="text-3xl md:text-5xl font-black text-foreground font-display mb-4 tracking-tighter leading-[0.85] uppercase">
							Atmo<br />
							<span className="text-white/40 italic">Intelligence</span>
						</h2>
						
						<p className="text-sm text-foreground/50 leading-relaxed font-body mb-8 max-w-[280px]">
							Custom geospatial prototype visualizing high-resolution weather datasets with interactive GLSL mapping layers.
						</p>
						
						<div className="flex items-center gap-6 border-t border-white/10 pt-8">
                           <div className="flex flex-col gap-1">
                               <span className="text-[9px] font-mono uppercase text-foreground/30 tracking-[0.2em] font-bold">Tech</span>
                               <span className="text-[10px] font-bold text-foreground/70 tracking-tight">GLSL • GIS • SVG</span>
                           </div>
                           <div className="w-[1px] h-8 bg-white/10" />
                           <div className="flex flex-col gap-1">
                               <span className="text-[9px] font-mono uppercase text-foreground/30 tracking-[0.2em] font-bold">Concept</span>
                               <span className="text-[10px] font-bold text-foreground/70 tracking-tight">Spatial AI</span>
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
			/>
		</div>
	);
};

export default SmoothScrollHero;
