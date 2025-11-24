"use client";

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from './context/ThemeContext';
import * as THREE from 'three';

// --- Remastered Shape Generators ---

// 1. Hero: Radiant Sun (Core + Rays) - Denser & Shinier
function generateRadiantSun(count, radius) {
    const positions = new Float32Array(count * 3);
    // Increased core density for "Solid/Shiny" look
    const coreCount = Math.floor(count * 0.75); // 75% in core
    const rayCount = count - coreCount; // 25% in rays

    // Core: Dense Sphere (Tighter radius for brightness)
    const coreRadius = radius * 0.85;
    for (let i = 0; i < coreCount; i++) {
        // Bias towards center for glowing core effect
        const r = coreRadius * Math.pow(Math.random(), 0.5);
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }

    // Rays: Beams radiating out
    const numRays = 12;
    for (let i = 0; i < rayCount; i++) {
        const rayIndex = i % numRays;
        const phi = Math.acos(-1 + (2 * rayIndex) / numRays);
        const theta = Math.sqrt(numRays * Math.PI) * phi;

        const dirX = Math.sin(phi) * Math.cos(theta);
        const dirY = Math.sin(phi) * Math.sin(theta);
        const dirZ = Math.cos(phi);

        // Distance along the ray
        const dist = coreRadius + Math.random() * (radius * 4);

        // Scatter
        const scatter = 0.6;

        const idx = coreCount + i;
        positions[idx * 3] = dirX * dist + (Math.random() - 0.5) * scatter;
        positions[idx * 3 + 1] = dirY * dist + (Math.random() - 0.5) * scatter;
        positions[idx * 3 + 2] = dirZ * dist + (Math.random() - 0.5) * scatter;
    }

    return positions;
}

// 2. About: Geodesic Globe (Structured Sphere)
function generateGlobe(count, radius) {
    const positions = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
        const r = Math.sqrt(1 - y * y); // Radius at y
        const theta = phi * i; // Golden angle increment

        positions[i * 3] = radius * Math.cos(theta) * r;
        positions[i * 3 + 1] = radius * y;
        positions[i * 3 + 2] = radius * Math.sin(theta) * r;
    }
    return positions;
}

// 3. Partners: Saturn Ring (Flat, wide, dense ring)
function generateSaturnRing(count, radius) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * 2 * Math.PI;
        // Ring width between radius and radius + 4
        const r = radius + Math.random() * 4.0;

        positions[i * 3] = r * Math.cos(theta);
        positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5; // Very flat
        positions[i * 3 + 2] = r * Math.sin(theta);
    }
    return positions;
}

// 4. Services: Data Matrix (Wide Grid Floor/Ceiling)
function generateMatrix(count, size) {
    const positions = new Float32Array(count * 3);
    const side = Math.ceil(Math.sqrt(count / 2)); // 2 layers
    const step = size / side;
    const offset = size / 2;

    let i = 0;
    for (let x = 0; x < side; x++) {
        for (let z = 0; z < side; z++) {
            if (i >= count) break;
            // Floor
            positions[i * 3] = (x * step - offset) * 2; // Spread out
            positions[i * 3 + 1] = -4; // Below
            positions[i * 3 + 2] = (z * step - offset) * 2;
            i++;

            if (i >= count) break;
            // Ceiling
            positions[i * 3] = (x * step - offset) * 2;
            positions[i * 3 + 1] = 4; // Above
            positions[i * 3 + 2] = (z * step - offset) * 2;
            i++;
        }
    }
    return positions;
}

// 5. Contact: Galactic Vortex (Tapered Spiral)
function generateVortex(count, radius, height) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const t = i / count; // 0 to 1
        const angle = t * Math.PI * 20;
        // Radius gets smaller as we go up (tornado)
        const r = (1 - t) * radius + 1;

        positions[i * 3] = r * Math.cos(angle);
        positions[i * 3 + 1] = (t - 0.5) * height;
        positions[i * 3 + 2] = r * Math.sin(angle);
    }
    return positions;
}

