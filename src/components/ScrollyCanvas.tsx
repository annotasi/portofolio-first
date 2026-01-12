"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Total number of frames in the sequence
const FRAME_COUNT = 75;

// Generate frame file names based on the actual naming pattern
const getFramePath = (index: number): string => {
    const paddedIndex = String(index).padStart(2, "0");
    // 0.066s at indices 1, 4, 7, 10, 13... (i.e., index % 3 === 1)
    const delay = index % 3 === 1 ? "0.066s" : "0.067s";
    return `/sequence/frame_${paddedIndex}_delay-${delay}.webp`;
};

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    // Track scroll progress within the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress (0-1) to frame index (0-74)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload all images
    useEffect(() => {
        const loadImages = async () => {
            const imagePromises: Promise<HTMLImageElement>[] = [];
            let loaded = 0;

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        loaded++;
                        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
                        resolve(img);
                    };
                    img.onerror = reject;
                    img.src = getFramePath(i);
                });
                imagePromises.push(promise);
            }

            try {
                const loadedImages = await Promise.all(imagePromises);
                setImages(loadedImages);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to load images:", error);
            }
        };

        loadImages();
    }, []);

    // Draw image on canvas with cover-fit logic
    const drawFrame = useCallback(
        (index: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            const img = images[Math.round(index)];

            if (!canvas || !ctx || !img) return;

            // Set canvas to full viewport size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Calculate cover-fit dimensions
            const imgRatio = img.width / img.height;
            const canvasRatio = canvas.width / canvas.height;

            let drawWidth: number;
            let drawHeight: number;
            let offsetX: number;
            let offsetY: number;

            if (canvasRatio > imgRatio) {
                // Canvas is wider than image - fit to width
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                // Canvas is taller than image - fit to height
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        },
        [images]
    );

    // Subscribe to frame index changes and draw
    useEffect(() => {
        if (images.length === 0) return;

        const unsubscribe = frameIndex.on("change", (latest) => {
            drawFrame(latest);
        });

        // Draw initial frame
        drawFrame(0);

        // Handle window resize
        const handleResize = () => {
            drawFrame(frameIndex.get());
        };
        window.addEventListener("resize", handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [images, frameIndex, drawFrame]);

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: "500vh" }}
        >
            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Loading Screen */}
                {isLoading && (
                    <motion.div
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#121212]"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="relative mb-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#ff6b35] to-[#4a9eff]"
                                style={{ width: `${loadProgress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                        <p className="text-sm text-white/50">Loading experience... {loadProgress}%</p>
                    </motion.div>
                )}

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="h-full w-full"
                    style={{
                        opacity: isLoading ? 0 : 1,
                        transition: "opacity 0.5s ease-out",
                    }}
                />

                {/* Subtle Vignette Overlay */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 40%, rgba(18, 18, 18, 0.4) 100%)",
                    }}
                />
            </div>
        </div>
    );
}
