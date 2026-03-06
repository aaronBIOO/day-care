"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Programs", href: "#programs" },
  { name: "Gallery", href: "#gallery" },
];

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="hidden md:block bg-[#FDF5E6] py-20 border-t border-amber-900/10">
      <motion.div
        className="container mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/favicon.ico"
                  alt="DayCare Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <Link href="/" className="font-playfair text-2xl text-violet-800 leading-none">
                DayCare
              </Link>
            </div>
            <p className="text-black/60 font-poppins text-sm leading-relaxed max-w-xs">
              Nurturing tomorrow&apos;s leaders in a safe, joyful environment where every child feels seen, 
              loved, and encouraged.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 bg-white rounded-full shadow-sm text-amber-800 hover:bg-[#f8bbd0] 
                  hover:text-black/80 transition-all active:scale-95"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Links */}
          <motion.div variants={itemVariants} className="space-y-6 ml-4">
            <h4 className="font-poppins font-bold text-amber-900 uppercase tracking-widest text-xs">
              Quick Links
            </h4>
            <ul className="space-y-4 font-poppins text-sm text-black/70">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-800 hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact */}
          <motion.div variants={itemVariants} className="space-y-6 mr-8">
            <h4 className="font-poppins font-bold text-amber-900 uppercase tracking-widest text-xs">
              Contact Us
            </h4>
            <ul className="space-y-4 font-poppins text-sm text-black/70">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-800 mt-0.5 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-800 mt-0.5 shrink-0" />
                <span>hello@daycare.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-800 mt-0.5 shrink-0" />
                <span>123 Sunshine Lane, Kidsville</span>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: CTA */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="font-poppins font-bold text-amber-900 uppercase tracking-widest text-xs">
              Our Community
            </h4>
            <p className="text-black/60 font-poppins text-sm leading-relaxed">
              Stay updated with our latest activities and parenting tips.
            </p>
            <div className="flex flex-col gap-3">
              <button className="px-6 py-3 bg-[#f8bbd0] text-black/80 rounded-full font-poppins text-sm 
                font-medium shadow-sm hover:bg-[#f48fb1] transition-colors active:scale-[0.98]">
                Join Our Newsletter
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-amber-900/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black/40 font-poppins text-xs">
            © 2026 DayCare. All rights reserved.
          </p>
          <div className="flex gap-6 text-black/40 font-poppins text-xs">
            <a href="#" className="hover:text-amber-800 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-800 transition-colors">Terms of Service</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
