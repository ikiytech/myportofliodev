import { profile } from "@/data/content";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-charcoal-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-charcoal-400">
          &copy; {new Date().getFullYear()} Muhammad Rifki. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-charcoal-400 hover:text-amber-400 transition-colors"><FaGithub size={18} /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-charcoal-400 hover:text-amber-400 transition-colors"><FaLinkedin size={18} /></a>
          <a href={`mailto:${profile.email}`} className="text-charcoal-400 hover:text-amber-400 transition-colors"><Mail size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
