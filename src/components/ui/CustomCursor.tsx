"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailsRef = useRef<HTMLDivElement[]>([]);
    const posRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const trails: HTMLDivElement[] = [];
        const trailCount = 8;

        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement("div");
            trail.className = "custom-cursor";
            trail.style.width = `${6 - i * 0.5}px`;
            trail.style.height = `${6 - i * 0.5}px`;
            trail.style.borderRadius = "50%";
            trail.style.background = `rgba(255, 59, 0, ${0.4 - i * 0.04})`;
            trail.style.transition = `transform ${0.1 + i * 0.03}s ease`;
            document.body.appendChild(trail);
            trails.push(trail);
        }
        trailsRef.current = trails;

        const onMouseMove = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
            cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;

            trails.forEach((trail, i) => {
                setTimeout(() => {
                    trail.style.transform = `translate(${e.clientX - 3 + i * 0.25}px, ${e.clientY - 3 + i * 0.25}px)`;
                }, i * 30);
            });
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            trails.forEach((trail) => trail.remove());
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#FF3B00",
                boxShadow: "0 0 20px rgba(255, 59, 0, 0.5)",
            }}
        />
    );
}
