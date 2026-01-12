"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SaaSProduct {
    id: number;
    name: string;
    tagline: string;
    description: string;
    features: string[];
    status: "live" | "beta" | "development";
    gradient: string;
    accentColor: string;
    icon: React.ReactNode;
    techStack: string[];
    liveUrl?: string;
}

const products: SaaSProduct[] = [
    {
        id: 1,
        name: "atBookmark",
        tagline: "Smart Bookmark Manager",
        description: "A modern bookmark manager with browser extension integration, intelligent folder organization, and seamless cloud sync across all your devices.",
        features: [
            "One-click browser extension",
            "Smart folder organization & tagging",
            "Cloud sync across devices",
            "Full-text search & filters",
        ],
        status: "live",
        gradient: "from-violet-600 to-purple-700",
        accentColor: "#8b5cf6",
        techStack: ["Next.js", "NestJS", "PostgreSQL", "Chrome Extension"],
        liveUrl: "https://atbookmark.annotasi.com",
        icon: (
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
        ),
    },
    {
        id: 2,
        name: "atTabunganEmas",
        tagline: "Gold Asset Tracking",
        description: "Personal gold savings tracker with portfolio management, real-time PnL calculation, and Sharia-compliant zakat computation for Indonesian users.",
        features: [
            "Portfolio management & tracking",
            "Real-time profit/loss calculation",
            "Zakat computation (Sharia-compliant)",
            "Historical price charts",
        ],
        status: "development",
        gradient: "from-amber-500 to-orange-600",
        accentColor: "#f59e0b",
        techStack: ["Next.js", "Go", "PostgreSQL", "Tailwind CSS"],
        icon: (
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

function StatusBadge({ status }: { status: SaaSProduct["status"] }) {
    const styles = {
        live: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        beta: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        development: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    };

    const labels = {
        live: "Live",
        beta: "Beta",
        development: "In Development",
    };

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${status === "live" ? "bg-emerald-400" : status === "beta" ? "bg-blue-400" : "bg-amber-400"} animate-pulse`} />
            {labels[status]}
        </span>
    );
}

function ProductCard({ product, index }: { product: SaaSProduct; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            className="group relative"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
        >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] p-1">
                {/* Product Header with Gradient */}
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${product.gradient} p-8 pb-24`}>
                    {/* Decorative Pattern */}
                    <div className="pointer-events-none absolute inset-0 opacity-10">
                        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-black/20 blur-2xl" />
                    </div>

                    <div className="relative z-10">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                                {product.icon}
                            </div>
                            <StatusBadge status={product.status} />
                        </div>

                        <h3 className="mb-2 text-3xl font-bold text-white">
                            {product.name}
                        </h3>
                        <p className="text-lg font-medium text-white/80">
                            {product.tagline}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="relative -mt-16 rounded-2xl bg-[#1a1a1a] p-6">
                    <p className="mb-6 text-sm leading-relaxed text-white/60">
                        {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                            Key Features
                        </p>
                        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {product.features.map((feature, fIndex) => (
                                <motion.li
                                    key={fIndex}
                                    className="flex items-center gap-2 text-sm text-white/70"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 + fIndex * 0.05 }}
                                >
                                    <svg className="h-4 w-4 flex-shrink-0" style={{ color: product.accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>{feature}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6 flex flex-wrap gap-2">
                        {product.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Action Button */}
                    {product.liveUrl && (
                        <motion.a
                            href={product.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Visit Site
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function SaaSVentures() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            id="products"
            className="relative min-h-screen bg-[#121212] px-6 py-24 md:px-12 lg:px-24"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-violet-600/5 blur-3xl" />
                <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Section Header */}
                <motion.div
                    className="mb-16 text-center md:mb-20"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#8b5cf6]">
                        SaaS Ventures
                    </p>
                    <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Products I&apos;m{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                            Building
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-white/50">
                        Full-stack applications designed to solve real problems.
                        Currently in active development under the <span className="text-white/70">annotasi</span> brand.
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid gap-8 md:grid-cols-2">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>

                {/* Coming Soon Teaser */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <p className="text-sm text-white/40">
                        More products coming soon. Building in public at{" "}
                        <a
                            href="https://github.com/annotasi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8b5cf6] transition-colors hover:text-violet-400"
                        >
                            @annotasi
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
