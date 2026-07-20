"use client";
import { motion } from "framer-motion";
import { profile, stats } from "@/data/content";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Hero() {
  const [displayName, setDisplayName] = useState("");
  const fullName = profile.name;

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    function typeWriter() {
      if (!isDeleting && i <= fullName.length) {
        setDisplayName(fullName.slice(0, i));
        i++;
        timeoutId = setTimeout(typeWriter, 100);
      } else if (isDeleting && i >= 0) {
        setDisplayName(fullName.slice(0, i));
        i--;
        timeoutId = setTimeout(typeWriter, 50);
      }

      if (i === fullName.length + 1) {
        isDeleting = true;
        i = fullName.length;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(typeWriter, 3000); // Pause at full name
      } else if (i === -1) {
        isDeleting = false;
        i = 0;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(typeWriter, 1000); // Pause before re-typing
      }
    }

    timeoutId = setTimeout(typeWriter, 100);
    return () => clearTimeout(timeoutId);
  }, [fullName]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16">
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-5 gap-12 items-center"
        >
          {/* Left: text content (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <motion.p variants={fadeUp} className="text-amber-400 font-mono text-sm">
              Halo, saya
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal-50">
              {displayName}
              <span className="inline-block w-[3px] h-10 md:h-12 bg-amber-400 ml-1 animate-pulse align-middle" />
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-charcoal-400">
              {profile.role}
            </motion.p>
            <motion.p variants={fadeUp} className="text-charcoal-400 max-w-lg leading-relaxed text-sm md:text-base">
              {profile.description}
            </motion.p>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 md:gap-8 py-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl md:text-2xl font-bold text-amber-400">{stat.value}</p>
                  <p className="text-xs text-charcoal-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href="#projects"
                className="w-full sm:w-auto text-center px-6 py-3 bg-amber-400 text-charcoal-950 font-semibold rounded-lg hover:bg-amber-500 transition-colors"
              >
                Lihat Proyek
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto text-center px-6 py-3 border border-charcoal-600 text-charcoal-200 rounded-lg hover:border-amber-400 hover:text-amber-400 transition-colors"
              >
                Hubungi Saya
              </a>
              <a
                href="/cv-muhammad-rifki.pdf"
                download
                className="w-full sm:w-auto justify-center px-6 py-3 border border-charcoal-600 text-charcoal-200 rounded-lg hover:border-amber-400 hover:text-amber-400 transition-colors flex items-center gap-2"
              >
                <Download size={16} /> Download CV
              </a>
            </motion.div>

            {/* Social */}
            <motion.div variants={fadeUp} className="flex gap-4 pt-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-charcoal-400 hover:text-amber-400 transition-colors"><FaGithub size={20} /></a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-charcoal-400 hover:text-amber-400 transition-colors"><FaLinkedin size={20} /></a>
              <a href={`mailto:${profile.email}`} className="text-charcoal-400 hover:text-amber-400 transition-colors"><Mail size={20} /></a>
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="text-charcoal-400 hover:text-amber-400 transition-colors"><Phone size={20} /></a>
            </motion.div>
          </div>

          {/* Right: terminal status card (2 cols) */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-xl p-5 font-mono text-sm shadow-xl">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-charcoal-800">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-charcoal-400 text-xs">terminal</span>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p><span className="text-amber-400">$</span> <span className="text-charcoal-200">whoami</span></p>
                  <p className="text-charcoal-400 pl-4">Muhammad Rifki</p>
                </div>
                <div>
                  <p><span className="text-amber-400">$</span> <span className="text-charcoal-200">cat role.txt</span></p>
                  <p className="text-charcoal-400 pl-4">Junior SysAdmin & Web Dev</p>
                </div>
                <div>
                  <p><span className="text-amber-400">$</span> <span className="text-charcoal-200">cat stack.txt</span></p>
                  <p className="text-charcoal-400 pl-4">Linux · AWS · PHP · MySQL</p>
                </div>
                <div>
                  <p><span className="text-amber-400">$</span> <span className="text-charcoal-200">uptime</span></p>
                  <p className="text-charcoal-400 pl-4">3+ years in IT</p>
                </div>
                <div>
                  <p><span className="text-amber-400">$</span> <span className="text-charcoal-200">cat location.txt</span></p>
                  <p className="text-charcoal-400 pl-4 flex items-center gap-1.5 mt-1"><MapPin size={14} /> Tangerang, Indonesia</p>
                </div>
                <p className="text-amber-400 pt-2">$ <span className="animate-pulse">_</span></p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
