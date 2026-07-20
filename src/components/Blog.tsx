"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { blogPosts } from "@/data/content";
import { ArrowRight, FileText } from "lucide-react";
import BlogModal from "./BlogModal";

export default function Blog() {
  const [activePost, setActivePost] = useState<typeof blogPosts[0] | null>(null);
  return (
    <section id="blog" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-amber-400 font-mono text-sm mb-2">// catatan teknis</p>
            <h2 className="text-3xl font-bold">Tulisan Teknis</h2>
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                onClick={() => setActivePost(post)}
                className="bg-charcoal-900 border border-charcoal-800 rounded-xl p-6 hover:border-charcoal-600 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <FileText size={18} className="text-amber-400" />
                  <h3 className="font-semibold">{post.title}</h3>
                </div>
                <p className="text-sm text-charcoal-400 leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-sm text-amber-400 flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Baca selengkapnya <ArrowRight size={14} />
                </span>
              </article>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <BlogModal post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
}
