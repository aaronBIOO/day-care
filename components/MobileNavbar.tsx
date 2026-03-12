"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarDoodle, LeafShape, HandDrawnArrow, SlantedLinesDoodle } from "@/components/general/Doodles";

const navLinks = [
  { name: "home", href: "#home" },
  { name: "about", href: "#about" },
  { name: "programs", href: "#programs" },
  { name: "gallery", href: "#gallery" },
];

interface MobileNavbarProps {
  activeSection: string;
  setActiveSection: (name: string) => void;
  onEnrollClick: () => void;
}

export default function MobileNavbar({ activeSection, setActiveSection, onEnrollClick }: MobileNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (name: string) => {
    setActiveSection(name.charAt(0).toUpperCase() + name.slice(1));
    setIsOpen(false);
  };

  return (
    <>
      <nav className="md:hidden fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="w-full max-w-lg bg-white/22 backdrop-blur-sm px-6 py-4 
          flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.05)] rounded-full border border-white/20">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="font-playfair text-violet-800 flex flex-col items-start group">
            <span className="text-[11px] font-poppins uppercase tracking-widest text-violet-600/80 leading-none">Helena Street</span>
            <span className="text-lg -mt-none leading-none">Child Care, <span className="text-xs font-regular">LLC</span></span>
          </Link>


          {/* Menu Button */}
          <button
            onClick={toggleMenu}
            className="flex items-center gap-3 group outline-none cursor-pointer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 group-hover:border-violet-800/40 bg-white/10 group-active:scale-95">
              <div className="relative w-5 h-4 flex flex-col justify-between items-center">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-5 h-[2px] bg-black/70 rounded-full"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-[2px] bg-black/70 rounded-full"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-5 h-[2px] bg-black/70 rounded-full"
                />
              </div>
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 150,
              mass: 1
            }}
            className="fixed inset-0 z-40 bg-[#FDF5E6] flex flex-col items-center justify-center p-10 overflow-hidden"
          >
            {/* Background Doodles */}
            <LeafShape 
              color="#fbbf24" 
              className="absolute -top-10 -left-10 w-40 h-40 opacity-30 rotate-12" 
            />
            <StarDoodle 
              color="#f472b6" 
              className="absolute top-20 -right-10 w-32 h-32 opacity-20 -rotate-12" 
            />
            <HandDrawnArrow 
              color="#8b5cf6" 
              className="absolute bottom-10 -left-10 w-52 h-35 opacity-20 rotate-180" 
            />
            <SlantedLinesDoodle 
              color="#fb923c" 
              className="absolute bottom-20 -right-5 w-24 h-16 opacity-30 rotate-45" 
            />

            <div className="flex flex-col items-center space-y-10 relative z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className={`font-poppins text-4xl font-bold transition-all duration-300 relative group
                      ${activeSection.toLowerCase().includes(link.name)
                        ? "text-violet-800"
                        : "text-black/80 hover:text-black/50"
                      }`}
                    onClick={() => handleLinkClick(link.name)}
                  >
                    {link.name}
                    {activeSection.toLowerCase().includes(link.name) && (
                      <motion.div
                        layoutId="activeTabMobile"
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-violet-800 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Enroll Now Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="pt-6"
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onEnrollClick();
                  }}
                  className="px-10 py-5 border border-black/10 rounded-full text-black/80 
                  font-poppins font-medium transition-all text-md shadow-xs active:scale-95"
                >
                  Enroll Now
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
