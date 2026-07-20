"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { emailjsConfig, profile } from "@/data/content";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send } from "lucide-react";

emailjs.init({ publicKey: emailjsConfig.publicKey });

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, formRef.current);
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-amber-400 font-mono text-sm mb-2">// kontak</p>
            <h2 className="text-3xl font-bold">Hubungi Saya</h2>
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-8">
            {/* Info */}
            <div className="space-y-6">
              <p className="text-charcoal-400 leading-relaxed">
                Tertarik untuk berkolaborasi atau punya pertanyaan? Jangan ragu untuk menghubungi saya melalui form di samping atau kontak langsung di bawah ini.
              </p>
              <div className="space-y-4">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-charcoal-400 hover:text-amber-400 transition-colors">
                  <Mail size={18} /> {profile.email}
                </a>
                <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-charcoal-400 hover:text-amber-400 transition-colors">
                  <Phone size={18} /> {profile.phone}
                </a>
                <div className="flex items-center gap-3 text-charcoal-400">
                  <MapPin size={18} /> {profile.location}
                </div>
              </div>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                required
                className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-800 rounded-lg text-[16px] md:text-sm text-charcoal-50 placeholder-charcoal-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-800 rounded-lg text-[16px] md:text-sm text-charcoal-50 placeholder-charcoal-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <input
                type="text"
                name="title"
                placeholder="Subjek"
                className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-800 rounded-lg text-[16px] md:text-sm text-charcoal-50 placeholder-charcoal-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <textarea
                name="message"
                placeholder="Pesan Anda"
                rows={5}
                required
                className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-800 rounded-lg text-[16px] md:text-sm text-charcoal-50 placeholder-charcoal-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-6 py-3 bg-amber-400 text-charcoal-950 font-semibold rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Send size={16} />
                {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
              </button>
              {status === "success" && (
                <p className="text-sm text-green-400">Pesan berhasil terkirim! Terima kasih.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400">Gagal mengirim pesan. Coba lagi atau email langsung.</p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
