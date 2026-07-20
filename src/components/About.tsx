"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { profile, softSkills, interests } from "@/data/content";
import { User, Lightbulb, Heart } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-amber-400 font-mono text-sm mb-2">// tentang</p>
            <h2 className="text-3xl font-bold">Tentang Saya</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-charcoal-900 border border-charcoal-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
                  <User size={20} className="text-amber-400" />
                </div>
                <h3 className="font-semibold text-lg">Profil</h3>
              </div>
              <p className="text-charcoal-400 leading-relaxed mb-3">
                Saya adalah seorang profesional TI yang bersemangat dengan fokus pada infrastruktur server dan pengembangan web. Saya senang membangun solusi yang tangguh dan efisien, mulai dari pengaturan server Linux dan deployment cloud AWS hingga pembuatan aplikasi web menggunakan PHP dan MySQL.
              </p>
              <p className="text-charcoal-400 leading-relaxed">
                Dedikasi saya adalah memastikan sistem berjalan dengan aman dan lancar, sekaligus memberikan pengalaman pengguna yang optimal melalui aplikasi yang saya kembangkan.
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.div variants={fadeUp} className="bg-charcoal-900 border border-charcoal-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
                    <Lightbulb size={20} className="text-amber-400" />
                  </div>
                  <h3 className="font-semibold">Soft Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <span key={skill} className="px-3 py-1 text-sm bg-charcoal-800 text-charcoal-200 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-charcoal-900 border border-charcoal-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
                    <Heart size={20} className="text-amber-400" />
                  </div>
                  <h3 className="font-semibold">Interests</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span key={interest} className="px-3 py-1 text-sm bg-charcoal-800 text-charcoal-200 rounded-md">
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
