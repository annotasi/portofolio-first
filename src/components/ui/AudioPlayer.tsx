"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioPlayerProps {
    src?: string;
    initialVolume?: number;
    fadeDuration?: number;
}

export default function AudioPlayer({
    src = "/audio/ambient-synthwave.mp3",
    initialVolume = 0.25,
    fadeDuration = 1500,
}: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    // Initialize audio on mount
    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0;
        audio.preload = "auto";

        audio.addEventListener("canplaythrough", () => {
            setIsLoaded(true);
        });

        audioRef.current = audio;

        return () => {
            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current);
            }
            audio.pause();
            audio.src = "";
        };
    }, [src]);

    // Fade volume smoothly
    const fadeVolume = useCallback(
        (targetVolume: number, onComplete?: () => void) => {
            const audio = audioRef.current;
            if (!audio) return;

            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current);
            }

            const steps = 30;
            const stepDuration = fadeDuration / steps;
            const volumeStep = (targetVolume - audio.volume) / steps;
            let currentStep = 0;

            fadeIntervalRef.current = setInterval(() => {
                currentStep++;
                const newVolume = Math.max(0, Math.min(1, audio.volume + volumeStep));
                audio.volume = newVolume;

                if (currentStep >= steps) {
                    if (fadeIntervalRef.current) {
                        clearInterval(fadeIntervalRef.current);
                    }
                    audio.volume = targetVolume;
                    onComplete?.();
                }
            }, stepDuration);
        },
        [fadeDuration]
    );

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio || !isLoaded) return;

        if (isPlaying) {
            // Fade out then pause
            fadeVolume(0, () => {
                audio.pause();
            });
            setIsPlaying(false);
        } else {
            // Start playing then fade in
            audio.volume = 0;
            audio.play().then(() => {
                fadeVolume(initialVolume);
            });
            setIsPlaying(true);
        }
    }, [isPlaying, isLoaded, fadeVolume, initialVolume]);

    // Equalizer bar animation variants
    const barVariants = {
        playing: (i: number) => ({
            scaleY: [0.3, 1, 0.5, 0.8, 0.3],
            transition: {
                duration: 0.8 + i * 0.1,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: i * 0.1,
            },
        }),
        paused: {
            scaleY: 0.15,
            transition: {
                duration: 0.4,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
        >
            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && !isPlaying && (
                    <motion.div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs font-medium text-white/70 shadow-lg"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                    >
                        🎵 Enable ambient music
                        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#1a1a1a]" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
                onClick={togglePlay}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                disabled={!isLoaded}
                className={`
                    group relative flex items-center gap-3 overflow-hidden rounded-full
                    border border-white/10 bg-[#1a1a1a]/90 backdrop-blur-xl
                    px-4 py-3 shadow-lg shadow-black/20
                    transition-all duration-300
                    hover:border-[#00BFFF]/30 hover:shadow-[0_0_20px_rgba(0,191,255,0.15)]
                    disabled:cursor-wait disabled:opacity-50
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isPlaying ? "Pause ambient music" : "Play ambient music"}
            >
                {/* Glow Effect */}
                <div
                    className={`
                        pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500
                        ${isPlaying ? "opacity-100" : "group-hover:opacity-50"}
                    `}
                    style={{
                        background: "radial-gradient(circle at center, rgba(0,191,255,0.15) 0%, transparent 70%)",
                    }}
                />

                {/* Equalizer Bars */}
                <div className="relative flex h-5 items-end gap-[3px]">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            className="w-[3px] origin-bottom rounded-full"
                            style={{
                                background: isPlaying
                                    ? "linear-gradient(to top, #00BFFF, #40E0D0)"
                                    : "rgba(255,255,255,0.3)",
                                height: "100%",
                            }}
                            variants={barVariants}
                            animate={isPlaying ? "playing" : "paused"}
                            custom={i}
                        />
                    ))}
                </div>

                {/* Label */}
                <span className="relative text-xs font-medium text-white/70">
                    {isPlaying ? "ON" : "OFF"}
                </span>

                {/* Pulse Ring Animation (when playing) */}
                {isPlaying && (
                    <motion.div
                        className="absolute inset-0 rounded-full border border-[#00BFFF]/30"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    />
                )}
            </motion.button>
        </motion.div>
    );
}
