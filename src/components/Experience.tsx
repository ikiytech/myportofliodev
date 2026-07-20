"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { experience } from "@/data/content";
import { Briefcase, GraduationCap, Users } from "lucide-react";

const typeIcon = {
  work: Briefcase,
  education: GraduationCap,
  org: Users,
};

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-amber-400 font-mono text-sm mb-2">// pengalaman</p>
            <h2 className="text-3xl font-bold">Pengalaman & Pendidikan</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-charcoal-800" />

            <div className="space-y-8">
              {experience.map((item, i) => {
                const Icon = typeIcon[item.type];
                return (
                  <motion.div key={i} variants={fadeUp} className="relative pl-12 sm:pl-14">
                    {/* Dot */}
                    <div className="absolute left-[11px] top-1 w-[18px] h-[18px] rounded-full bg-charcoal-950 border-[3px] border-amber-400" />
                    
                    <div className="bg-charcoal-900 border border-charcoal-800 rounded-xl p-4 sm:p-5">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Icon size={16} className="text-amber-400" />
                          <h3 className="font-semibold">{item.title}</h3>
                        </div>
                        <span className="text-xs text-charcoal-400 font-mono">{item.date}</span>
                      </div>
                      <p className="text-sm text-charcoal-400 mb-3">{item.org}</p>
                      {item.meta && (
                        <p className="text-xs text-amber-400 mb-3 font-mono">{item.meta}</p>
                      )}
                      <ul className="space-y-1">
                        {item.points.map((point, j) => (
                          <li key={j} className="text-sm text-charcoal-400 flex items-start gap-2">
                            <span className="text-charcoal-600 mt-1.5">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
