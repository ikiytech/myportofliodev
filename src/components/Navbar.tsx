"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/content";

const navItems = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Pengalaman", href: "#experience" },
  { label: "Keahlian", href: "#skills" },
  { label: "Sertifikat", href: "#certifications" },
  { label: "Proyek", href: "#projects" },
  { label: "Galeri", href: "#gallery" },
  { label: "Blog", href: "#blog" },
  { label: "Kontak", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("#home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);

      const sections = navItems.map((item) => document.querySelector(item.href));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= 120) {
          setActive(navItems[i].href);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-40">
        {/* Scroll progress bar */}
        <div
          className="h-[2px] bg-amber-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
        <nav className="bg-charcoal-950/80 backdrop-blur-sm border-b border-charcoal-800 relative z-40">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
            <a href="#home" className="text-xl font-bold text-amber-400">Rifki.</a>
            
            {/* Desktop nav */}
            <ul className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    onClick={() => setActive(item.href)}
                    className={`px-3 py-2 text-sm transition-colors ${
                      active === item.href ? "text-charcoal-50" : "text-charcoal-400 hover:text-charcoal-200"
                    }`}
                  >
                    {item.label}
                    {active === item.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-amber-400 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-charcoal-400 hover:text-charcoal-50 w-11 h-11 flex items-center justify-center -mr-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t border-charcoal-800 bg-charcoal-950/95 backdrop-blur-sm overflow-hidden"
              >
                <ul className="px-6 py-4 space-y-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`block py-3 text-base ${
                          active === item.href ? "text-amber-400 font-medium" : "text-charcoal-400"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-charcoal-950/80 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
