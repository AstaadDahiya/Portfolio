"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = "ARYAN".split("");

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Lock scroll during preloader
        document.body.style.overflow = "hidden";
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
        }, 2800);
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                    style={{ background: "#050507" }}
                >
                    {/* Letter-by-letter reveal */}
                    <div className="flex items-center gap-1">
                        {letters.map((letter, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.3 + i * 0.12,
                                    ease: [0.215, 0.61, 0.355, 1],
                                }}
                                className="font-bold tracking-tighter"
                                style={{
                                    fontSize: "clamp(4rem, 12vw, 10rem)",
                                    display: "inline-block",
                                    background: "linear-gradient(135deg, #FF3B00, #E2E8F0)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="text-xs tracking-[0.5em] uppercase mt-4"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                        LOADING PORTFOLIO
                    </motion.p>

                    {/* Loading bar */}
                    <motion.div
                        className="mt-8 h-[1px] rounded-full"
                        style={{ background: "rgba(255, 59, 0, 0.3)", width: 120 }}
                    >
                        <motion.div
                            className="h-full rounded-full"
                            style={{ background: "#FF3B00" }}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
