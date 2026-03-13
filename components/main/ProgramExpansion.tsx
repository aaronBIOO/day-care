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
  setExpandedIndex: (index: number | null) => void;
}

export default function ProgramExpansion({ programs, expandedIndex, onClose, setExpandedIndex }: ProgramExpansionProps) {
  return (
    <AnimatePresence>
      {expandedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-110 flex items-center justify-center p-0 md:p-10 bg-white/30 backdrop-blur-xl"
        >
          {/* Back Button (Mobile Only) */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-6 left-2 p-3 bg-black/20 hover:bg-black/70 
            rounded-full transition-colors z-120 flex items-center shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          {/* Expanded Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white md:bg-white/95 md:backdrop-blur-3xl p-0 md:p-12 rounded-none md:rounded-[40px] 
            shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] w-full h-full md:h-auto md:max-w-3xl md:mx-4 z-10 flex flex-col 
            md:flex-row gap-0 md:gap-10 border-none md:border md:border-white/40 overflow-y-auto md:overflow-hidden"
          >
            {/* Close button (Desktop Only) */}
            <button
              onClick={onClose}
              className="hidden md:block absolute top-8 right-5 p-3 bg-black/5 hover:bg-black/10 rounded-full 
              transition-all hover:rotate-90 text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              layoutId={`program-image-${expandedIndex}`}
              className="relative w-full md:w-[45%] h-64 md:h-[300px]
              rounded-none md:rounded-[35px] overflow-hidden shadow-none md:shadow-lg border-none md:border-4 md:border-white shrink-0"
            >
              <Image
                src={programs[expandedIndex].image}
                alt={programs[expandedIndex].title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Content side */}
            <div className="w-full md:w-[60%] flex flex-col justify-center p-8 md:p-0">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-amber-800 font-poppins font-semibold 
                tracking-widest text-xs uppercase mb-3"
              >
                {programs[expandedIndex].badge || "Curated Program"}
              </motion.p>
              <motion.h3
                layoutId={`program-title-${expandedIndex}`}
                className="text-2xl md:text-3xl font-poppins font-medium 
                text-black/80 mb-6 leading-tight"
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
              </motion.p>
              
              {/* Navigation Buttons */}
              <div className="mt-12 md:mb-0 md:mt-5 flex gap-4 w-full">
                {expandedIndex > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setExpandedIndex(expandedIndex - 1); }}
                    className="flex-1 py-4 bg-slate-100 text-black/60 rounded-full 
                    text-base hover:bg-slate-200 transition-all flex items-center font-poppins
                    justify-center gap-2 active:scale-[0.98] outline-none border-none cursor-pointer"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (expandedIndex < programs.length - 1) {
                      setExpandedIndex(expandedIndex + 1);
                    } else {
                      onClose();
                    }
                  }}
                  className="flex-2 py-4 bg-[#f8bbd0] text-black/80 rounded-full 
                  text-base hover:bg-[#f48fb1] transition-all flex items-center font-poppins cursor-pointer
                  justify-center gap-2 active:scale-[0.98] shadow-lg font-medium outline-none border-none w-full"
                >
                  {expandedIndex === programs.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
