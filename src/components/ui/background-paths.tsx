"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

function FloatingPaths({ position, mouseX, mouseY }: { position: number, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) {
    // Generate fewer, more spaced-out paths to drastically reduce SVG node count overhead
    const paths = Array.from({ length: 20 }, (_, i) => {
        const spread = i * 1.5; // increase visual spread to compromise for fewer paths
        return {
            id: i,
            d: `M-${380 - spread * 5 * position} -${189 + spread * 6}C-${
                380 - spread * 5 * position
            } -${189 + spread * 6} -${312 - spread * 5 * position} ${216 - spread * 6} ${
                152 - spread * 5 * position
            } ${343 - spread * 6}C${616 - spread * 5 * position} ${470 - spread * 6} ${
                684 - spread * 5 * position
            } ${875 - spread * 6} ${684 - spread * 5 * position} ${875 - spread * 6}`,
            width: 0.5 + i * 0.04,
        };
    });

    // Hardware-accelerated dynamic transforms directly bound to the MotionValues
    const xTransform = useTransform(mouseX, (v) => v * position * -20);
    const yTransform = useTransform(mouseY, (v) => v * position * -20);
    const rotateTransform = useTransform(mouseX, (v) => v * position * 2);

    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.svg
                className="w-full h-full text-primary opacity-60 dark:opacity-40"
                viewBox="0 0 696 316"
                fill="none"
                style={{
                    x: xTransform,
                    y: yTransform,
                    rotate: rotateTransform,
                }}
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 25 + Math.random() * 15,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </motion.svg>
        </div>
    );
}

export function BackgroundPaths({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 45, damping: 25 });
    const smoothY = useSpring(mouseY, { stiffness: 45, damping: 25 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Bypass React state entirely, updating Framer Motion values directly on the GPU
            mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
            mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };

        // Passive event listener for high performance scrolling/mouse monitoring
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className={cn("relative min-h-screen w-full flex flex-col overflow-hidden bg-background", className)}>
            <div className="absolute inset-0 z-0">
                <FloatingPaths position={1} mouseX={smoothX} mouseY={smoothY} />
                <FloatingPaths position={-1} mouseX={smoothX} mouseY={smoothY} />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col flex-1">
                {children}
            </div>
        </div>
    );
}
