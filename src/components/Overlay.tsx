"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextSectionProps {
    children: React.ReactNode;
    scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    startAt: number;
    endAt: number;
    alignment?: "center" | "left" | "right";
    parallaxSpeed?: number;
}

function TextSection({
    children,
    scrollProgress,
    startAt,
    endAt,
    alignment = "center",
    parallaxSpeed = 0.2,
}: TextSectionProps) {
    const midPoint = (startAt + endAt) / 2;
    const fadeInStart = startAt;
    const fadeInEnd = midPoint - 0.05;
    const fadeOutStart = midPoint + 0.05;
    const fadeOutEnd = endAt;

    const opacity = useTransform(scrollProgress, (value) => {
        if (value < fadeInStart) return 0;
        if (value < fadeInEnd) return (value - fadeInStart) / (fadeInEnd - fadeInStart);
        if (value < fadeOutStart) return 1;
        if (value < fadeOutEnd) return 1 - (value - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        return 0;
    });

    const y = useTransform(
        scrollProgress,
        [startAt, endAt],
        [100 * parallaxSpeed, -100 * parallaxSpeed]
    );

    const scale = useTransform(scrollProgress, (value) => {
        if (value < fadeInStart || value > fadeOutEnd) return 0.95;
        if (value >= fadeInEnd && value <= fadeOutStart) return 1;
        if (value < fadeInEnd) {
            return 0.95 + 0.05 * ((value - fadeInStart) / (fadeInEnd - fadeInStart));
        }
        return 1 - 0.05 * ((value - fadeOutStart) / (fadeOutEnd - fadeOutStart));
    });

    const alignmentClasses = {
        center: "items-center justify-center text-center",
        left: "items-center justify-start text-left pl-8 md:pl-16 lg:pl-24",
        right: "items-center justify-end text-right pr-8 md:pr-16 lg:pr-24",
    };

    return (
        <motion.div
            className={`pointer-events-none absolute inset-0 flex ${alignmentClasses[alignment]}`}
            style={{ opacity, y, scale }}
        >
            {children}
        </motion.div>
    );
}

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const handleScrollTo = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div
            ref={containerRef}
            className="pointer-events-none absolute inset-0 z-10"
            style={{ height: "500vh" }}
        >
            <div className="sticky top-0 h-screen w-full">
                {/* Section 1: Hero (0% - 25% scroll) */}
                <TextSection
                    scrollProgress={scrollYProgress}
                    startAt={0}
                    endAt={0.25}
                    alignment="center"
                    parallaxSpeed={0.3}
                >
                    <div className="max-w-4xl px-6">
                        <motion.p
                            className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/60"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Backend Developer → Product Engineer
                        </motion.p>
                        <motion.h1
                            className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                                Building Products
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
                                & Scalable Systems
                            </span>
                        </motion.h1>
                        <motion.p
                            className="mb-8 text-lg font-light text-white/70 md:text-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                        >
                            Enterprise middleware by day. <span className="text-[#f59e0b]">SaaS products</span> by passion.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="pointer-events-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1, duration: 0.8 }}
                        >
                            <motion.button
                                onClick={() => handleScrollTo("#products")}
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>View Products</span>
                                <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </motion.button>
                            <motion.button
                                onClick={() => handleScrollTo("#experience")}
                                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>View Resume</span>
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </motion.button>
                        </motion.div>
                    </div>
                </TextSection>

                {/* Section 2: SaaS Focus (30% - 55% scroll) */}
                <TextSection
                    scrollProgress={scrollYProgress}
                    startAt={0.3}
                    endAt={0.55}
                    alignment="left"
                    parallaxSpeed={0.25}
                >
                    <div className="max-w-2xl">
                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#8b5cf6]">
                            Product Builder
                        </p>
                        <h2 className="text-4xl font-semibold leading-snug text-white md:text-5xl lg:text-6xl">
                            Shipping{" "}
                            <span className="bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent">
                                real products
                            </span>{" "}
                            to users.
                        </h2>
                    </div>
                </TextSection>

                {/* Section 3: Enterprise (60% - 85% scroll) */}
                <TextSection
                    scrollProgress={scrollYProgress}
                    startAt={0.6}
                    endAt={0.85}
                    alignment="right"
                    parallaxSpeed={0.25}
                >
                    <div className="max-w-2xl">
                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#ff6b35]">
                            Enterprise Grade
                        </p>
                        <h2 className="text-4xl font-semibold leading-snug text-white md:text-5xl lg:text-6xl">
                            <span className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] bg-clip-text text-transparent">
                                100K+
                            </span>{" "}
                            daily transactions.
                        </h2>
                    </div>
                </TextSection>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
                    }}
                >
                    <motion.div
                        className="flex flex-col items-center gap-2"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <p className="text-xs uppercase tracking-widest text-white/40">Scroll</p>
                        <svg
                            className="h-6 w-6 text-white/40"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