function InteractiveParticles({ mouse, theme, scrollProgress }) {
    const meshRef = useRef();
    // Increased count for density
    const count = 3000;

    // Pre-calculate all shapes (Remastered)
    const shapes = useMemo(() => [
        generateRadiantSun(count, 3.5), // 0: Hero (Radiant Sun)
        generateGlobe(count, 6.5),      // 1: About
        generateSaturnRing(count, 7.0), // 2: Partners
        generateMatrix(count, 12.0),    // 3: Services
        generateVortex(count, 8, 18)    // 4: Contact
    ], []);

    // Current positions buffer
    const positions = useMemo(() => new Float32Array(shapes[0]), [shapes]);
    // Velocities for momentum
    const velocities = useMemo(() => new Float32Array(count * 3), []);

    // Reusable objects
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const position = useMemo(() => new THREE.Vector3(), []);
    const velocity = useMemo(() => new THREE.Vector3(), []);
    const lookAtTarget = useMemo(() => new THREE.Vector3(), []);

    // Track mouse velocity
    const lastMouse = useRef([0, 0]);
    const mouseVelocity = useRef(0);

    // Smoothed Scroll Progress
    const smoothedScroll = useRef(0);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Mouse in world space
        const mx = mouse.current[0] * 6;
        const my = mouse.current[1] * 6;

        // Calculate mouse velocity
        const dmx = mx - lastMouse.current[0];
        const dmy = my - lastMouse.current[1];
        const currentMouseSpeed = Math.sqrt(dmx * dmx + dmy * dmy);

        mouseVelocity.current = THREE.MathUtils.lerp(mouseVelocity.current, currentMouseSpeed, 0.1);
        lastMouse.current = [mx, my];

        const isMoving = mouseVelocity.current > 0.01;

        // --- SMOOTH SCROLL LERP ---
        smoothedScroll.current = THREE.MathUtils.lerp(smoothedScroll.current, scrollProgress, 0.04);

        // Determine target shape based on SMOOTHED scroll
        const totalShapes = shapes.length - 1;
        const floatIndex = smoothedScroll.current * totalShapes;
        const index1 = Math.floor(floatIndex);
        const index2 = Math.min(index1 + 1, totalShapes);
        const blend = floatIndex - index1;

        // Explosive Transition Intensity
        const transitionIntensity = Math.sin(blend * Math.PI);
        const explosionScale = 2.0;

        // Global Rotation
        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.03;
            meshRef.current.rotation.z = time * 0.01;
        }

        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            let x = positions[ix];
            let y = positions[iy];
            let z = positions[iz];

            // Interpolate Home Position
            const ox1 = shapes[index1][ix];
            const oy1 = shapes[index1][iy];
            const oz1 = shapes[index1][iz];

            const ox2 = shapes[index2][ix];
            const oy2 = shapes[index2][iy];
            const oz2 = shapes[index2][iz];

            let ox = ox1 + (ox2 - ox1) * blend;
            let oy = oy1 + (oy2 - oy1) * blend;
            let oz = oz1 + (oz2 - oz1) * blend;

            // Apply Explosive Scatter (Subtle)
            if (transitionIntensity > 0.01) {
                const distFromCenter = Math.sqrt(ox * ox + oy * oy + oz * oz);
                const dirX = ox / (distFromCenter || 1);
                const dirY = oy / (distFromCenter || 1);
                const dirZ = oz / (distFromCenter || 1);

                const scatter = transitionIntensity * explosionScale;
                ox += dirX * scatter;
                oy += dirY * scatter;
                oz += dirZ * scatter;
            }

            // Vector from particle to mouse
            const dx = mx - x;
            const dy = my - y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            const radius = 5.0;

            // Force calculation
            let fx = 0;
            let fy = 0;
            let fz = 0;

            if (dist < radius) {
                // 1. Attraction (Gravity)
                const attractionStrength = (1 - dist / radius) * 0.05;
                fx += dx * attractionStrength;
                fy += dy * attractionStrength;
                fz += (0 - z) * attractionStrength * 0.5;

                // 2. Repulsion (Halo)
                const repulsionRadius = 1.0;
                if (dist < repulsionRadius) {
                    const repulsionStrength = (1 - dist / repulsionRadius) * 0.2;
                    fx -= dx * repulsionStrength * 2;
                    fy -= dy * repulsionStrength * 2;
                }
            }

            // 3. Return to Dynamic Home (Shape Morphing)
            const k = 0.05;
            fx += (ox - x) * k;
            fy += (oy - y) * k;
            fz += (oz - z) * k;

            // 4. Turbulence
            const noiseScale = isMoving ? 0.0001 : 0.0003;
            fx += Math.sin(time * 0.5 + y) * noiseScale;
            fy += Math.cos(time * 0.5 + x) * noiseScale;

            // Apply force
            velocities[ix] += fx;
            velocities[iy] += fy;
            velocities[iz] += fz;

            // Damping
            velocities[ix] *= 0.90;
            velocities[iy] *= 0.90;
            velocities[iz] *= 0.90;

            // Update position
            positions[ix] += velocities[ix];
            positions[iy] += velocities[iy];
            positions[iz] += velocities[iz];

            // --- INSTANCED MESH UPDATE ---

            position.set(positions[ix], positions[iy], positions[iz]);
            dummy.position.copy(position);

            velocity.set(velocities[ix], velocities[iy], velocities[iz]);
            const speed = velocity.length();

            lookAtTarget.copy(position).add(velocity);
            dummy.lookAt(lookAtTarget);

            // Increased Base Scale for visibility
            const baseScale = 0.025;
            const stretch = 1 + (speed * 20);

            dummy.scale.set(baseScale, baseScale, baseScale * stretch);

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }

        if (meshRef.current) {
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
                color={theme === 'light' ? '#f59e0b' : '#38bdf8'}
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    );
}

export default function ThreeBackground() {
    const mouse = useRef([0, 0]);
    const { theme } = useTheme();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current = [
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            ];
        };

        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: theme === 'light'
                    ? 'linear-gradient(to bottom right, #fffbeb, #fef3c7)'
                    : 'linear-gradient(to bottom right, #0f172a, #020617)',
                transition: 'background 1s ease'
            }}
        >
            <Canvas camera={{ position: [0, 0, 14], fov: 60 }}>
                <InteractiveParticles mouse={mouse} theme={theme} scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    );
}
