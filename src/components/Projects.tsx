"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { projects } from "@/data/content";
import ProjectModal from "./ProjectModal";
import { Cloud, ShoppingCart, QrCode, ExternalLink, Landmark, PenTool } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Cloud, ShoppingCart, QrCode, Landmark, PenTool
};

export default function Projects() {
  type Project = (typeof projects)[number];

const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-amber-400 font-mono text-sm mb-2">// proyek</p>
            <h2 className="text-3xl font-bold">Proyek Unggulan</h2>
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => {
              const Icon = iconMap[project.icon] || Cloud;
              return (
                <div
                  key={project.id}
                  className="bg-charcoal-900 border border-charcoal-800 rounded-xl overflow-hidden hover:border-charcoal-600 transition-colors group"
                >
                  {/* Icon or Image header area */}
                  <div className="h-40 bg-charcoal-800/30 flex items-center justify-center relative overflow-hidden">
                    {(project as any).image ? (
                      <Image
                        src={(project as any).image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <Icon size={48} className="text-charcoal-600 group-hover:text-amber-400/40 transition-colors" />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-2 py-0.5 bg-charcoal-800 text-charcoal-400 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-charcoal-400 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveProject(project)}
                        className="text-sm text-amber-400 hover:text-amber-500 flex items-center gap-1 transition-colors"
                      >
                        Case Study <ExternalLink size={13} />
                      </button>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-charcoal-400 hover:text-charcoal-200 flex items-center gap-1 transition-colors"
                          title="Repo Utama"
                        >
                          <FaGithub size={14} /> Code
                        </a>
                      )}
                      {(project as any).landingRepo && (
                        <a
                          href={(project as any).landingRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-charcoal-400 hover:text-charcoal-200 flex items-center gap-1 transition-colors"
                          title="Repo Landing Page"
                        >
                          <ExternalLink size={14} /> Landing
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
