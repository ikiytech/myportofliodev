"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { certifications } from "@/data/content";
import { Award } from "lucide-react";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-amber-400 font-mono text-sm mb-2">// sertifikat</p>
            <h2 className="text-3xl font-bold">Sertifikasi</h2>
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="bg-charcoal-900 border border-charcoal-800 rounded-xl p-5 flex gap-4 hover:border-charcoal-600 transition-colors"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-amber-400/10 flex items-center justify-center">
                  <Award size={20} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-charcoal-50">{cert.title}</h3>
                  <p className="text-xs text-charcoal-400 mt-1">{cert.subtitle}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-charcoal-400 font-mono">No. {cert.no}</span>
                    <span className="text-xs text-charcoal-600">•</span>
                    <span className="text-xs text-charcoal-400">{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
