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
	const { scrollYProgress } = useScroll({
		target: containerRef as React.RefObject<HTMLElement>,
		offset: ["start start", "end end"],
	});

	const [isHovered, setIsHovered] = React.useState(false);
	
	// Mouse tracking for custom cursor
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const cursorX = useSpring(mouseX, { stiffness: 300, damping: 30 });
	const cursorY = useSpring(mouseY, { stiffness: 300, damping: 30 });

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
	const clipPath = useMotionTemplate`inset(${clipPadding}% ${clipPadding}% ${clipPadding}% ${clipPadding}% round 3rem)`;

	// Scale animation for mock window
	const scale = useTransform(scrollYProgress, [0, 1], [1.7, 1]);

	// Showcase Panel dynamic animations (Center to Corner)
	const showcaseLeft = useTransform(scrollYProgress, [0, 0.4, 0.8], ["50%", "50%", "2rem"]);
	const showcaseBottom = useTransform(scrollYProgress, [0, 0.4, 0.8], ["50%", "50%", "2rem"]);
	const showcaseX = useTransform(scrollYProgress, [0, 0.4, 0.8], ["-50%", "-50%", "0%"]);
	const showcaseY = useTransform(scrollYProgress, [0, 0.4, 0.8], ["50%", "50%", "0%"]); 
	const showcaseScale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1.3, 1.3, 1]);
	const showcaseBlur = useTransform(scrollYProgress, [0, 0.4], ["blur(12px)", "blur(20px)"]);

	return (
		<motion.div
			className="sticky top-0 h-screen w-full bg-transparent flex items-center justify-center p-4 md:p-12 overflow-hidden pointer-events-none"
			style={{
				clipPath,
				willChange: "transform, clip-path",
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Custom 'Visit' Cursor */}
			<motion.div 
				style={{ 
					x: cursorX, 
					y: cursorY, 
					translateX: "-50%", 
					translateY: "-50%",
					opacity: isHovered ? 1 : 0,
					scale: isHovered ? 1 : 0
				}}
				className="pointer-events-none absolute z-[100] bg-primary/90 text-primary-foreground px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-2 backdrop-blur-md border border-white/20"
			>
				Visit Prototype
				<ArrowUpRight className="w-3 h-3" />
			</motion.div>

			{/* Scaled animated container holding the iframe */}
			<motion.a
				href="https://atmolens.priyanshu.world"
				target="_blank"
				rel="noopener noreferrer"
				className="w-full h-full relative rounded-[3rem] overflow-hidden bg-card/60 border border-white/10 shadow-2xl pointer-events-auto group/browser transition-all duration-700 cursor-none backdrop-blur-md"
				style={{
					scale,
					transformOrigin: "center center"
				}}
			>
				{/* Top Mock Window Bar */}
				<div className="absolute top-0 left-0 w-full h-12 bg-background/50 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-2 z-20">
					<div className="flex gap-1.5">
						<div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-inner shadow-black/10" />
						<div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner shadow-black/10" />
						<div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-inner shadow-black/10" />
					</div>
					<div className="ml-6 flex-1 h-7 bg-foreground/[0.03] rounded-lg border border-foreground/[0.05] flex items-center justify-center px-4">
						<div className="flex items-center gap-2 opacity-40">
							<Globe className="w-3 h-3" />
							<span className="font-mono text-[10px] truncate tracking-[0.1em]">{iframeSrc}</span>
						</div>
					</div>
					<div className="w-20" />
				</div>

				<iframe 
					src={iframeSrc} 
					className="w-full h-full pt-12 border-none pointer-events-none"
					title="Project Interactive Window"
					loading="lazy"
				/>
				
				{/* Iframe overlay for visual polish */}
				<div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_top,transparent,black/15)] opacity-40" />

				{/* AtmoLens Project Intro with Grain Background Overlay */}
				<motion.div 
					className="absolute z-40 p-1 md:p-1.5 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl max-w-[340px] md:max-w-md pointer-events-none active:pointer-events-auto group/showcase"
					style={{
						left: showcaseLeft,
						bottom: showcaseBottom,
						x: showcaseX,
						y: showcaseY,
						scale: showcaseScale,
						backdropFilter: showcaseBlur
					}}
				>
					{/* Grain Background */}
					<div 
						className="absolute inset-0 bg-card/60 backdrop-blur-2xl"
						style={{
							backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
							backgroundSize: "130px 130px",
							opacity: 0.4
						}}
					/>
					
					<div className="relative z-10 p-6 md:p-8 bg-gradient-to-br from-white/[0.05] to-transparent rounded-[1.8rem]">
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
								<Sparkles className="w-5 h-5 text-primary" />
							</div>
							<h3 className="text-xs font-mono text-primary uppercase tracking-[0.2em] font-bold">Protocol: AtmoLens</h3>
						</div>
						
						<h2 className="text-3xl md:text-5xl font-bold text-foreground font-display mb-4 tracking-tighter leading-[0.9]">
							Atmospheric <br />
							<span className="text-primary italic">Intelligence</span>
						</h2>
						
						<p className="text-sm md:text-base text-foreground/60 leading-relaxed font-body mb-6">
							High-fidelity Weather & GIS engine visualizing complex atmospheric datasets with interactive WebGL rendering and real-time mapping technology.
						</p>
						
						<div className="flex items-center gap-6">
                           <div className="flex flex-col">
                               <span className="text-[10px] font-mono uppercase text-foreground/40 tracking-widest">Stack</span>
                               <span className="text-xs font-bold text-foreground/80">WebGL • GIS • Next.js</span>
                           </div>
                           <div className="w-[1px] h-8 bg-foreground/10" />
                           <div className="flex flex-col">
                               <span className="text-[10px] font-mono uppercase text-foreground/40 tracking-widest">Type</span>
                               <span className="text-xs font-bold text-foreground/80">Interactive Lab</span>
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
			className="relative w-full"
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
