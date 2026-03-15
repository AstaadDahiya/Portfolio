"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingAbstractShape() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { pointer } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x =
                state.clock.elapsedTime * 0.3 + pointer.y * 0.2;
            meshRef.current.rotation.y =
                state.clock.elapsedTime * 0.2 + pointer.x * 0.2;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.8, 1]} />
                <meshStandardMaterial
                    color="#FF3B00"
                    wireframe
                    transparent
                    opacity={0.25}
                    emissive="#FF3B00"
                    emissiveIntensity={0.2}
                />
            </mesh>
            <mesh>
                <torusGeometry args={[2.2, 0.05, 16, 64]} />
                <meshStandardMaterial
                    color="#E2E8F0"
                    transparent
                    opacity={0.3}
                    emissive="#E2E8F0"
                    emissiveIntensity={0.3}
                />
            </mesh>
        </Float>
    );
}

function Particles() {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 300;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const r = 2 + Math.random() * 2;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#FF3B00"
                transparent
                opacity={0.5}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

export default function AboutScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
            gl={{ alpha: true }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.5} color="#FF3B00" />
            <pointLight position={[-5, -5, 5]} intensity={0.3} color="#E2E8F0" />
            <FloatingAbstractShape />
            <Particles />
        </Canvas>
    );
}
