"use client";

import { useRef, useState, useCallback } from "react";

interface MagneticProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}

export default function MagneticButton({
    children,
    className = "",
    strength = 0.3,
}: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * strength;
            const y = (e.clientY - rect.top - rect.height / 2) * strength;
            setPosition({ x, y });
        },
        [strength]
    );

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 });
    }, []);

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: position.x === 0 ? "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)" : "transform 0.15s ease-out",
            }}
        >
            {children}
        </div>
    );
}
