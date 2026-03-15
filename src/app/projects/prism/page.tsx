"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import PageTransition from "@/components/ui/PageTransition";

const techStack = [
    { name: "Python", desc: "Core ML pipeline and data processing" },
    { name: "XGBoost", desc: "Gradient boosting for prediction models" },
    { name: "SHAP", desc: "Explainable AI for clinical interpretability" },
    { name: "SQL", desc: "Healthcare data querying and management" },
    { name: "Pandas", desc: "Data manipulation and feature engineering" },
];

const features = [
    {
        title: "Readmission Risk Scoring",
        desc: "XGBoost model trained on patient demographics, diagnosis codes, lab results, and treatment history to predict 30-day readmission probability.",
        icon: "📊",
    },
    {
        title: "SHAP Explainability",
        desc: "Every prediction comes with SHAP-based feature importance — clinicians see exactly which factors drive each risk score, building trust in AI decisions.",
        icon: "🔍",
    },
    {
        title: "Clinical Dashboard",
        desc: "Real-time dashboard showing patient risk stratification, enabling clinicians to prioritize high-risk patients for follow-up care plans.",
        icon: "🏥",
    },
    {
        title: "30% Faster Assessments",
        desc: "Automated risk scoring eliminates hours of manual chart review, enabling clinicians to make faster, data-driven discharge decisions.",
        icon: "⚡",
    },
];

const metrics = [
    { value: "85%", label: "AUC Score" },
    { value: "30%", label: "Faster assessments" },
    { value: "12+", label: "Clinical features analyzed" },
    { value: "10K+", label: "Patient records processed" },
];

export default function PrismPage() {
    const heroRef = useRef<HTMLElement>(null);
    const featRef = useRef<HTMLDivElement>(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const isFeatInView = useInView(featRef, { once: true, margin: "-100px" });

    return (
        <PageTransition>
            <main className="relative" style={{ background: "#050507" }}>
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-white/50 hover:text-[#E2E8F0] transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M13 8H3M7 4L3 8l4 4" />
                        </svg>
                        BACK
                    </Link>
                </nav>

                {/* Hero */}
                <section
                    ref={heroRef}
                    className="relative min-h-screen flex items-center justify-center px-6 py-32"
                >
                    <div className="w-full max-w-[1800px] mx-auto text-center px-4 md:px-12">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="text-xs tracking-[0.5em] uppercase mb-6"
                            style={{ color: "#E2E8F0" }}
                        >
                            CASE STUDY · 02
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-bold tracking-tighter mb-6"
                            style={{ fontSize: "clamp(3rem, 10vw, 10rem)", color: "#E2E8F0" }}
                        >
                            PRISm
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-xl md:text-2xl max-w-2xl mx-auto mb-12"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Predictive hospital readmission model achieving 85% AUC. Interpretable ML giving clinicians
                            actionable insights — reducing assessment time by 30%.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap items-center justify-center gap-4"
                        >
                            <a
                                href="https://github.com/AstaadDahiya/PRISm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-full text-sm tracking-[0.15em] uppercase border transition-all duration-300 hover:bg-[#E2E8F0] hover:text-white hover:border-[#E2E8F0]"
                                style={{ borderColor: "rgba(226, 232, 240, 0.3)", color: "#E2E8F0" }}
                            >
                                VIEW ON GITHUB →
                            </a>
                        </motion.div>
                    </div>

                    {/* Decorative gradient */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse at 50% 80%, rgba(226, 232, 240, 0.06) 0%, transparent 60%)",
                        }}
                    />
                </section>

                {/* Metrics */}
                <section className="py-20 px-6 border-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <div className="w-full max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-12">
                        {metrics.map((m, i) => (
                            <motion.div
                                key={m.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="text-center"
                            >
                                <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#E2E8F0" }}>
                                    {m.value}
                                </p>
                                <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-secondary)" }}>
                                    {m.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section className="py-32 px-6" ref={featRef}>
                    <div className="w-full max-w-[1800px] mx-auto px-4 md:px-12">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isFeatInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="text-xs tracking-[0.4em] uppercase mb-4"
                            style={{ color: "#E2E8F0" }}
                        >
                            CAPABILITIES
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={isFeatInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16"
                        >
                            KEY FEATURES
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((f, i) => (
                                <motion.div
                                    key={f.title}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="p-8 rounded-2xl"
                                    style={{
                                        background: "#1A1A2E",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                    }}
                                >
                                    <span className="text-3xl mb-4 block">{f.icon}</span>
                                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                        {f.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="py-32 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-full max-w-[1800px] mx-auto px-4 md:px-12">
                        <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#E2E8F0" }}>
                            ARCHITECTURE
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">
                            TECH STACK
                        </h2>

                        <div className="space-y-4">
                            {techStack.map((t, i) => (
                                <motion.div
                                    key={t.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="flex items-center justify-between p-6 rounded-xl"
                                    style={{
                                        background: "rgba(26, 26, 46, 0.5)",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                    }}
                                >
                                    <span className="text-lg font-semibold" style={{ color: "#E2E8F0" }}>
                                        {t.name}
                                    </span>
                                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                        {t.desc}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32 px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8">
                        Want to see the code?
                    </h2>
                    <a
                        href="https://github.com/AstaadDahiya/PRISm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase border transition-all duration-300 hover:bg-[#E2E8F0] hover:text-white hover:border-[#E2E8F0]"
                        style={{ borderColor: "rgba(226, 232, 240, 0.3)", color: "#E2E8F0" }}
                    >
                        VIEW REPOSITORY ON GITHUB
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                    </a>
                </section>
            </main>
        </PageTransition>
    );
}
