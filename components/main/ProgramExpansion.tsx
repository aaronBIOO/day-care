"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";

export interface Program {
  title: string;
  description: string;
  image: string;

  badge?: string;
}

interface ProgramExpansionProps {
  programs: Program[];
  expandedIndex: number | null;
  onClose: () => void;
}

export default function ProgramExpansion({ programs, expandedIndex, onClose }: ProgramExpansionProps) {
  return (
    <AnimatePresence>
      {expandedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center py-5 md:py-10"
        >
          {/* Expanded Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative bg-white/95 backdrop-blur-3xl p-6 md:p-12 rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] w-full max-w-3xl mx-4 z-10 flex flex-col md:flex-row gap-4 md:gap-10 border border-white/40"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-5 p-3 bg-black/5 hover:bg-black/10 rounded-full transition-all hover:rotate-90 text-slate-500 hover:text-slate-800"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image side */}
            <motion.div
              layoutId={`program-image-${expandedIndex}`}
              className="relative w-full md:w-[45%] aspect-video md:aspect-auto md:h-[300px] rounded-[35px] overflow-hidden shadow-lg border-4 border-white"
            >
              <Image
                src={programs[expandedIndex].image}
                alt={programs[expandedIndex].title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Content side */}
            <div className="w-full md:w-[60%] flex flex-col justify-center">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-amber-800 font-poppins font-semibold tracking-widest text-xs uppercase mb-3"
              >
                {programs[expandedIndex].badge || "Curated Program"}
              </motion.p>
              <motion.h3
                layoutId={`program-title-${expandedIndex}`}
                className="text-2xl md:text-3xl font-poppins font-medium text-black/80 mb-6 leading-tight"
              >
                {programs[expandedIndex].title}
              </motion.h3>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-24 h-1.5 bg-amber-800/30 rounded-full mb-8 origin-left"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-black/80 font-poppins md:text-md leading-relaxed mb-10"
              >
                {programs[expandedIndex].description}
                {" Our program provides a comprehensive foundation for growth, fostering creativity, social interaction, and early learning in a safe environment tailored to your child's specific developmental needs."}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
