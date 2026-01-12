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
    // Calculate opacity: fade in from startAt, peak at midpoint, fade out at endAt
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

    // Parallax Y movement
    const y = useTransform(
        scrollProgress,
        [startAt, endAt],
        [100 * parallaxSpeed, -100 * parallaxSpeed]
    );

    // Slight scale animation
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

    // Track scroll progress of the scrolly section (same target as ScrollyCanvas's parent)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div
            ref={containerRef}
            className="pointer-events-none absolute inset-0 z-10"
            style={{ height: "500vh" }}
        >
            {/* Sticky container for text overlays */}
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
                            Welcome
                        </motion.p>
                        <motion.h1
                            className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                                Singgih Pratama
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-xl font-light text-white/70 md:text-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                        >
                            <span className="text-[#ff6b35]">Creative</span> Developer
                        </motion.p>
                    </div>
                </TextSection>

                {/* Section 2: Statement (30% - 55% scroll) */}
                <TextSection
                    scrollProgress={scrollYProgress}
                    startAt={0.3}
                    endAt={0.55}
                    alignment="left"
                    parallaxSpeed={0.25}
                >
                    <div className="max-w-2xl">
                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#4a9eff]">
                            What I Do
                        </p>
                        <h2 className="text-4xl font-semibold leading-snug text-white md:text-5xl lg:text-6xl">
                            I build{" "}
                            <span className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] bg-clip-text text-transparent">
                                digital
                            </span>{" "}
                            experiences.
                        </h2>
                    </div>
                </TextSection>

                {/* Section 3: Philosophy (60% - 85% scroll) */}
                <TextSection
                    scrollProgress={scrollYProgress}
                    startAt={0.6}
                    endAt={0.85}
                    alignment="right"
                    parallaxSpeed={0.25}
                >
                    <div className="max-w-2xl">
                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#4a9eff]">
                            My Approach
                        </p>
                        <h2 className="text-4xl font-semibold leading-snug text-white md:text-5xl lg:text-6xl">
                            Bridging{" "}
                            <span className="bg-gradient-to-r from-[#4a9eff] to-[#6fb5ff] bg-clip-text text-transparent">
                                design
                            </span>{" "}
                            and engineering.
                        </h2>
                    </div>
                </TextSection>

                {/* Scroll indicator - only visible at the start */}
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
