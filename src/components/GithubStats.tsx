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
          <p className="text-amber-400 font-mono text-sm mb-4">
            // github activity
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=dark&bg_color=1c1c1a&hide_border=true&title_color=f2a900&icon_color=f2a900&text_color=e8e8e4`}
              alt={`GitHub stats ${githubUsername}`}
              loading="lazy"
              className="w-full max-w-[450px] h-auto rounded-lg"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=dark&hide_border=true&background=1c1c1a&ring=f2a900&fire=f2a900&currStreakLabel=e8e8e4`}
              alt={`GitHub streak ${githubUsername}`}
              loading="lazy"
              className="w-full max-w-[450px] h-auto rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}