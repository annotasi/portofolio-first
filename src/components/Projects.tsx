"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    technologies: string[];
    gradient: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "AtBookmark",
        category: "Web Application",
        description: "A modern bookmark manager with browser extension integration, folder organization, and cloud sync.",
        technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
        gradient: "from-violet-500/20 to-purple-600/20",
    },
    {
        id: 2,
        title: "AtTabunganEmas",
        category: "Fintech Platform",
        description: "Gold savings tracking application with portfolio management, PnL calculation, and Sharia compliance.",
        technologies: ["Next.js", "Go", "PostgreSQL", "Tailwind"],
        gradient: "from-amber-500/20 to-orange-600/20",
    },
    {
        id: 3,
        title: "E-Commerce Dashboard",
        category: "Admin Panel",
        description: "Real-time analytics dashboard with inventory management, sales tracking, and customer insights.",
        technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
        gradient: "from-cyan-500/20 to-blue-600/20",
    },
    {
        id: 4,
        title: "Creative Portfolio",
        category: "Interactive Website",
        description: "Award-winning portfolio with scroll-linked animations, canvas rendering, and immersive storytelling.",
        technologies: ["Next.js", "Framer Motion", "Canvas API", "TypeScript"],
        gradient: "from-rose-500/20 to-pink-600/20",
    },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            className="group relative"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        >
            {/* Card */}
            <div
                className={`
          relative overflow-hidden rounded-2xl border border-white/10
          bg-gradient-to-br ${project.gradient} backdrop-blur-xl
          p-6 md:p-8
          transition-all duration-500 ease-out
          hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]
          hover:scale-[1.02]
        `}
            >
                {/* Subtle Grid Pattern */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Content */}
                <div className="relative z-10">
                    <div className="mb-4 flex items-start justify-between">
                        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/60">
                            {project.category}
                        </span>
                        <motion.div
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white"
                            whileHover={{ rotate: 45, scale: 1.1 }}
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </motion.div>
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                        {project.title}
                    </h3>

                    <p className="mb-6 text-sm leading-relaxed text-white/60 md:text-base">
                        {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hover Glow Effect */}
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

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-[#121212] px-6 py-24 md:px-12 lg:px-24"
        >
            {/* Background Gradient */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#ff6b35]/5 blur-3xl" />
                <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#4a9eff]/5 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    className="mb-16 text-center md:mb-24"
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

                {/* Projects Grid */}
                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    className="mt-16 text-center md:mt-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <motion.button
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>View All Projects</span>
                        <motion.span
                            className="inline-block"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        >
                            →
                        </motion.span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
