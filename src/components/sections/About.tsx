"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const AboutScene = dynamic(() => import("@/components/three/AboutScene"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div
                className="w-32 h-32 rounded-full animate-pulse-glow"
                style={{ background: "rgba(255, 59, 0, 0.1)" }}
            />
        </div>
    ),
});

const skills = [
    "Python",
    "Next.js",
    "TypeScript",
    "TensorFlow",
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "PostgreSQL",
    "XGBoost",
    "Pandas",
    "Scikit-learn",
    "Git",
    "REST APIs",
    "SQL",
    "Tableau",
    "Streamlit",
    "GCP",
    "Vertex AI",
    "Gemini",
    "LangChain",
    "SHAP",
    "HTML/CSS",
    "JavaScript",
];

function TypewriterText({ text, inView }: { text: string; inView: boolean }) {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        if (!inView) return;
        let i = 0;
        setDisplayText("");
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 30);
        return () => clearInterval(interval);
    }, [inView, text]);

    return (
        <span>
            {displayText}
            <span
                className="inline-block w-[2px] h-[1.1em] ml-1 align-middle"
                style={{
                    background: "#FF3B00",
                    animation: "blink-caret 0.75s step-end infinite",
                }}
            />
        </span>
    );
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative min-h-screen py-32 px-6 md:px-16"
            style={{ background: "#050507" }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left — 3D Shape */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-[400px] md:h-[500px]"
                    >
                        <AboutScene />
                    </motion.div>

                    {/* Right — Bio + Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    >
                        {/* Section Label */}
                        <p
                            className="text-xs tracking-[0.4em] uppercase mb-6"
                            style={{ color: "#FF3B00" }}
                        >
                            ABOUT
                        </p>

                        {/* Typewriter Quote */}
                        <div className="text-2xl md:text-3xl font-semibold leading-relaxed mb-8">
                            <TypewriterText
                                text="I engineer AI-powered products. I make them scale. I make them matter."
                                inView={isInView}
                            />
                        </div>

                        {/* Bio */}
                        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>
                            Electronic engineering student at MAIT, Delhi, specializing in AI/ML and full-stack development.
                            I build systems that bridge the gap between cutting-edge research and production-ready software —
                            from deep learning models to scalable cloud architectures.
                        </p>

                        {/* Skill Pills */}
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, i) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.5 + i * 0.04,
                                        ease: "easeOut",
                                    }}
                                    className="px-4 py-2 text-xs tracking-wider rounded-full border cursor-default"
                                    style={{
                                        borderColor: "rgba(255, 59, 0, 0.2)",
                                        color: "rgba(255, 255, 255, 0.7)",
                                        background: "rgba(255, 59, 0, 0.04)",
                                        animation: `sine-float ${3 + (i % 4) * 0.5}s ease-in-out ${(i % 6) * 0.3}s infinite`,
                                    }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
