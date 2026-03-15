"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

function StarField() {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 2000;

    const { originalPositions, sizes } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
            sizes[i] = Math.random() * 0.5 + 0.1;
        }
        return { originalPositions: positions, sizes };
    }, []);

    // We clone originalPositions to a new array that we will mutate each frame
    const positions = useMemo(() => new Float32Array(originalPositions), [originalPositions]);

    // Memoize scratch objects to avoid garbage collection overhead per frame
    const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
    const mouseWorldPos = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        // Base slow rotation
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;

        // Find exact 3D position of the mouse on the Z=0 plane
        state.raycaster.setFromCamera(state.pointer, state.camera);
        state.raycaster.ray.intersectPlane(plane, mouseWorldPos);

        if (mouseWorldPos) {
            // Convert world space mouse position to local space of the rotated points
            pointsRef.current.worldToLocal(mouseWorldPos);

            const positionsArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

            // Simple physics simulation per point
            for (let i = 0; i < count; i++) {
                const idx = i * 3;
                const ox = originalPositions[idx];
                const oy = originalPositions[idx + 1];
                const oz = originalPositions[idx + 2];

                // Current position
                const cx = positionsArr[idx];
                const cy = positionsArr[idx + 1];
                const cz = positionsArr[idx + 2];

                // Vector from particle to mouse
                const dx = cx - mouseWorldPos.x;
                const dy = cy - mouseWorldPos.y;
                const dz = cz - mouseWorldPos.z;

                const distSq = dx * dx + dy * dy + dz * dz;
                const influenceRadius = 4;
                const influenceRadiusSq = influenceRadius * influenceRadius;

                if (distSq < influenceRadiusSq && distSq > 0) {
                    const dist = Math.sqrt(distSq);
                    const force = (influenceRadius - dist) / influenceRadius;
                    // Push particles away (reduced multiplier for a smoother subtle effect)
                    positionsArr[idx] += (dx / dist) * force * 0.15;
                    positionsArr[idx + 1] += (dy / dist) * force * 0.15;
                    positionsArr[idx + 2] += (dz / dist) * force * 0.15;
                } else {
                    // Spring back to original positions slowly
                    positionsArr[idx] += (ox - cx) * 0.05;
                    positionsArr[idx + 1] += (oy - cy) * 0.05;
                    positionsArr[idx + 2] += (oz - cz) * 0.05;
                }
            }

            // Tell Three.js we updated the buffer array
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#ffffff"
                transparent
                opacity={0.6}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

function FloatingGeo({
    geometry,
    position,
    color,
    speed = 1,
    scale = 1,
}: {
    geometry: "icosahedron" | "torus" | "octahedron" | "dodecahedron";
    position: [number, number, number];
    color: string;
    speed?: number;
    scale?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
        }
    });

    const geoElement = useMemo(() => {
        switch (geometry) {
            case "icosahedron":
                return <icosahedronGeometry args={[1, 0]} />;
            case "torus":
                return <torusGeometry args={[1, 0.4, 16, 32]} />;
            case "octahedron":
                return <octahedronGeometry args={[1, 0]} />;
            case "dodecahedron":
                return <dodecahedronGeometry args={[1, 0]} />;
        }
    }, [geometry]);

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh ref={meshRef} position={position} scale={scale}>
                {geoElement}
                <meshStandardMaterial
                    color={color}
                    wireframe
                    transparent
                    opacity={0.35}
                    emissive={color}
                    emissiveIntensity={0.15}
                />
            </mesh>
        </Float>
    );
}

function MouseParallax({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);
    const { pointer } = useThree();

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                pointer.x * 0.15,
                0.05
            );
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                -pointer.y * 0.1,
                0.05
            );
        }
    });

    return <group ref={groupRef}>{children}</group>;
}

export default function HeroScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
            }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#FF3B00" />
            <pointLight position={[-10, -10, -5]} intensity={0.3} color="#E2E8F0" />

            <MouseParallax>
                <StarField />
                <FloatingGeo
                    geometry="icosahedron"
                    position={[-3.5, 1.5, -2]}
                    color="#FF3B00"
                    speed={0.7}
                    scale={0.8}
                />
                <FloatingGeo
                    geometry="torus"
                    position={[3.5, -1, -3]}
                    color="#E2E8F0"
                    speed={0.5}
                    scale={0.7}
                />
                <FloatingGeo
                    geometry="octahedron"
                    position={[2, 2.5, -4]}
                    color="#FF3B00"
                    speed={0.9}
                    scale={0.5}
                />
                <FloatingGeo
                    geometry="dodecahedron"
                    position={[-2.5, -2, -3]}
                    color="#E2E8F0"
                    speed={0.6}
                    scale={0.6}
                />
                <FloatingGeo
                    geometry="icosahedron"
                    position={[4, 0.5, -5]}
                    color="#FF3B00"
                    speed={0.4}
                    scale={0.4}
                />
            </MouseParallax>
        </Canvas>
    );
}
