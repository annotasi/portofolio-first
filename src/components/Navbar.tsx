"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface NavLink {
    label: string;
    href: string;
}

const navLinks: NavLink[] = [
    { label: "Products", href: "#products" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav
            ref={navRef}
            className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${isScrolled
                ? "bg-[#121212]/80 backdrop-blur-xl shadow-lg shadow-black/10"
                : "bg-transparent"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
                {/* Logo */}
                <Link
                    href="/"
                    className="group relative flex items-center gap-2"
                >
                    <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-white/80">
                        SP
                    </span>
                    <motion.span
                        className="hidden text-xs font-medium uppercase tracking-[0.15em] text-white/40 md:inline"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Singgih Pratama
                    </motion.span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="group relative py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#8b5cf6] to-[#ff6b35] transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}

                    {/* CTA Button */}
                    <motion.a
                        href="mailto:annotasi.id@gmail.com"
                        className="relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-[#8b5cf6]/50 hover:bg-[#8b5cf6]/10"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="relative z-10">Let&apos;s Talk</span>
                    </motion.a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
                    aria-label="Toggle menu"
                >
                    <div className="flex flex-col gap-1.5">
                        <motion.span
                            className="block h-0.5 w-6 bg-white"
                            animate={{
                                rotate: isMobileMenuOpen ? 45 : 0,
                                y: isMobileMenuOpen ? 8 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.span
                            className="block h-0.5 w-6 bg-white"
                            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.span
                            className="block h-0.5 w-6 bg-white"
                            animate={{
                                rotate: isMobileMenuOpen ? -45 : 0,
                                y: isMobileMenuOpen ? -8 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#121212]/98 backdrop-blur-xl md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-3xl font-semibold text-white transition-colors hover:text-[#8b5cf6]"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="mailto:annotasi.id@gmail.com"
                                className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6] bg-[#8b5cf6]/10 px-8 py-3 text-[#8b5cf6] transition-all hover:bg-[#8b5cf6] hover:text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.3 }}
                            >
                                Let&apos;s Talk
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
