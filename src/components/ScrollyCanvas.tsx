"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";

// Total number of frames in the sequence
const FRAME_COUNT = 75;

// Generate frame file names based on the actual naming pattern
const getFramePath = (index: number): string => {
    const paddedIndex = String(index).padStart(2, "0");
    // 0.066s at indices 1, 4, 7, 10, 13... (i.e., index % 3 === 1)
    const delay = index % 3 === 1 ? "0.066s" : "0.067s";
    return `/sequence/frame_${paddedIndex}_delay-${delay}.webp`;
};

interface ScrollyCanvasProps {
    onLoadProgress?: (progress: number) => void;
    onLoadComplete?: () => void;
}

export default function ScrollyCanvas({ onLoadProgress, onLoadComplete }: ScrollyCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Cache for canvas dimensions to avoid recalculation
    const dimensionsRef = useRef({ width: 0, height: 0 });
    // Throttle resize with requestAnimationFrame
    const resizeRafRef = useRef<number | null>(null);

    // Track scroll progress within the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress (0-1) to frame index (0-74)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload all images
    useEffect(() => {
        const abortController = new AbortController();
        let loaded = 0;

        const loadImages = async () => {
            const imagePromises: Promise<HTMLImageElement>[] = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        loaded++;
                        const progress = Math.round((loaded / FRAME_COUNT) * 100);
                        onLoadProgress?.(progress);
                        resolve(img);
                    };
                    img.onerror = () => reject(new Error(`Failed to load frame ${i}`));
                    img.src = getFramePath(i);
                });
                imagePromises.push(promise);
            }

            try {
                const loadedImages = await Promise.all(imagePromises);
                if (!abortController.signal.aborted) {
                    setImages(loadedImages);
                    setIsLoaded(true);
                    onLoadComplete?.();
                }
            } catch (error) {
                console.error("Failed to load images:", error);
            }
        };

        loadImages();

        return () => {
            abortController.abort();
        };
    }, [onLoadProgress, onLoadComplete]);

    // Draw image on canvas with cover-fit logic
    const drawFrame = useCallback(
        (index: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            const img = images[Math.round(index)];

            if (!canvas || !ctx || !img) return;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Only resize canvas if dimensions changed (performance optimization)
            if (
                dimensionsRef.current.width !== windowWidth ||
                dimensionsRef.current.height !== windowHeight
            ) {
                canvas.width = windowWidth;
                canvas.height = windowHeight;
                dimensionsRef.current = { width: windowWidth, height: windowHeight };
            }

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

        // Handle window resize with throttling
        const handleResize = () => {
            // Cancel any pending RAF
            if (resizeRafRef.current) {
                cancelAnimationFrame(resizeRafRef.current);
            }
            // Schedule new RAF
            resizeRafRef.current = requestAnimationFrame(() => {
                drawFrame(frameIndex.get());
            });
        };

        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
            if (resizeRafRef.current) {
                cancelAnimationFrame(resizeRafRef.current);
            }
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
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="h-full w-full"
                    style={{
                        opacity: isLoaded ? 1 : 0,
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
