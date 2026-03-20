"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function FloatingPaths({ position, mouseX, mouseY }: { position: number, mouseX: number, mouseY: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.svg
                className="w-full h-full text-primary opacity-60 dark:opacity-40"
                viewBox="0 0 696 316"
                fill="none"
                animate={{
                    x: mouseX * position * -20,
                    y: mouseY * position * -20,
                    rotate: mouseX * position * 2,
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
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
                            duration: 20 + Math.random() * 10,
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
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className={cn("relative min-h-screen w-full flex flex-col overflow-hidden bg-background", className)}>
            <div className="absolute inset-0 z-0">
                <FloatingPaths position={1} mouseX={mousePosition.x} mouseY={mousePosition.y} />
                <FloatingPaths position={-1} mouseX={mousePosition.x} mouseY={mousePosition.y} />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col flex-1">
                {children}
            </div>
        </div>
    );
}
