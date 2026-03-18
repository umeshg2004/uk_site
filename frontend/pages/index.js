import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Programs } from "@/components/Programs";
import { Coaches } from "@/components/Coaches";
import { Achievements } from "@/components/Achievements";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Coaches />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}