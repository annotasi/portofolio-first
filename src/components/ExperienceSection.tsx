"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    type: string;
    highlights: string[];
    metrics: { value: string; label: string }[];
    technologies: string[];
}

const experiences: ExperienceItem[] = [
    {
        role: "Application Integration Developer",
        company: "PT Pegadaian (Persero)",
        period: "Aug 2022 — Present",
        type: "Full-time",
        highlights: [
            "PIC for virtual-account middleware handling mission-critical financial transactions",
            "Built and maintained 20+ microservices for internal and external integrations",
            "Integrated 30+ services via Software AG webMethods ESB",
            "Reduced deployment time by ~40% using OpenShift & GitLab CI pipelines",
        ],
        metrics: [
            { value: "100K+", label: "Daily Transactions" },
            { value: "99.9%", label: "Uptime" },
            { value: "20+", label: "Microservices" },
            { value: "40%", label: "Faster Deploys" },
        ],
        technologies: ["Java 21", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "OpenShift", "webMethods"],
    },
];

interface TechCategory {
    name: string;
    technologies: string[];
    color: string;
}

const techStack: TechCategory[] = [
    {
        name: "Core",
        technologies: ["Java 21", "Spring Boot", "Spring Native", "Go"],
        color: "#ff6b35",
    },
    {
        name: "Data & Messaging",
        technologies: ["Kafka", "Redis", "PostgreSQL", "MongoDB"],
        color: "#4a9eff",
    },
    {
        name: "DevOps",
        technologies: ["OpenShift", "Docker", "Jenkins", "GitLab CI"],
        color: "#10b981",
    },
    {
        name: "Integration",
        technologies: ["webMethods", "REST", "gRPC", "OpenAPI"],
        color: "#a855f7",
    },
];

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative min-h-screen bg-[#0d0d0d] px-6 py-24 md:px-12 lg:px-24"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#ff6b35]/3 blur-3xl" />
                <div className="absolute -left-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-[#4a9eff]/3 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Section Header */}
                <motion.div
                    className="mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#ff6b35]">
                        Professional Experience
                    </p>
                    <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Enterprise{" "}
                        <span className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] bg-clip-text text-transparent">
                            Impact
                        </span>
                    </h2>
                    <p className="max-w-2xl text-lg text-white/50">
                        Building mission-critical systems that power financial operations for millions of users.
                    </p>
                </motion.div>

                {/* Experience Timeline */}
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="relative mb-16"
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Timeline Line */}
                        <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-[#ff6b35] to-transparent md:block" />

                        <div className="md:pl-8">
                            {/* Header */}
                            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                <div>
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-1.5 top-1 hidden h-3 w-3 rounded-full bg-[#ff6b35] md:block" />

                                    <h3 className="text-2xl font-bold text-white md:text-3xl">
                                        {exp.role}
                                    </h3>
                                    <p className="text-lg text-[#ff6b35]">{exp.company}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/70">
                                        {exp.period}
                                    </span>
                                    <span className="rounded-full bg-[#ff6b35]/20 px-3 py-1 text-xs font-semibold text-[#ff6b35]">
                                        {exp.type}
                                    </span>
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                                {exp.metrics.map((metric, mIndex) => (
                                    <motion.div
                                        key={mIndex}
                                        className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5, delay: 0.3 + mIndex * 0.1 }}
                                    >
                                        <p className="text-2xl font-bold text-[#ff6b35] md:text-3xl">
                                            {metric.value}
                                        </p>
                                        <p className="text-xs text-white/50">{metric.label}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Highlights */}
                            <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                                    Key Responsibilities
                                </p>
                                <ul className="space-y-3">
                                    {exp.highlights.map((highlight, hIndex) => (
                                        <motion.li
                                            key={hIndex}
                                            className="flex items-start gap-3 text-white/70"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                            transition={{ duration: 0.4, delay: 0.4 + hIndex * 0.1 }}
                                        >
                                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff6b35]" />
                                            <span>{highlight}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-[#ff6b35]/20 bg-[#ff6b35]/10 px-3 py-1 text-xs font-medium text-[#ff6b35]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Tech Stack Grid */}
                <motion.div
                    className="mt-16 border-t border-white/10 pt-16"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <h3 className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
                        Technical Expertise
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {techStack.map((category, categoryIndex) => (
                            <motion.div
                                key={category.name}
                                className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.6 + categoryIndex * 0.1 }}
                            >
                                <div className="mb-3 flex items-center gap-2">
                                    <div
                                        className="h-2 w-2 rounded-full"
                                        style={{ backgroundColor: category.color }}
                                    />
                                    <span
                                        className="text-xs font-semibold uppercase tracking-wider"
                                        style={{ color: category.color }}
                                    >
                                        {category.name}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {category.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
