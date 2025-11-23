"use client";

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from './context/ThemeContext';
import * as THREE from 'three';

function generateSpherePositions(count, radius) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
}

function Stars({ theme, ...props }) {
    const ref = useRef();
    const sphere = useMemo(() => generateSpherePositions(5000, 1.5), []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={theme === 'light' ? '#FFA500' : '#FFD700'}
                    size={0.005} // Increased size
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function SolarParticles({ mouse, theme }) {
    const ref = useRef();
    // Increase count for better effect
    const count = 3000;
    const initialPositions = useMemo(() => generateSpherePositions(count, 2.5), []);

    // Store current positions to update them
    const positions = useMemo(() => new Float32Array(initialPositions), [initialPositions]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Mouse position in 3D space (approximate mapping from normalized 2D)
        // Mouse is [-1, 1], map to scene coordinates roughly [-2, 2]
        const targetX = mouse.current[0] * 2;
        const targetY = mouse.current[1] * 2;

        // Attraction strength
        const attraction = 0.05;
        const returnStrength = 0.02;

        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            // Current pos
            let x = positions[ix];
            let y = positions[iy];
            let z = positions[iz];

            // Original pos (home)
            const ox = initialPositions[ix];
            const oy = initialPositions[iy];
            const oz = initialPositions[iz];

            // Distance to mouse
            const dx = targetX - x;
            const dy = targetY - y;
            // We ignore Z for mouse interaction to keep it simple, or assume mouse is at z=0
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Attraction logic: if close to mouse, move towards it.
            // But also keep some organic movement.

            // Move towards mouse
            x += dx * attraction;
            y += dy * attraction;

            // Pull back to original position (elasticity)
            x += (ox - x) * returnStrength;
            y += (oy - y) * returnStrength;
            z += (oz - z) * returnStrength;

            // Add some noise/rotation
            const noise = Math.sin(time + x) * 0.002;
            x += noise;
            y += noise;

            positions[ix] = x;
            positions[iy] = y;
            positions[iz] = z;
        }

        // Update geometry
        if (ref.current) {
            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={theme === 'light' ? '#FFD700' : '#0ea5e9'}
                    size={0.008} // Slightly larger
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
}

export default function ThreeBackground() {
    const mouse = useRef([0, 0]);
    const { theme } = useTheme();

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current = [
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            ];
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
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
                    ? 'radial-gradient(circle at center, #f0f9ff 0%, #e0f2fe 100%)'
                    : 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
            }}
        >
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars theme={theme} />
                <SolarParticles mouse={mouse} theme={theme} />
            </Canvas>
        </div>
    );
}
