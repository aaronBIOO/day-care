"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactModal from "./main/ContactModal";
import MobileNavbar from "./MobileNavbar";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Programs", href: "#programs" },
  { name: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const link = navLinks.find((l) => l.href === `#${sectionId}`);
          if (link) {
            setActiveSection(link.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach((link) => {
      const id = link.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6">
      <div className="hidden md:flex w-full max-w-3xl bg-white/40 backdrop-blur-sm px-8 py-5 
        items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.05)] rounded-full border border-white/20">
        {/* Logo */}
        <div className="">
          <Link href="/" className="font-playfair text-violet-800 flex flex-col items-start group">
            <span className="text-[11px] font-poppins uppercase tracking-widest text-violet-600/80 leading-none">Helena Street</span>
            <span className="text-lg -mt-none leading-none">DayCare</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-poppins">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-base font-regular transition-colors duration-300 
                ${activeSection === link.name ? "text-violet-800" : "text-black/70 hover:opacity-70"
                }`}
              onClick={() => setActiveSection(link.name)}
            >
              {link.name}
              {activeSection === link.name && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-800"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Get In Touch */}
        <div className="">
          <button
            className="text-base font-medium text-black/70 hover:opacity-70 text-center
            transition-opacity font-poppins cursor-pointer border rounded-full px-4 py-2 border-black/20"
            onClick={() => setIsContactOpen(true)}
          >
            Get In Touch
          </button>
        </div>
      </div>

      <MobileNavbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <AnimatePresence>
        {isContactOpen && (
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

