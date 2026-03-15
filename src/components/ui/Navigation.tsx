"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "MISSIONS", href: "#projects" },
    { label: "TRAJECTORY", href: "#experience" },
    { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Show nav after scrolling past hero
        setIsVisible(latest > 400);
        lastScrollY.current = latest;
    });

    // Track active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -40% 0px" }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-2 py-2 rounded-full flex items-center gap-1"
            style={{
                background: "rgba(5, 5, 7, 0.7)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
        >
            {/* Logo */}
            <Link
                href="/"
                className="px-4 py-2 text-sm font-bold tracking-tight cursor-none"
                style={{
                    background: "linear-gradient(135deg, #FF3B00, #E2E8F0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
            >
                A.
            </Link>

            {/* Links */}
            {navLinks.map((link) => (
                <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="relative px-3 py-2 text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 cursor-none rounded-full"
                    style={{
                        color: activeSection === link.href.slice(1) ? "#FF3B00" : "rgba(255,255,255,0.4)",
                    }}
                >
                    {activeSection === link.href.slice(1) && (
                        <motion.div
                            layoutId="navActive"
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: "rgba(255, 59, 0, 0.08)",
                                border: "1px solid rgba(255, 59, 0, 0.15)",
                            }}
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{link.label}</span>
                </a>
            ))}

            {/* Resume Button */}
            <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 px-4 py-2 text-[10px] tracking-[0.15em] uppercase rounded-full transition-all duration-300 cursor-none hover:bg-[#FF3B00] hover:text-[#050507]"
                style={{
                    background: "rgba(255, 59, 0, 0.1)",
                    border: "1px solid rgba(255, 59, 0, 0.2)",
                    color: "#FF3B00",
                }}
            >
                RÉSUMÉ
            </a>
        </motion.nav>
    );
}
