import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import GithubStats from "@/components/GithubStats";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-20">
        <ParticleBackground />
      </div>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <GithubStats />
        <Certifications />
        <Projects />
        <Gallery />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
