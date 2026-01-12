"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
    id: number;
    title: string;
    category: string;
    type: "enterprise" | "opensource";
    description: string;
    highlights: string[];
    technologies: string[];
    gradient: string;
    icon: React.ReactNode;
    repoUrl?: string;
}

const projects: Project[] = [
    // Enterprise Projects (from CV)
    {
        id: 1,
        title: "Billing Service Middleware",
        category: "Enterprise • PT Pegadaian",
        type: "enterprise",
        description: "Enterprise billing middleware with fault-tolerant retry mechanisms and asynchronous callback architecture for high-volume transaction processing.",
        highlights: [
            "Fault-tolerant retry & async callback using Kafka",
            "Handles 66,000+ daily transactions with 99.9% uptime",
            "Idempotency patterns for exactly-once processing",
        ],
        technologies: ["Java 21", "Spring Boot", "Kafka", "Redis", "PostgreSQL"],
        gradient: "from-orange-500/20 to-red-600/20",
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        ),
    },
    {
        id: 2,
        title: "REST Switching Layer",
        category: "Enterprise • PT Pegadaian",
        type: "enterprise",
        description: "Centralized switching layer for dynamic routing across multiple banking partners with 24/7 service continuity and intelligent load balancing.",
        highlights: [
            "Dynamic routing for multi-partner integrations",
            "24/7 continuity with automatic failover",
            "Integrated 30+ external services via webMethods",
        ],
        technologies: ["Spring Boot", "Software AG webMethods", "Redis", "OpenShift"],
        gradient: "from-blue-500/20 to-indigo-600/20",
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
        ),
    },
    // Open Source Projects (from github.com/annotasi)
    {
        id: 3,
        title: "Library-Service",
        category: "Open Source • @annotasi",
        type: "opensource",
        description: "Production-ready reference implementation showcasing modern Java backend patterns with clean architecture and enterprise security.",
        highlights: [
            "Hexagonal Architecture with CQRS pattern",
            "JWT + MFA authentication flow",
            "OpenAPI 3.1 documentation & code generation",
        ],
        technologies: ["Java 21", "Spring Boot 3", "PostgreSQL", "Docker", "OpenAPI"],
        gradient: "from-emerald-500/20 to-teal-600/20",
        repoUrl: "https://github.com/annotasi/library-service",
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
    },
    {
        id: 4,
        title: "AtBookmark",
        category: "Personal Project • @annotasi",
        type: "opensource",
        description: "Modern bookmark manager with browser extension integration, folder organization, and cloud sync for seamless cross-device experience.",
        highlights: [
            "Full-stack with Next.js frontend & NestJS backend",
            "Browser extension for one-click saving",
            "Smart folder organization & tagging system",
        ],
        technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "TypeScript"],
        gradient: "from-violet-500/20 to-purple-600/20",
        repoUrl: "https://github.com/annotasi",
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
        ),
    },
];

// Nano Banana Button Component
function NanoButton({
    children,
    variant = "primary",
    href,
    icon,
}: {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "github";
    href?: string;
    icon?: React.ReactNode;
}) {
    const baseClasses = `
        inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium
        transition-all duration-300 backdrop-blur-sm
    `;

    const variants = {
        primary: `
            border border-[#ff6b35]/30 bg-[#ff6b35]/10 text-[#ff6b35]
            hover:bg-[#ff6b35] hover:text-white hover:shadow-lg hover:shadow-[#ff6b35]/20
        `,
        secondary: `
            border border-white/10 bg-white/5 text-white/70
            hover:border-white/20 hover:bg-white/10 hover:text-white
        `,
        github: `
            border border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981]
            hover:bg-[#10b981] hover:text-white hover:shadow-lg hover:shadow-[#10b981]/20
        `,
    };

    const className = `${baseClasses} ${variants[variant]}`;

    if (href) {
        return (
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {icon}
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button
            className={className}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {icon}
            {children}
        </motion.button>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            className="group relative"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        >
            <div
                className={`
                    relative overflow-hidden rounded-2xl border border-white/10
                    bg-gradient-to-br ${project.gradient} backdrop-blur-xl
                    p-6 md:p-8 h-full
                    transition-all duration-500 ease-out
                    hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]
                `}
            >
                {/* Type Badge */}
                <div className="absolute right-4 top-4">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${project.type === "enterprise"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-emerald-500/20 text-emerald-400"
                        }`}>
                        {project.type === "enterprise" ? "Enterprise" : "Open Source"}
                    </span>
                </div>

                {/* Grid Pattern */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white/70">
                            {project.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">
                                {project.title}
                            </h3>
                            <span className="text-xs font-medium text-white/50">
                                {project.category}
                            </span>
                        </div>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-white/60">
                        {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="mb-4 space-y-1.5">
                        {project.highlights.map((highlight, hIndex) => (
                            <motion.li
                                key={hIndex}
                                className="flex items-start gap-2 text-xs text-white/70"
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ duration: 0.4, delay: index * 0.1 + hIndex * 0.05 }}
                            >
                                <span className={`mt-1 h-1 w-1 flex-shrink-0 rounded-full ${project.type === "enterprise" ? "bg-[#ff6b35]" : "bg-[#10b981]"
                                    }`} />
                                <span>{highlight}</span>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Technologies */}
                    <div className="mb-4 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/70"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                        {project.type === "enterprise" ? (
                            <NanoButton
                                variant="secondary"
                                icon={
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                            >
                                Case Study
                            </NanoButton>
                        ) : (
                            <NanoButton
                                variant="github"
                                href={project.repoUrl}
                                icon={
                                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                }
                            >
                                View Repository
                            </NanoButton>
                        )}
                    </div>
                </div>

                {/* Hover Glow */}
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const enterpriseProjects = projects.filter(p => p.type === "enterprise");
    const opensourceProjects = projects.filter(p => p.type === "opensource");

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative min-h-screen bg-[#121212] px-6 py-24 md:px-12 lg:px-24"
        >
            {/* Background Gradient */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#ff6b35]/5 blur-3xl" />
                <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#10b981]/5 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    className="mb-16 text-center md:mb-20"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#4a9eff]">
                        Selected Work
                    </p>
                    <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Featured{" "}
                        <span className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                </motion.div>

                {/* Enterprise Projects */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="mb-8 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#ff6b35]">
                        <span className="h-px flex-1 bg-gradient-to-r from-[#ff6b35]/50 to-transparent" />
                        Professional / Enterprise
                        <span className="h-px flex-1 bg-gradient-to-l from-[#ff6b35]/50 to-transparent" />
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        {enterpriseProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* Open Source Projects */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="mb-8 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#10b981]">
                        <span className="h-px flex-1 bg-gradient-to-r from-[#10b981]/50 to-transparent" />
                        Open Source / Personal
                        <span className="h-px flex-1 bg-gradient-to-l from-[#10b981]/50 to-transparent" />
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        {opensourceProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index + 2} />
                        ))}
                    </div>
                </motion.div>

                {/* GitHub CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <motion.a
                        href="https://github.com/annotasi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-8 py-4 text-sm font-medium text-[#10b981] backdrop-blur-sm transition-all duration-300 hover:bg-[#10b981] hover:text-white hover:shadow-lg hover:shadow-[#10b981]/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>Explore @annotasi on GitHub</span>
                        <motion.span
                            className="inline-block"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        >
                            →
                        </motion.span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
