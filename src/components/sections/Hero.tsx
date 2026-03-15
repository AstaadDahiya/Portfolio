"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#050507]" />,
});

const nameLetters = "ARYAN".split("");
const subtitleWords = "BUILDS THINGS THAT FLY.".split(" ");

const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.7,
            delay: 0.8 + i * 0.08,
            ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
        },
    }),
};

const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 1.3 + i * 0.1,
            ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
        },
    }),
};

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToProjects = () => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative w-full h-screen overflow-hidden"
            style={{ background: "#050507" }}
        >
            {/* 3D Background */}
            {mounted && <HeroScene />}

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                {/* Main Headline — letter stagger */}
                <h1
                    className="font-bold tracking-tighter leading-[0.85] flex items-center"
                    style={{
                        fontSize: "clamp(3rem, 12vw, 14vw)",
                        letterSpacing: "-0.04em",
                    }}
                >
                    {nameLetters.map((letter, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-block text-white"
                            style={{ display: "inline-block" }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </h1>

                {/* Subtitle — word stagger */}
                <h2
                    className="font-bold tracking-tighter leading-[0.85] mt-2 flex flex-wrap items-center justify-center gap-x-[0.3em]"
                    style={{
                        fontSize: "clamp(1.2rem, 4.5vw, 5.5vw)",
                    }}
                >
                    {subtitleWords.map((word, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-block"
                            style={{
                                background:
                                    "linear-gradient(135deg, #FFFFFF 0%, #FF3B00 50%, #E2E8F0 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2 }}
                    className="mt-8 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase"
                    style={{ color: "var(--text-secondary)" }}
                >
                    AI/ML Engineer · Full-Stack Developer · ECE @ MAIT Delhi
                </motion.p>

                {/* CTA Button — Magnetic */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.3 }}
                >
                    <MagneticButton className="mt-12" strength={0.4}>
                        <button
                            onClick={scrollToProjects}
                            className="px-8 py-4 border border-white/30 rounded-full text-sm tracking-[0.2em] uppercase
                           text-white/80 hover:text-[#050507] hover:bg-[#FF3B00] hover:border-[#FF3B00]
                           hover:shadow-[0_0_40px_rgba(255, 59, 0,0.4)]
                           transition-all duration-500 cursor-none"
                        >
                            SEE MY WORK ↓
                        </button>
                    </MagneticButton>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div
                        className="w-3 h-3 rounded-full animate-drift-down"
                        style={{
                            background: "#FF3B00",
                            boxShadow:
                                "0 0 20px rgba(255, 59, 0, 0.5), 0 0 60px rgba(255, 59, 0, 0.2)",
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
