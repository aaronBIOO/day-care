

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Content from "@/components/Content";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Content />
      <section id="contact" className="bg-[#FAF9F6] py-12 px-6 text-center border-t border-slate-100">
        <p className="text-slate-500 font-poppins">© 2026 DayCare. All rights reserved.</p>
      </section>
    </main>
  );
}
