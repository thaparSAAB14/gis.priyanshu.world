'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const { resolvedTheme } = useTheme();

	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		particles: THREE.Points[];
		animationId: number;
		count: number;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		let animationId: number = 0;
		let handleResizeRef: (() => void) | null = null;
		let handlePointerMoveRef: ((e: PointerEvent) => void) | null = null;

		const init = () => {
			if (!containerRef.current) return;

			// Tune geometric physical expansion back slightly to +25%
			const SEPARATION = 190;
			const AMOUNTX = 40; 
			const AMOUNTY = 50; 

			// Scene setup
			const scene = new THREE.Scene();
			// Utilize a strict Linear Fog curve set significantly away from the physical eye line (Z=2000+) to guarantee a razor-sharp center resolution
			scene.fog = new THREE.Fog(resolvedTheme === 'dark' ? 0x0a0a0a : 0xfcfcfc, 2000, 6000);

		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		camera.position.set(0, 355, 1220);

		let mouseX = 0;
		let mouseY = 0;

		const onPointerMove = (event: PointerEvent) => {
			if (event.isPrimary === false) return;
			// Map cursor accurately to 3D grid plane coordinates
			mouseX = (event.clientX - window.innerWidth / 2) * 3; 
			mouseY = (event.clientY - window.innerHeight / 2) * 6;
		};
		
		window.addEventListener('pointermove', onPointerMove);
		handlePointerMoveRef = onPointerMove;

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(scene.fog.color, 0);

		containerRef.current.appendChild(renderer.domElement);

		// Create particles
		const particles: THREE.Points[] = [];
		const positions: number[] = [];

		// Create geometry for all particles
		const geometry = new THREE.BufferGeometry();

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const y = 0; // Will be animated
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

				positions.push(x, y, z);
			}
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3),
		);

		// Create material
		const material = new THREE.PointsMaterial({
			size: 8,
			color: 0x72e3ad, // Default to Dark Mode Sleepy Lime Green
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		// Create points object
		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;
		let animationId: number = 0;

		// Animation function
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			const positionAttribute = geometry.attributes.position;
			const positions = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const index = i * 3;

					// Base coordinates mapping
					const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
					const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

					// Lazy, smooth ripples
					let currentY =
						Math.sin((ix + count) * 0.12) * 55 +
						Math.sin((iy + count) * 0.18) * 55;

					// Interactive Vertex Swell - magnetic pull on the cursor
					const dx = x - mouseX;
					const dz = z - mouseY;
					const distance = Math.sqrt(dx * dx + dz * dz);
					const hoverRadius = 800; // Constrained 3d brush size

					if (distance < hoverRadius) {
						// Smooth mathematical geometric swell
						const swell = Math.pow((hoverRadius - distance) / hoverRadius, 1.5) * 130;
						currentY += swell;
					}

					positions[index + 1] = currentY;

					i++;
				}
			}

			positionAttribute.needsUpdate = true;

			// Reintroduce the camera parallax, severely constraining the translation to prevent massive POV rotation
			camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.05;
			camera.position.y += (-mouseY * 0.1 + 355 - camera.position.y) * 0.05;
			camera.lookAt(scene.position);

			renderer.render(scene, camera);
			count += 0.025; // Lazy, drifting atmospheric speed
		};

		// Handle window resize
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		handleResizeRef = handleResize;

		window.addEventListener('resize', handleResize);

		// Start animation
		animate();

			// Store references
			sceneRef.current = {
				scene,
				camera,
				renderer,
				particles: [points],
				animationId,
				count,
			};
		};

		const mountTimeout = setTimeout(init, 50);

		// Cleanup function
		return () => {
			clearTimeout(mountTimeout);
			if (animationId) cancelAnimationFrame(animationId);
			if (handleResizeRef) window.removeEventListener('resize', handleResizeRef);
			if (handlePointerMoveRef) window.removeEventListener('pointermove', handlePointerMoveRef);

			if (sceneRef.current) {
				// Clean up Three.js objects
				sceneRef.current.scene.traverse((object) => {
					if (object instanceof THREE.Points) {
						object.geometry.dispose();
						if (Array.isArray(object.material)) {
							object.material.forEach((material) => material.dispose());
						} else {
							object.material.dispose();
						}
					}
				});

				sceneRef.current.renderer.dispose();

				if (containerRef.current && sceneRef.current.renderer.domElement) {
					containerRef.current.removeChild(
						sceneRef.current.renderer.domElement,
					);
				}
			}
		};
	}, []); // Mount exactly once to protect WebGL context

	// Dynamically mutate Fog and PointsMaterial on theme switch without dropping WebGL context
	useEffect(() => {
		if (!sceneRef.current) return;
		const isDark = resolvedTheme === 'dark';
		const targetFogColor = isDark ? 0x0a0a0a : 0xfcfcfc;
		const targetDotColor = isDark ? 0x72e3ad : 0x1e6a45; // Darker Forest Green for massive visual contrast in light mode
		
		sceneRef.current.scene.fog = new THREE.Fog(targetFogColor, 2000, 6000);
		sceneRef.current.renderer.setClearColor(sceneRef.current.scene.fog.color, 0);

		// Recursively mutate particle colors
		sceneRef.current.particles.forEach((points) => {
			if (points.material instanceof THREE.PointsMaterial) {
				points.material.color.setHex(targetDotColor);
			}
		});
	}, [resolvedTheme]);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none absolute inset-0 z-0', className)}
			{...props}
		/>
	);
}
