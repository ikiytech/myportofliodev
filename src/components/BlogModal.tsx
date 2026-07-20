"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { scaleIn } from "@/lib/motion-variants";
import ReactMarkdown from "react-markdown";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
}

export default function BlogModal({ post, onClose }: { post: BlogPost | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {post && (
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
            className="bg-charcoal-900 border-t md:border border-charcoal-800 rounded-t-2xl md:rounded-xl max-w-2xl w-full p-6 pt-12 md:pt-8 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 md:top-4 md:right-4 w-11 h-11 flex items-center justify-center text-charcoal-400 hover:text-charcoal-50 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold mb-6 text-charcoal-50 leading-snug pr-8">{post.title}</h3>

            <div className="prose prose-invert prose-amber max-w-none prose-pre:bg-charcoal-950 prose-pre:border prose-pre:border-charcoal-800 prose-a:text-amber-400 prose-headings:text-charcoal-100 prose-p:text-charcoal-300 prose-p:leading-relaxed prose-code:text-amber-200">
              <ReactMarkdown>{post.content || post.excerpt}</ReactMarkdown>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
