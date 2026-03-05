"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactModal from "./main/ContactModal";

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
      <div className="w-full max-w-3xl bg-white/40 backdrop-blur-sm px-8 py-5 
        flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.05)] rounded-full">
        {/* Logo */}
        <div className="">
          <Link href="/" className="font-playfair text-3xl text-violet-800 leading-none">
            DayCare
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-poppins">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-base font-regular transition-colors duration-300 
                ${activeSection === link.name ? "text-violet-800" : "text-slate-700 hover:text-slate-900"
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
            className="text-base font-medium text-black/70 pb-1 hover:opacity-70 
            transition-opacity font-poppins cursor-pointer"
            onClick={() => setIsContactOpen(true)}
          >
            Get In Touch
          </button>
        </div>
      </div>

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

