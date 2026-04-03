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
		stiffness: 120,
		damping: 25,
		restDelta: 0.001
	});

	const [isHovered, setIsHovered] = React.useState(false);
	
	// Mouse tracking for custom cursor
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const cursorX = useSpring(mouseX, { stiffness: 450, damping: 45 });
	const cursorY = useSpring(mouseY, { stiffness: 450, damping: 45 });

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
	const clipPath = useMotionTemplate`inset(${clipPadding}% ${clipPadding}% ${clipPadding}% ${clipPadding}% round 3rem)`;

	// Scale animation for mock window - 1.4 is cleaner for text legibility
	const scale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);

	// Showcase Panel dynamic animations (True Viewport Centering)
	const showcaseLeft = useTransform(scrollYProgress, [0, 0.5, 0.95], ["50%", "50%", "2.5rem"]);
	const showcaseTop = useTransform(scrollYProgress, [0, 0.5, 0.95], ["50%", "50%", "auto"]);
	const showcaseBottom = useTransform(scrollYProgress, [0, 0.5, 0.95], ["auto", "auto", "2.5rem"]);
	const showcaseX = useTransform(scrollYProgress, [0, 0.5, 0.95], ["-50%", "-50%", "0%"]);
	const showcaseY = useTransform(scrollYProgress, [0, 0.5, 0.95], ["-50%", "-50%", "0%"]); 
	
	const showcaseScale = useTransform(scrollYProgress, [0, 0.5, 0.95], [1.2, 1.2, 1]);
	const showcaseBlur = useTransform(scrollYProgress, [0, 0.4], ["blur(0px)", "blur(20px)"]);
	const showcaseOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.95, 1], [0, 0, 1, 1, 0.9]);
	
	// Overall section fade-in to smooth the transition from the Hero
	const sectionOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

	return (
		<motion.div
			className="sticky top-0 h-[100dvh] w-full bg-background flex items-center justify-center p-4 md:p-12 overflow-hidden pointer-events-none z-30"
			style={{
				clipPath,
				opacity: sectionOpacity,
				willChange: "transform, clip-path, opacity",
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Custom 'Visit' Cursor with Pulse Effect */}
			<motion.div 
				style={{ 
					x: cursorX, 
					y: cursorY, 
					translateX: "-50%", 
					translateY: "-50%",
					opacity: isHovered ? 1 : 0,
					scale: isHovered ? 1 : 0
				}}
				className="pointer-events-none absolute z-[100] bg-primary text-primary-foreground px-6 py-3 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(var(--color-primary-rgb),0.5)] flex items-center gap-3 backdrop-blur-md border border-white/20 font-bold"
			>
				Visit Project
				<motion.div
					animate={{ x: [0, 3, 0] }}
					transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
				>
					<ArrowUpRight className="w-4 h-4" />
				</motion.div>
			</motion.div>

			{/* Scaled animated container holding the iframe */}
			<motion.a
				href="https://atmolens.priyanshu.world"
				target="_blank"
				rel="noopener noreferrer"
				className="w-full h-full relative rounded-[3rem] overflow-hidden bg-card border border-white/5 shadow-3xl pointer-events-auto group/browser transition-all duration-1000 cursor-none"
				style={{
					scale,
					transformOrigin: "center center"
				}}
			>
				{/* Top Mock Window Bar */}
				<div className="absolute top-0 left-0 w-full h-14 bg-background/60 backdrop-blur-2xl border-b border-white/5 flex items-center px-8 gap-3 z-20">
					<div className="flex gap-2">
						<div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-sm shadow-red-500/20" />
						<div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-sm shadow-yellow-500/20" />
						<div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-sm shadow-green-500/20" />
					</div>
					<div className="ml-8 flex-1 h-8 bg-foreground/[0.04] rounded-xl border border-foreground/[0.08] flex items-center justify-center px-6">
						<div className="flex items-center gap-2.5 opacity-50">
							<Globe className="w-3.5 h-3.5 text-primary" />
							<span className="font-mono text-[10px] truncate tracking-[0.2em] uppercase font-bold text-foreground/70">{iframeSrc}</span>
						</div>
					</div>
					<div className="w-24" />
				</div>

				<iframe 
					src={iframeSrc} 
					className="w-full h-full pt-14 border-none pointer-events-none opacity-80 group-hover/browser:opacity-100 transition-opacity duration-700"
					title="Project Interactive Window"
					loading="lazy"
				/>
				
				{/* Iframe overlay for visual polish */}
				<div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_top,transparent,black/25)] opacity-50" />

				{/* AtmoLens Project Intro with Grain Background Overlay */}
				<motion.div 
					className="absolute z-40 p-1.5 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-3xl max-w-[360px] md:max-w-xl pointer-events-none select-none"
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
					{/* Grain Background */}
					<div 
						className="absolute inset-0 bg-card/60 backdrop-blur-3xl"
						style={{
							backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
							backgroundSize: "140px 140px",
							opacity: 0.5
						}}
					/>
					
					<div className="relative z-10 p-8 md:p-12 bg-gradient-to-br from-white/[0.08] to-transparent rounded-[2.2rem] border border-white/5">
						<div className="flex items-center gap-4 mb-6">
							<motion.div 
								animate={{ rotate: 360 }}
								transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
								className="p-2.5 rounded-2xl bg-primary/20 border border-primary/30"
							>
								<Sparkles className="w-6 h-6 text-primary" />
							</motion.div>
							<div className="flex flex-col">
								<h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-black italic underline decoration-primary/30">Active Prototype</h3>
								<span className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.15em] font-bold">Protocol: AtmoLens-99</span>
							</div>
						</div>
						
						<h2 className="text-4xl md:text-7xl font-black text-foreground font-display mb-6 tracking-tighter leading-[0.8] uppercase">
							Atmo<br />
							<span className="text-primary italic">Lens</span>
						</h2>
						
						<p className="text-sm md:text-lg text-foreground/50 leading-relaxed font-body mb-10 max-w-sm">
							Next-gen atmospheric visualization engine mapping complex GIS datasets in a high-fidelity WebGL environment.
						</p>
						
						<div className="flex items-center gap-8 border-t border-white/10 pt-8">
                           <div className="flex flex-col gap-1">
                               <span className="text-[9px] font-mono uppercase text-foreground/30 tracking-[0.2em] font-bold">Technology</span>
                               <span className="text-[11px] font-bold text-foreground/70 tracking-tight">GLSL • GIS • TILE</span>
                           </div>
                           <div className="w-[1px] h-10 bg-white/10" />
                           <div className="flex flex-col gap-1">
                               <span className="text-[9px] font-mono uppercase text-foreground/30 tracking-[0.2em] font-bold">Category</span>
                               <span className="text-[11px] font-bold text-foreground/70 tracking-tight">Geospatial AI</span>
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
