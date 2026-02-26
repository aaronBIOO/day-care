"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CurlyDoodle } from "./Doodles";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut" as any,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any },
    },
  };

  return (
    <section id="about" className="bg-[#FDF5E6] py-24 min-h-[700px] flex items-center overflow-hidden">
      <motion.div
        className="container mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left Side: Image and Doodle */}
          <motion.div variants={itemVariants} className="relative w-full lg:w-1/3">
            <div className="relative aspect-3/4 w-full max-w-[300px] mx-auto rounded-sm overflow-hidden shadow-sm">
              <Image
                src="/images/kids-happy.jpg"
                alt="Happy kids"
                fill
                className="object-cover"
              />
            </div>
            {/* Curly Doodle at the bottom right of the image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <CurlyDoodle
                className="absolute -bottom-12 -right-12 w-48 h-48 text-slate-900"
                color="#92400E"
              />
            </motion.div>
          </motion.div>

          {/* Right Side: Text and Buttons */}
          <div className="w-full lg:w-2/3 space-y-10">
            <div className="space-y-4">
              <motion.p
                variants={itemVariants}
                className="text-md font-semibold text-amber-800 uppercase font-poppins tracking-widest"
              >
                Who we are
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-poppins text-black/70 max-w-xl"
              >
                We&apos;re a daycare on a mission to empower parents to raise a happy, healthy and conscious generation.
              </motion.h2>
            </div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Link
                href="#contact"
                className="px-6 py-3 bg-[#f8bbd0] text-black/80 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.09)] font-regular hover:bg-[#f48fb1] transition-colors"
              >
                Get In Touch
              </Link>
              <Link
                href="#nurseries"
                className="px-6 py-3 bg-white text-black/80 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.09)] font-regular hover:bg-slate-50 transition-colors"
              >
                Read More
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
