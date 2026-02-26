"use client";

import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Programs", href: "#programs" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6">
      <div className="w-full max-w-3xl bg-white/40 backdrop-blur-sm px-8 py-5 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.05)] rounded-full">
        {/* Logo */}
        <div className="">
          <Link href="/" className="font-playfair text-3xl text-violet-800 leading-none">
            DayCare
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-regular text-slate-700 hover:text-slate-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Get In Touch */}
        <div className="">
          <Link
            href="#contact"
            className="text-base font-medium text-slate-600 border-b-3 border-violet-800 pb-1 hover:opacity-70 transition-opacity"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </nav>
  );
}
