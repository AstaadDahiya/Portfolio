"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineItem {
    company: string;
    role: string;
    date: string;
    description: string;
    color: string;
}

const timeline: TimelineItem[] = [
    {
        company: "SmartBridge",
        role: "Generative AI Intern",
        date: "2025",
        description:
            "Built generative AI solutions using Google Cloud and Vertex AI, developing production-ready AI pipelines and prompt engineering workflows.",
        color: "#FF3B00",
    },
    {
        company: "1M1B",
        role: "AI & Data Analytics Intern",
        date: "2025",
        description:
            "Designed data analytics dashboards with Tableau and built AI models for social impact initiatives, processing large-scale datasets.",
        color: "#E2E8F0",
    },
    {
        company: "ApexPlanet",
        role: "Front-End Developer Intern",
        date: "2025",
        description:
            "Developed responsive web applications using React and modern JavaScript, implementing pixel-perfect UI components and animations.",
        color: "#FF3B00",
    },
];

function TimelineNode({
    item,
    index,
}: {
    item: TimelineItem;
    index: number;
}) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

    const isLeft = index % 2 === 0;

    return (
        <div
            ref={nodeRef}
            className={`relative flex items-center w-full mb-16 md:mb-24 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:flex-row`}
        >
            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className={`w-full md:w-[calc(50%-40px)] ${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                    } text-left pl-12 md:pl-0`}
            >
                <p
                    className="text-xs tracking-[0.3em] uppercase mb-2"
                    style={{ color: item.color }}
                >
                    {item.date}
                </p>
                <h3 className="text-xl md:text-2xl font-bold mb-1">{item.company}</h3>
                <p className="text-sm mb-3" style={{ color: item.color }}>
                    {item.role}
                </p>
                <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                >
                    {item.description}
                </p>
            </motion.div>

            {/* Node Dot — centered on the timeline */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10"
            >
                <div
                    className="w-4 h-4 rounded-full"
                    style={{
                        background: item.color,
                        boxShadow: `0 0 20px ${item.color}80, 0 0 40px ${item.color}40`,
                    }}
                />
            </motion.div>

            {/* Spacer for the other side */}
            <div className="hidden md:block w-[calc(50%-40px)]" />
        </div>
    );
}

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative py-32 px-6 md:px-16"
            style={{ background: "#050507" }}
        >
            <div className="max-w-5xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <p
                        className="text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ color: "#E2E8F0" }}
                    >
                        EXPERIENCE
                    </p>
                    <h2
                        className="font-bold tracking-tighter"
                        style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
                    >
                        TRAJECTORY
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical dashed line */}
                    <div
                        className="absolute left-[7px] md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px]"
                        style={{
                            background:
                                "repeating-linear-gradient(to bottom, rgba(255, 59, 0, 0.3) 0px, rgba(255, 59, 0, 0.3) 8px, transparent 8px, transparent 16px)",
                        }}
                    />

                    {timeline.map((item, i) => (
                        <TimelineNode key={item.company} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
