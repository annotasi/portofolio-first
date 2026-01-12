import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-[#121212]">
      {/* Hero Section with Scroll Animation */}
      <section className="relative">
        <ScrollyCanvas />
        <Overlay />
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#121212] px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h3 className="mb-2 text-2xl font-bold text-white">
                Let&apos;s Work Together
              </h3>
              <p className="text-white/60">
                Have a project in mind? Let&apos;s create something amazing.
              </p>
            </div>
            <a
              href="mailto:hello@singgihpratama.com"
              className="group inline-flex items-center gap-2 rounded-full border border-[#ff6b35] bg-[#ff6b35]/10 px-6 py-3 text-[#ff6b35] transition-all duration-300 hover:bg-[#ff6b35] hover:text-white"
            >
              <span>Get in Touch</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Singgih Pratama. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-white/40 transition-colors hover:text-white"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-sm text-white/40 transition-colors hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-sm text-white/40 transition-colors hover:text-white"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
