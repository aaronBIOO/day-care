"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Phone } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission would go here
    console.log("Form submitted");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-110 flex items-center justify-center bg-white/30 backdrop-blur-xl p-0 md:p-6"
      >
        {/* Back Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 md:top-4 md:left-8 p-3 md:px-4 bg-black/20 hover:bg-black/15 
            rounded-full transition-colors z-10 group flex items-center shadow-[0px_5px_10px_rgba(0,0,0,0.05)]"
        >
          <ArrowLeft className="w-4 h-4 text-black/50 group-hover:text-amber-800 transition-colors" />
          <span className="hidden md:inline text-black/50 group-hover:text-black/70 font-poppins text-sm font-medium ml-2">
            Back
          </span>
        </button>
        <div className="relative w-full h-full md:w-120 md:h-150 bg-white md:bg-white/70 rounded-none md:rounded-[40px] shadow-2xl overflow-y-auto p-8 pt-24 md:p-10 md:pt-5">

          <div className="mt-2 text-center">
            <h2 className="text-lg semi-bold text-amber-800 font-poppins">
              Get In Touch With Us
            </h2>
            <p className="text-[13px] text-black/70 font-poppins max-w-sm mx-auto mb-10">
              We'd love to answer your questions. Fill out the form below and we'll get back to you within 24 hours
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 text-left">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Chris Pratt"
                  className="px-4 py-3 bg-slate-50 border-none rounded-[15px] focus:ring-2
                   focus:ring-amber-200 outline-none transition-all font-poppins text-sm ring-amber-800/20 ring-1"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="chris@example.com"
                  className="px-4 py-3 bg-slate-50 border-none rounded-[15px] focus:ring-2 ring-amber-800/20 ring-1
                    focus:ring-amber-200 outline-none transition-all font-poppins text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                  Message
                </label>
                <textarea
                  rows={2.5}
                  required
                  placeholder="How can we help you?"
                  className="px-6 py-4 bg-slate-50 border-none rounded-3xl focus:ring-2 shadow-[0px_3px_8px_rgba(0,0,0,0.03)]
                  focus:ring-amber-200 outline-none transition-all font-poppins resize-none text-sm ring-amber-800/20 ring-1"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-[60%] md:w-[35%] py-5 md:py-3 bg-[#f8bbd0] text-black/80 rounded-full mt-30 md:mt-auto
                  text-sm hover:bg-[#f48fb1] transition-all flex items-center font-poppins
                  justify-center gap-3 active:scale-[0.98] shadow-lg font-regular mx-auto cursor-pointer"
                >
                  <Send className="w-4 h-4 text-black/60" />
                  Submit
                </button>
              </div>
            </form>

            <div className="mt-4 pt-2 border-t border-slate-100 flex flex-col items-center gap-2">
              <p className="text-black/60 font-poppins">
                Or call us directly at
              </p>
              <div className="w-full font-poppins rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <Phone className="w-5 h-5 mr-2 text-amber-800" />
                <p className="text-amber-800 text-sm">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
