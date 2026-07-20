"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { skills } from "@/data/content";
import { Terminal, Cloud, Server, Network, Code, Database, FileCode, Layout, SquareTerminal } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Terminal, Cloud, Server, Network, Code, Database, FileCode, Layout, SquareTerminal,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-amber-400 font-mono text-sm mb-2">// keahlian</p>
            <h2 className="text-3xl font-bold">Tech Stack</h2>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill) => {
              const Icon = iconMap[skill.icon] || Terminal;
              return (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.02, borderColor: "#f2a900" }}
                  className="bg-charcoal-900 border border-charcoal-800 rounded-xl p-5 flex flex-col items-center gap-3 text-center transition-colors cursor-default"
                >
                  <Icon size={28} className="text-charcoal-200" />
                  <span className="text-sm text-charcoal-200">{skill.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
