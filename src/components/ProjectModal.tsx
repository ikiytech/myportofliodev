"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { scaleIn } from "@/lib/motion-variants";

interface Project {
  id: string;
  title: string;
  tags: string[];
  caseStudy: { problem: string; action: string; result: string };
  links?: { label: string; url: string }[];
}

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/70 flex items-end md:items-center justify-center p-0 md:p-4"
        >
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            className="bg-charcoal-900 border-t md:border border-charcoal-800 rounded-t-2xl md:rounded-xl max-w-lg w-full p-6 pt-12 md:pt-6 relative max-h-[90vh] md:max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 md:top-4 md:right-4 w-11 h-11 flex items-center justify-center text-charcoal-400 hover:text-charcoal-50 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-6">{project.title}</h3>

            <div className="space-y-5">
              <div>
                <h4 className="text-amber-400 font-semibold text-sm mb-2 font-mono">Problem</h4>
                <p className="text-charcoal-400 text-sm leading-relaxed">{project.caseStudy.problem}</p>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold text-sm mb-2 font-mono">Action</h4>
                <p className="text-charcoal-400 text-sm leading-relaxed">{project.caseStudy.action}</p>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold text-sm mb-2 font-mono">Result</h4>
                <p className="text-charcoal-400 text-sm leading-relaxed">{project.caseStudy.result}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs bg-charcoal-800 text-charcoal-200 rounded-md">
                  {tag}
                </span>
              ))}
            </div>

            {project.links && project.links.length > 0 && (
              <div className="mt-6 pt-6 border-t border-charcoal-800">
                <h4 className="text-sm font-semibold text-charcoal-200 mb-3">Project Links</h4>
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm px-4 py-2 bg-charcoal-800 hover:bg-charcoal-700 text-amber-400 hover:text-amber-300 rounded-lg transition-colors flex items-center gap-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
