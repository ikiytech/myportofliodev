"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";
import { githubUsername } from "@/data/content";

const badges = {
  ai: [
    { name: "Python", color: "3776AB", logo: "python", logoColor: "white" },
    { name: "TensorFlow", color: "FF6F00", logo: "tensorflow", logoColor: "white" },
    { name: "PyTorch", color: "EE4C2C", logo: "pytorch", logoColor: "white" },
    { name: "scikit-learn", color: "F7931E", logo: "scikit-learn", logoColor: "white" },
    { name: "Pandas", color: "150458", logo: "pandas", logoColor: "white" },
    { name: "OpenCV", color: "5C3EE8", logo: "opencv", logoColor: "white" },
    { name: "MATLAB", color: "0076A8", logo: "mathworks", logoColor: "white" },
  ],
  frontend: [
    { name: "TypeScript", color: "3178C6", logo: "typescript", logoColor: "white" },
    { name: "JavaScript", color: "F7DF1E", logo: "javascript", logoColor: "black" },
    { name: "React", color: "20232A", logo: "react", logoColor: "61DAFB" },
    { name: "Next.js", color: "000000", logo: "next.js", logoColor: "white" },
    { name: "Tailwind CSS", color: "06B6D4", logo: "tailwindcss", logoColor: "white" },
    { name: "Figma", color: "F24E1E", logo: "figma", logoColor: "white" },
  ],
  backend: [
    { name: "Node.js", color: "339933", logo: "node.js", logoColor: "white" },
    { name: "Express", color: "000000", logo: "express", logoColor: "white" },
    { name: "Go", color: "00ADD8", logo: "go", logoColor: "white" },
    { name: "C++", color: "00599C", logo: "c%2B%2B", logoColor: "white" },
    { name: "Java", color: "ED8B00", logo: "openjdk", logoColor: "white" },
  ],
  cloud: [
    { name: "PostgreSQL", color: "4169E1", logo: "postgresql", logoColor: "white" },
    { name: "MySQL", color: "4479A1", logo: "mysql", logoColor: "white" },
    { name: "MongoDB", color: "4EA94B", logo: "mongodb", logoColor: "white" },
    { name: "Firebase", color: "FFCA28", logo: "firebase", logoColor: "black" },
    { name: "AWS", color: "232F3E", logo: "amazon-aws", logoColor: "white" },
    { name: "Azure", color: "0089D6", logo: "microsoft-azure", logoColor: "white" },
    { name: "Git", color: "F05032", logo: "git", logoColor: "white" },
  ]
};

const BadgeGroup = ({ title, items }: { title: string; items: any[] }) => (
  <div className="mb-6">
    <h3 className="text-gray-300 font-semibold mb-3 text-sm">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((b) => (
        <img 
          key={b.name} 
          src={`https://img.shields.io/badge/${b.name.replace(' ', '%20')}-${b.color}?style=flat&logo=${b.logo}&logoColor=${b.logoColor}`} 
          alt={b.name} 
          className="h-6 rounded-sm"
        />
      ))}
    </div>
  </div>
);

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
          <p className="text-amber-400 font-mono text-sm mb-6">
            // github activity & stack
          </p>

          <div className="flex flex-col gap-8">
            
            {/* 1. Contribution Graph */}
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&bg_color=1c1c1a&color=f2a900&line=f2a900&point=e8e8e4&area=true&hide_border=true`}
                alt={`GitHub Contribution Graph ${githubUsername}`}
                loading="lazy"
                className="w-full max-w-4xl h-auto rounded-xl shadow-lg border border-white/5"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full max-w-4xl mx-auto">
              {/* 2. Stack Badges */}
              <div className="bg-[#1c1c1a] p-6 rounded-xl shadow-lg border border-white/5 h-full">
                <h2 className="text-xl font-bold text-white mb-6">Stack</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <div>
                    <BadgeGroup title="AI / ML / Data" items={badges.ai} />
                    <BadgeGroup title="Frontend" items={badges.frontend} />
                  </div>
                  <div>
                    <BadgeGroup title="Backend / Systems" items={badges.backend} />
                    <BadgeGroup title="Data / Cloud / DevOps" items={badges.cloud} />
                  </div>
                </div>
              </div>

              {/* 3. Streak Stats */}
              <div className="flex justify-center h-full items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=dark&hide_border=true&background=1c1c1a&ring=f2a900&fire=f2a900&currStreakLabel=e8e8e4`}
                  alt={`GitHub streak ${githubUsername}`}
                  loading="lazy"
                  className="w-full h-auto rounded-xl shadow-lg border border-white/5"
                />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}