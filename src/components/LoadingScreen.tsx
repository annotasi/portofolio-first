"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
    progress: number;
    isLoading: boolean;
    onLoadingComplete?: () => void;
}

export default function LoadingScreen({
    progress,
    isLoading,
    onLoadingComplete,
}: LoadingScreenProps) {
    // Lock scroll when loading
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            onLoadingComplete?.();
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isLoading, onLoadingComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Logo/Brand Mark */}
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="relative">
                            <span className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                                SP
                            </span>
                            <motion.div
                                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#ff6b35] to-[#4a9eff]"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </div>
                    </motion.div>

                    {/* Progress Container */}
                    <div className="w-64 max-w-[80vw]">
                        {/* Progress Bar */}
                        <div className="relative mb-4 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#ff6b35] via-[#ff8f5a] to-[#4a9eff]"
                                style={{ width: `${progress}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                            />
                            {/* Glow effect */}
                            <motion.div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#ff6b35] to-[#4a9eff] blur-sm"
                                style={{ width: `${progress}%`, opacity: 0.5 }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                            />
                        </div>

                        {/* Progress Text */}
                        <div className="flex items-center justify-between">
                            <motion.p
                                className="text-xs uppercase tracking-[0.2em] text-white/40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Loading Experience
                            </motion.p>
                            <motion.span
                                className="font-mono text-sm tabular-nums text-white/60"
                                key={progress}
                                initial={{ opacity: 0.5, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.1 }}
                            >
                                {progress}%
                            </motion.span>
                        </div>
                    </div>

                    {/* Subtle animated dots */}
                    <motion.div
                        className="absolute bottom-12 flex gap-1.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="h-1.5 w-1.5 rounded-full bg-white/20"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.2, 0.5, 0.2],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
