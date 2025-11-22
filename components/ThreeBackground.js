"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

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

function Stars(props) {
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
                    color="#FFD700"
                    size={0.005} // Increased size
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function SolarParticles({ mouse }) {
    const ref = useRef();
    const sphere = useMemo(() => generateSpherePositions(2000, 2.5), []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        ref.current.rotation.y = time * 0.05;

        const x = (mouse.current[0] * Math.PI) / 10;
        const y = (mouse.current[1] * Math.PI) / 10;
        ref.current.rotation.x = Math.sin(time * 0.1) + y;
        ref.current.rotation.z = x;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#0ea5e9"
                    size={0.006} // Increased size
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8} // Increased opacity
                />
            </Points>
        </group>
    );
}

export default function ThreeBackground() {
    const mouse = useRef([0, 0]);

    const handleMouseMove = (e) => {
        mouse.current = [
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
        ];
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
            }}
        >
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars />
                <SolarParticles mouse={mouse} />
            </Canvas>
        </div>
    );
}
