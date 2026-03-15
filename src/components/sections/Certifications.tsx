"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const certifications = [
    { name: "Google Gen AI Academy", issuer: "Google Cloud" },
    { name: "Prompt Design in Vertex AI", issuer: "Google Cloud" },
    {
        name: "Develop GenAI Apps with Gemini & Streamlit",
        issuer: "Google Cloud",
    },
    { name: "Introduction to Generative AI", issuer: "Google Cloud" },
    { name: "Introduction to Large Language Models", issuer: "Google Cloud" },
    { name: "Responsible AI", issuer: "Google Cloud" },
    { name: "Generative AI Certification", issuer: "VaultOfCodes" },
    { name: "Front-End Development", issuer: "ApexPlanet" },
];

function CertCard({
    name,
    issuer,
}: {
    name: string;
    issuer: string;
}) {
    return (
        <div
            className="flex-shrink-0 px-8 py-6 rounded-xl glass mx-3"
            style={{
                minWidth: "300px",
                background: "rgba(26, 26, 46, 0.5)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
        >
            <div className="flex items-center gap-3 mb-3">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(255, 59, 0, 0.1)" }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF3B00"
                        strokeWidth="2"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>
                <span
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "#FF3B00" }}
                >
                    {issuer}
                </span>
            </div>
            <p className="text-sm font-medium text-white/80">{name}</p>
        </div>
    );
}

export default function Certifications() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Double the array for infinite scroll illusion
    const doubled = [...certifications, ...certifications];

    return (
        <section
            ref={sectionRef}
            id="certifications"
            className="relative py-32 overflow-hidden"
            style={{ background: "#050507" }}
        >
            <div className="max-w-6xl mx-auto px-6 md:px-16 mb-16">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ color: "#FF3B00" }}
                    >
                        CERTIFICATIONS
                    </p>
                    <h2
                        className="font-bold tracking-tighter"
                        style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
                    >
                        CLEARANCES
                    </h2>
                </motion.div>
            </div>

            {/* Marquee Row 1 */}
            <div className="relative w-full overflow-hidden mb-4">
                {/* Fade edges */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-32 z-10"
                    style={{
                        background:
                            "linear-gradient(to right, #050507, transparent)",
                    }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-32 z-10"
                    style={{
                        background:
                            "linear-gradient(to left, #050507, transparent)",
                    }}
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex animate-marquee"
                    style={{ width: "max-content" }}
                >
                    {doubled.map((cert, i) => (
                        <CertCard key={`row1-${i}`} name={cert.name} issuer={cert.issuer} />
                    ))}
                </motion.div>
            </div>

            {/* Marquee Row 2 (reverse) */}
            <div className="relative w-full overflow-hidden">
                <div
                    className="absolute left-0 top-0 bottom-0 w-32 z-10"
                    style={{
                        background:
                            "linear-gradient(to right, #050507, transparent)",
                    }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-32 z-10"
                    style={{
                        background:
                            "linear-gradient(to left, #050507, transparent)",
                    }}
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex"
                    style={{
                        width: "max-content",
                        animation: "marquee 35s linear infinite reverse",
                    }}
                >
                    {doubled.reverse().map((cert, i) => (
                        <CertCard key={`row2-${i}`} name={cert.name} issuer={cert.issuer} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
