"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, ChevronRight, ChevronLeft } from "lucide-react";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnrollModal({ isOpen, onClose }: EnrollModalProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0); 

  // Lock body scroll when modal is open
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
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enrollment form submitted");
    onClose();
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
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
          className="fixed inset-0 z-110 flex items-center justify-center bg-white/30 
          backdrop-blur-xl p-0 md:p-6 overscroll-contain"
        >
          {/* Main Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 left-2 md:top-4 md:left-8 p-3 md:px-4 bg-black/20 hover:bg-black/70 
              rounded-full transition-colors z-120 group flex items-center 
              shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-white md:text-black/50 group-hover:text-white transition-colors" />
            <span className="hidden md:inline text-black/50 group-hover:text-black/80 font-poppins text-sm font-medium ml-2">
              Back
            </span>
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-full md:h-auto max-w-xl bg-white md:bg-white/80 rounded-none md:rounded-[40px] shadow-2xl 
            overflow-y-auto md:overflow-hidden p-8 pt-24 md:p-12 md:pt-10 md:w-120 mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-lg font-semibold text-amber-800 font-poppins mb-2">
                Enroll Now
              </h2>
              <div className="flex justify-center gap-2 mb-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 
                      ${step === i ? "w-8 bg-amber-800" : "w-2 bg-amber-800/20"}`}
                  />
                ))}
              </div>
            </div>

            <div className="relative min-h-[350px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step0"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="flex flex-col gap-5 w-full"
                  >
                    <p className="text-sm text-black/70 font-poppins text-center mb-2">
                      Let's start with your information
                    </p>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                        Parent / Guardian Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="px-6 py-4 bg-slate-50 border-none rounded-[20px] md:focus:ring-2
                        md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins text-base md:text-sm 
                        ring-amber-800/20 ring-1"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="px-6 py-4 bg-slate-50 border-none rounded-[20px] md:focus:ring-2
                        md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins text-base md:text-sm 
                        ring-amber-800/20 ring-1"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 000-0000"
                        className="px-6 py-4 bg-slate-50 border-none rounded-[20px] md:focus:ring-2
                        md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins text-base md:text-sm 
                        ring-amber-800/20 ring-1"
                      />
                    </div>
                    <button
                      onClick={nextStep}
                      className="md:mt-4 mt-40 w-full py-4 bg-[#f8bbd0] text-black/80 rounded-full 
                      text-base hover:bg-[#f48fb1] transition-all flex items-center font-poppins
                      justify-center gap-3 active:scale-[0.98] shadow-lg font-regular"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="flex flex-col gap-5 w-full"
                  >
                    <p className="text-sm text-black/70 font-poppins text-center mb-2">
                      Now, tell us about your child
                    </p>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                        Child’s Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        className="px-6 py-4 bg-slate-50 border-none rounded-[20px] md:focus:ring-2
                        md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins text-base md:text-sm 
                        ring-amber-800/20 ring-1"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                        Child’s Date of Birth
                      </label>
                      <input
                        type="date"
                        required
                        className="px-6 py-4 bg-slate-50 border-none rounded-[20px] md:focus:ring-2 
                        md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins text-base md:text-sm 
                        ring-amber-800/20 ring-1 h-14"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                        Preferred Start Date
                      </label>
                      <input
                        type="date"
                        required
                        className="px-6 py-4 bg-slate-50 border-none rounded-[20px] md:focus:ring-2
                        md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins text-base md:text-sm 
                        ring-amber-800/20 ring-1 h-14"
                      />
                    </div>
                    <div className="flex gap-4 md:mt-4 mt-40">
                      <button
                        onClick={prevStep}
                        className="flex-1 py-4 bg-slate-100 text-black/60 rounded-full 
                        text-base hover:bg-slate-200 transition-all flex items-center font-poppins
                        justify-center gap-3 active:scale-[0.98]"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        onClick={nextStep}
                        className="flex-2 py-4 bg-[#f8bbd0] text-black/80 rounded-full 
                        text-base hover:bg-[#f48fb1] transition-all flex items-center font-poppins
                        justify-center gap-3 active:scale-[0.98] shadow-lg font-regular"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="flex flex-col gap-5 w-full"
                  >
                    <p className="text-sm text-black/70 font-poppins text-center mb-2">
                      Final thoughts
                    </p>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Anything we should know about your child?"
                        className="px-6 py-4 bg-slate-50 border-none rounded-[25px] md:focus:ring-2 
                        shadow-[0px_3px_8px_rgba(0,0,0,0.03)] font-poppins resize-none text-base md:text-sm ring-amber-800/20 
                        md:focus:ring-amber-200 focus:outline-none outline-none transition-all ring-1"
                      />
                    </div>
                    <div className="flex gap-4 md:mt-4 mt-60">
                      <button
                        onClick={prevStep}
                        className="flex-1 py-4 bg-slate-100 text-black/60 rounded-full 
                        text-base hover:bg-slate-200 transition-all flex items-center font-poppins
                        justify-center gap-3 active:scale-[0.98]"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-2 py-4 bg-[#f8bbd0] text-black/80 rounded-full 
                        text-base hover:bg-[#f48fb1] transition-all flex items-center font-poppins
                        justify-center gap-3 active:scale-[0.98] shadow-lg font-regular"
                      >
                        <Send className="w-4 h-4 text-black/60" />
                        Submit 
                      </button>
                    </div>
                    <p className="mt-4 text-[12px] text-black/60 font-poppins text-center 
                      max-w-sm mx-auto leading-relaxed"
                    >
                      Our team will contact you within one business day to confirm 
                      availability and guide you through the next steps.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
