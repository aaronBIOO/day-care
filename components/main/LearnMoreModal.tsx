"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { aboutData as cards } from "../Data";

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LearnMoreModal({ isOpen, onClose }: LearnMoreModalProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Reset step when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep(0), 300);
    }
  }, [isOpen]);


  const nextStep = () => {
    if (step < cards.length - 1) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-110 flex items-center justify-center bg-white/40 
          backdrop-blur-xl p-0 md:p-6 overscroll-contain"
        >
          {/* Back to Site Button */}
          <button
            onClick={onClose}
            className="absolute top-6 left-4 md:top-4 md:left-8 p-3 md:px-4 bg-black/20 hover:bg-black/10 
              rounded-full transition-colors z-120 group flex items-center shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-white md:text-black group-hover:text-black transition-colors" />
            <span className="hidden md:inline text-black/80 font-poppins text-sm font-medium ml-2">
              Back
            </span>
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="relative w-full h-full md:max-w-3xl bg-white md:bg-white/90 rounded-none md:rounded-[40px] shadow-2xl 
            overflow-y-auto flex flex-col md:flex-row md:h-150"
          >
            {/* Left Side: Image */}
            <div className="relative w-full md:w-[45%] h-56 md:h-full overflow-hidden bg-slate-100 shrink-0">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={cards[step].image}
                    alt={cards[step].title}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-white/10" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side: Content (Slides) */}
            <div className="relative w-full md:w-[55%] flex-1 md:h-full flex flex-col p-8 md:p-12">
              {/* Progress Indicator */}
              <div className="flex justify-between items-center mb-10">
                <span className="text-xs font-bold text-black/70 uppercase tracking-widest font-poppins">
                  {cards[step].stepTitle}
                </span>
                <div className="flex gap-2">
                  {cards.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${step === i ? "w-8 bg-amber-800" : "w-1.5 bg-amber-800/20"
                        }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 relative min-h-[200px] md:min-h-0">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", damping: 25, stiffness: 180 }}
                    className="md:absolute md:inset-0 flex flex-col pt-2"
                  >
                    <h3 className="text-lg md:text-2xl font-regular text-amber-800/80 font-poppins mb-4 leading-8 pl-4 border-l-3 border-l-amber-800/80">
                      {cards[step].headline}
                    </h3>

                    <div className="space-y-4">
                      {cards[step].content.split("\n\n").map((para, i) => (
                        <p key={i} className="text-base text-black/70 font-poppins leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-2 mb-6 md:mb-0 md:mt-12 flex gap-4">
                {step > 0 && (
                  <button
                    onClick={prevStep}
                    className="flex-1 py-4 bg-slate-100 text-black/60 rounded-full 
                    text-base hover:bg-slate-200 transition-all flex items-center font-poppins
                    justify-center gap-2 active:scale-[0.98] outline-none border-none cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                )}
                <button
                  onClick={nextStep}
                  className="flex-2 py-4 bg-[#f8bbd0] text-black/80 rounded-full 
                  text-base hover:bg-[#f48fb1] transition-all flex items-center font-poppins cursor-pointer
                  justify-center gap-2 active:scale-[0.98] shadow-lg font-medium outline-none border-none"
                >
                  {step === cards.length - 1 ? "Finish" : "Next"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
