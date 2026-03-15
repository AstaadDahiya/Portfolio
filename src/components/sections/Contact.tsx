"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const links = [
    {
        label: "Email",
        href: "mailto:engineer.aryan.work@gmail.com",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aryan-dahiya-astaad1/",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        href: "https://github.com/AstaadDahiya",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-32 px-6 md:px-16 min-h-[80vh] flex flex-col items-center justify-center"
            style={{ background: "#050507" }}
        >
            {/* Animated gradient background */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, rgba(255, 59, 0, 0.15) 0%, rgba(226, 232, 240, 0.08) 40%, transparent 70%)",
                    animation: "gradient-shift 8s ease infinite",
                    backgroundSize: "200% 200%",
                }}
            />

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* Section Label */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-xs tracking-[0.4em] uppercase mb-8"
                    style={{ color: "#FF3B00" }}
                >
                    CONTACT
                </motion.p>

                {/* Big CTA Text */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-bold tracking-tighter mb-6"
                    style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
                >
                    LET&apos;S BUILD
                </motion.h2>
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-bold tracking-tighter mb-16"
                    style={{
                        fontSize: "clamp(2.5rem, 7vw, 7rem)",
                        background:
                            "linear-gradient(135deg, #FF3B00 0%, #E2E8F0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    SOMETHING.
                </motion.h2>

                {/* Links */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
                >
                    {links.map((link) => (
                        <MagneticButton key={link.label} strength={0.3}>
                            <a
                                href={link.href}
                                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-white/60 hover:text-[#FF3B00]
                           hover:-translate-y-1 transition-all duration-300 group cursor-none"
                            >
                                <span className="group-hover:drop-shadow-[0_0_8px_rgba(255, 59, 0,0.5)] transition-all duration-300">
                                    {link.icon}
                                </span>
                                <span className="text-sm tracking-[0.15em] uppercase">
                                    {link.label}
                                </span>
                            </a>
                        </MagneticButton>
                    ))}
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-8 w-full text-center"
            >
                <p
                    className="text-xs tracking-[0.3em] uppercase"
                    style={{ color: "rgba(255, 255, 255, 0.2)" }}
                >
                    © ARYAN 2025 · MAIT DELHI
                </p>
            </motion.footer>
        </section>
    );
}
