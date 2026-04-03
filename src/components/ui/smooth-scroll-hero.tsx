"use client";
import * as React from "react";

import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
} from "framer-motion";

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
	/**
	 * Final clip path percentage
	 * @default 75
	 */
	finalClipPercentage?: number;
}

interface ISmoothScrollHeroBackgroundProps extends ISmoothScrollHeroProps {}

const SmoothScrollHeroBackground: React.FC<ISmoothScrollHeroBackgroundProps> = ({
	scrollHeight = 1500,
	iframeSrc,
	initialClipPercentage = 25,
	finalClipPercentage = 75,
}) => {
	const { scrollY } = useScroll();

	const clipStart = useTransform(
		scrollY,
		[0, scrollHeight],
		[initialClipPercentage, 0],
	);
	const clipEnd = useTransform(
		scrollY,
		[0, scrollHeight],
		[finalClipPercentage, 100],
	);

	const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

	const scale = useTransform(
		scrollY,
		[0, scrollHeight + 500],
		[1.7, 1],
	);

	return (
		<motion.div
			className="sticky top-0 h-screen w-full bg-transparent flex items-center justify-center p-4 md:p-12 overflow-hidden pointer-events-none"
			style={{
				clipPath,
				willChange: "transform, opacity, clip-path",
			}}
		>
			{/* Scaled animated container holding the iframe */}
			<motion.div
				className="w-full h-full relative rounded-2xl overflow-hidden bg-card border border-border shadow-2xl pointer-events-auto"
				style={{
					scale,
					transformOrigin: "center center"
				}}
			>
				{/* Top Mock Window Bar */}
				<div className="absolute top-0 left-0 w-full h-12 bg-background/50 backdrop-blur-md border-b border-border flex items-center px-4 gap-2 z-10">
					<div className="w-3 h-3 rounded-full bg-red-500/80" />
					<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
					<div className="w-3 h-3 rounded-full bg-green-500/80" />
					<div className="ml-4 flex-1 h-6 bg-foreground/5 rounded flex items-center justify-center px-4">
					    <span className="font-mono text-xs text-foreground/50 truncate tracking-widest">{iframeSrc}</span>
					</div>
					<div className="w-12" /> {/* Spacer */}
				</div>

				<iframe 
					src={iframeSrc} 
					className="w-full h-full pt-12 border-none pointer-events-none"
					title="Project Interactive Window"
					loading="lazy"
				/>
				
				{/* Anti-hijack overlay prevents accidental scrolling inside iframe */}
				<div className="absolute inset-x-0 bottom-0 top-12 z-0 pointer-events-none" />

				{/* Cartographix Project Intro with Grain Background Overlay */}
				<motion.div 
					className="absolute bottom-6 md:bottom-12 left-6 md:left-12 z-40 p-6 rounded-2xl border border-foreground/10 overflow-hidden pointer-events-none shadow-2xl max-w-[320px] md:max-w-md"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-10%" }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{/* Grain Background */}
					<div 
						className="absolute inset-0 bg-background/60 backdrop-blur-3xl"
						style={{
							backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
							backgroundSize: "100px 100px",
							opacity: 0.5
						}}
					/>
					<div className="relative z-10">
						<h3 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">Project Showcase</h3>
						<h2 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-3">Cartographix</h2>
						<p className="text-sm text-foreground/70 leading-relaxed">
							High-performance spatial data rendering and interactive WebGL experiences deployed on the edge.
						</p>
					</div>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

const SmoothScrollHero: React.FC<ISmoothScrollHeroProps> = ({
	scrollHeight = 1500,
	iframeSrc,
	initialClipPercentage = 25,
	finalClipPercentage = 75,
}) => {
	return (
		<div
			style={{ height: `calc(${scrollHeight}px + 100vh)` }}
			className="relative w-full"
		>
			<SmoothScrollHeroBackground
				scrollHeight={scrollHeight}
				iframeSrc={iframeSrc}
				initialClipPercentage={initialClipPercentage}
				finalClipPercentage={finalClipPercentage}
			/>
		</div>
	);
};

export default SmoothScrollHero;
