

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Content from "@/components/Content";
import Footer from "@/components/main/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Content />
      <Footer />

      {/* Mobile Navbar */}
      <div className="md:hidden inset-0 flex justify-center text-center px-6 mt-50">
        <p className="text-black/70 font-poppins text-md">
          Open the website on your laptop. Mobile view is not available yet, sorry. 
          A mobile-friendly version is coming soon.
        </p>
      </div>
    </main>
  );
}
