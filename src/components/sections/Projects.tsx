"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

interface Project {
    title: string;
    slug: string;
    description: string;
    tags: string[];
    icon: React.ReactNode;
    github: string;
}

const projects: Project[] = [
    {
        title: "VIRASAT",
        slug: "virasat",
        description:
            "AI tools for artisans. Voice → product listing. Auto-priced. Auto-marketed.",
        tags: ["Next.js", "Node.js", "Python", "PostgreSQL", "AWS"],
        icon: (
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF3B00"
                strokeWidth="1.5"
            >
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9h6v6H9z" />
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
            </svg>
        ),
        github: "https://github.com/AstaadDahiya/Virasat-2.0",
    },
    {
        title: "PRISm",
        slug: "prism",
        description:
            "85% AUC. 30% faster clinician assessments. Hospital readmission, predicted.",
        tags: ["Python", "XGBoost", "SHAP", "SQL"],
        icon: (
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="1.5"
            >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
        github: "https://github.com/AstaadDahiya/PRISm",
    },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setRotation({ x: -y * 10, y: x * 10 });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    const accentColor = index === 0 ? "#FF3B00" : "#E2E8F0";

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            className="perspective-container"
        >
            <div
                className="tilt-card relative p-8 md:p-12 rounded-2xl overflow-hidden group"
                style={{
                    background: "#1A1A2E",
                    border: `1px solid rgba(255, 255, 255, 0.06)`,
                    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Glow border on hover */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        boxShadow: `inset 0 0 0 1px ${accentColor}40, 0 0 40px ${accentColor}15`,
                    }}
                />

                {/* Top gradient line */}
                <div
                    className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                    }}
                />

                {/* Icon */}
                <div className="mb-6">{project.icon}</div>

                {/* Title */}
                <h3
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                    style={{ color: accentColor }}
                >
                    {project.title}
                </h3>

                {/* Description */}
                <p
                    className="text-base md:text-lg mb-8 max-w-lg"
                    style={{ color: "var(--text-secondary)" }}
                >
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs tracking-wider rounded-full"
                            style={{
                                border: `1px solid ${accentColor}30`,
                                color: `${accentColor}`,
                                background: `${accentColor}08`,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-6">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase hover:gap-4 transition-all duration-300"
                        style={{ color: accentColor }}
                    >
                        CASE STUDY
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                    </Link>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase opacity-50 hover:opacity-100 transition-all duration-300"
                        style={{ color: "white" }}
                    >
                        GITHUB
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-32 px-6 md:px-16"
            style={{ background: "#050507" }}
        >
            <div className="w-full">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <p
                        className="text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ color: "#FF3B00" }}
                    >
                        FEATURED WORK
                    </p>
                    <h2
                        className="font-bold tracking-tighter"
                        style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
                    >
                        MISSIONS
                    </h2>
                </motion.div>

                {/* Project Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
