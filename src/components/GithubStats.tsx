"use client";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";
import { githubUsername } from "@/data/content";

export default function GithubStats() {
  return (
    <section className="pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <p className="text-amber-400 font-mono text-sm mb-4">// github activity</p>
          <div className="grid md:grid-cols-2 gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://github-readme-stats-eight-theta.vercel.app/api?username=${githubUsername}&show_icons=true&theme=dark&hide_border=true&bg_color=1c1c1a&title_color=f2a900&text_color=e8e8e4&icon_color=f2a900`}
              alt={`GitHub stats ${githubUsername}`}
              loading="lazy"
              className="max-w-full h-auto rounded-lg mx-auto"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=dark&hide_border=true&background=1c1c1a&ring=f2a900&fire=f2a900&currStreakLabel=e8e8e4`}
              alt={`GitHub streak ${githubUsername}`}
              loading="lazy"
              className="max-w-full h-auto rounded-lg mx-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
