"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

const BOOT_LINES = [
  { text: "Booting portfolio-server v2.0...", delay: 0 },
  { text: "[  OK  ] Mounting /experience", delay: 250 },
  { text: "[  OK  ] Loading skills.json", delay: 450 },
  { text: "[  OK  ] Starting sysadmin.service", delay: 650 },
  { text: "[  OK  ] Network interfaces up", delay: 850 },
  { text: "Welcome, Muhammad Rifki", delay: 1150 },
];

const TOTAL_DURATION = 1600;

export default function BootLoader() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    const doneTimer = setTimeout(() => setIsDone(true), TOTAL_DURATION);

    document.body.style.overflow = "hidden";
    const enableScroll = setTimeout(() => {
      document.body.style.overflow = "";
    }, TOTAL_DURATION + 500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
      clearTimeout(enableScroll);
      document.body.style.overflow = "";
    };
  }, []);

  const prefersReducedMotion = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return null; 
  }

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-charcoal-950 flex items-center justify-center px-6"
        >
          <div className="absolute inset-0 -z-10 opacity-20">
            <ParticleBackground />
          </div>
          <div className="w-full max-w-2xl">
            <div className="border border-charcoal-800 rounded-lg overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-charcoal-900 border-b border-charcoal-800">
                <div className="w-2.5 h-2.5 rounded-full bg-charcoal-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-charcoal-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-charcoal-600" />
                <span className="text-xs text-charcoal-400 font-mono ml-2">boot.sh</span>
              </div>
              <div className="p-6 font-mono text-base md:text-lg space-y-2 bg-charcoal-950">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  line.text.startsWith("Welcome")
                    ? "text-amber-400 font-medium pt-2"
                    : line.text.includes("[  OK  ]")
                    ? "text-charcoal-400"
                    : "text-charcoal-200"
                }
              >
                {line.text.includes("[  OK  ]") ? (
                  <>
                    <span className="text-amber-400">[  OK  ]</span>
                    {line.text.replace("[  OK  ]", "")}
                  </>
                ) : (
                  line.text
                )}
              </motion.p>
                ))}
                {visibleLines < BOOT_LINES.length && (
                  <span className="inline-block w-2.5 h-5 bg-amber-400 animate-pulse ml-1 align-middle" />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
