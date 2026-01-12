"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoLink = `mailto:annotasi.id@gmail.com?subject=Portfolio Contact from ${formState.name}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${formState.email}`;
        window.location.href = mailtoLink;
    };

    const inputClasses = (field: string) => `
        w-full rounded-xl border bg-white/[0.02] px-5 py-4 text-white placeholder-white/30
        outline-none transition-all duration-300
        ${focusedField === field
            ? "border-[#ff6b35]/50 bg-white/[0.05] shadow-[0_0_20px_rgba(255,107,53,0.1)]"
            : "border-white/10 hover:border-white/20"
        }
    `;

    const socialLinks = [
        {
            name: "GitHub (Primary)",
            href: "https://github.com/annotasi",
            label: "@annotasi",
            description: "Current projects & clean architecture",
            icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
            color: "#10b981",
        },
        {
            name: "GitHub (Archive)",
            href: "https://github.com/mastama",
            label: "@mastama",
            description: "Previous work & coding journey",
            icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
            color: "#6b7280",
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com/in/singgihpratama",
            label: "LinkedIn",
            description: "Professional network",
            icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
            color: "#0077b5",
        },
    ];

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative overflow-hidden bg-[#121212] px-6 py-24 md:px-12 lg:px-24"
        >
            {/* Background Elements */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute -left-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#ff6b35]/5 blur-3xl" />
                <div className="absolute -right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[#10b981]/5 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                    {/* Left Column - Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#4a9eff]">
                            Get in Touch
                        </p>
                        <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                            Let&apos;s Build{" "}
                            <span className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] bg-clip-text text-transparent">
                                Something
                            </span>{" "}
                            Great
                        </h2>
                        <p className="mb-10 text-lg text-white/60 md:text-xl">
                            Have a project in mind? Looking for a backend specialist?
                            Let&apos;s discuss how we can work together.
                        </p>

                        {/* Quick Contact */}
                        <div className="mb-8 space-y-4">
                            <a
                                href="mailto:annotasi.id@gmail.com"
                                className="group flex items-center gap-4 text-white/70 transition-colors hover:text-white"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#ff6b35]/30 group-hover:bg-[#ff6b35]/10">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span>annotasi.id@gmail.com</span>
                            </a>
                        </div>

                        {/* GitHub Profiles */}
                        <div className="space-y-3">
                            <p className="text-sm font-medium uppercase tracking-wider text-white/40">
                                Developer Profiles
                            </p>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                                >
                                    <div
                                        className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300"
                                        style={{ backgroundColor: `${social.color}15` }}
                                    >
                                        <svg
                                            className="h-5 w-5 transition-colors"
                                            fill={social.color}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d={social.icon} />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-white">{social.label}</span>
                                            {social.name.includes("Primary") && (
                                                <span className="rounded-full bg-[#10b981]/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-[#10b981]">
                                                    Primary
                                                </span>
                                            )}
                                            {social.name.includes("Archive") && (
                                                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-white/50">
                                                    Archive
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-white/40">{social.description}</span>
                                    </div>
                                    <svg className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/60">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    onFocus={() => setFocusedField("name")}
                                    onBlur={() => setFocusedField(null)}
                                    className={inputClasses("name")}
                                    placeholder="Your name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/60">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    onFocus={() => setFocusedField("email")}
                                    onBlur={() => setFocusedField(null)}
                                    className={inputClasses("email")}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/60">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    onFocus={() => setFocusedField("message")}
                                    onBlur={() => setFocusedField(null)}
                                    className={`${inputClasses("message")} resize-none`}
                                    placeholder="Tell me about your project..."
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#ff6b35]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ff6b35]/30"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Send Message
                                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ff8f5a] to-[#ff6b35] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div>
                        <p className="text-sm text-white/40">
                            © {new Date().getFullYear()} Singgih Pratama. Built with passion.
                        </p>
                        <p className="text-xs text-white/25">
                            Backend Developer • PT Pegadaian (Persero)
                        </p>
                    </div>
                    <p className="text-sm text-white/30">
                        Next.js • Framer Motion • TypeScript
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
