"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TechCategory {
    name: string;
    technologies: string[];
    color: string;
}

const techStack: TechCategory[] = [
    {
        name: "Core",
        technologies: ["Java 21", "Spring Boot", "Spring Native", "Spring WebFlux"],
        color: "#ff6b35",
    },
    {
        name: "Data & Messaging",
        technologies: ["Apache Kafka", "Redis", "PostgreSQL", "MongoDB", "RabbitMQ"],
        color: "#4a9eff",
    },
    {
        name: "DevOps & Tools",
        technologies: ["OpenShift", "Docker", "Jenkins", "GitLab CI", "Kubernetes"],
        color: "#10b981",
    },
    {
        name: "Integration",
        technologies: ["Software AG webMethods", "REST API", "SOAP", "gRPC", "OpenAPI 3.1"],
        color: "#a855f7",
    },
];

interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    highlights: string[];
}

const experience: ExperienceItem[] = [
    {
        role: "Application Integration Developer",
        company: "PT Pegadaian (Persero)",
        period: "Aug 2022 – Present",
        highlights: [
            "PIC for virtual-account middleware handling 66,000+ daily transactions with 99.9% uptime.",
            "Built 20+ microservices & integrated 30+ services via Software AG webMethods.",
            "Reduced deployment time by ~40% using OpenShift & GitLab CI pipelines.",
        ],
    },
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative min-h-screen bg-[#121212] px-6 py-24 md:px-12 lg:px-24"
        >
            {/* Background Gradient */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#4a9eff]/5 blur-3xl" />
                <div className="absolute -left-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-[#ff6b35]/5 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    className="mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#4a9eff]">
                        About Me
                    </p>
                    <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Backend Developer &{" "}
                        <span className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] bg-clip-text text-transparent">
                            API Architect
                        </span>
                    </h2>
                    <div className="max-w-3xl">
                        <p className="mb-6 text-lg leading-relaxed text-white/70 md:text-xl">
                            I&apos;m <span className="text-white">Singgih Pratama</span>, a Backend Developer
                            specializing in <span className="text-[#ff6b35]">API & Middleware Integration</span> with
                            the Java Spring ecosystem. I architect high-throughput systems that process
                            millions of transactions reliably.
                        </p>
                        <p className="text-lg leading-relaxed text-white/60 md:text-xl">
                            Currently at PT Pegadaian handling mission-critical integrations,
                            I focus on building{" "}
                            <span className="text-[#4a9eff]">fault-tolerant</span>,
                            <span className="text-[#10b981]"> scalable</span>, and{" "}
                            <span className="text-[#a855f7]">observable</span> backend services.
                        </p>
                    </div>
                </motion.div>

                {/* Experience Section */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                    <h3 className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#ff6b35]">
                        Experience
                    </h3>
                    {experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:p-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h4 className="text-xl font-bold text-white md:text-2xl">
                                        {exp.role}
                                    </h4>
                                    <p className="text-[#4a9eff]">{exp.company}</p>
                                </div>
                                <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white/60">
                                    {exp.period}
                                </span>
                            </div>
                            <ul className="space-y-3">
                                {exp.highlights.map((highlight, hIndex) => (
                                    <motion.li
                                        key={hIndex}
                                        className="flex items-start gap-3 text-white/70"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                        transition={{ duration: 0.4, delay: 0.3 + hIndex * 0.1 }}
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff6b35]" />
                                        <span>{highlight}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Tech Stack Grid */}
                <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                    {techStack.map((category, categoryIndex) => (
                        <motion.div
                            key={category.name}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.6, delay: 0.4 + categoryIndex * 0.1 }}
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: category.color }}
                                />
                                <h3
                                    className="text-sm font-semibold uppercase tracking-wider"
                                    style={{ color: category.color }}
                                >
                                    {category.name}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.technologies.map((tech, techIndex) => (
                                    <motion.span
                                        key={tech}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={
                                            isInView
                                                ? { opacity: 1, scale: 1 }
                                                : { opacity: 0, scale: 0.8 }
                                        }
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.5 + categoryIndex * 0.1 + techIndex * 0.03,
                                        }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>

                            <div
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                style={{
                                    background: `radial-gradient(circle at 50% 0%, ${category.color}10, transparent 70%)`,
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-16 md:grid-cols-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {[
                        { number: "4+", label: "Years Experience" },
                        { number: "100K+", label: "Daily Transactions" },
                        { number: "20+", label: "Microservices Built" },
                        { number: "30+", label: "Services Integrated" },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="text-center md:text-left"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                        >
                            <p className="mb-1 text-3xl font-bold text-white md:text-4xl">
                                {stat.number}
                            </p>
                            <p className="text-sm text-white/50">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
