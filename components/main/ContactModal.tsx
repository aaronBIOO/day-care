"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Send, Phone } from "lucide-react";

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-110 flex items-center justify-center bg-white/80 backdrop-blur-xl p-4 md:p-6"
      >
        {/* Back Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-8 p-3 px-4 bg-black/10 hover:bg-black/15 
            rounded-full transition-colors z-10 group flex items-center shadow-[0px_5px_10px_rgba(0,0,0,0.05)"
          >
            <ArrowLeft className="w-4 h-4 text-black/50 group-hover:text-black transition-colors" />
            <span className="text-black/50 group-hover:text-black/80 font-poppins text-sm font-medium ml-2">
              Back
            </span>
          </button>
        <div className="relative w-150 h-150 bg-white/70 rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-10 md:pt-5">

          <div className="mt-2 text-center">
            <h2 className="text-lg semi-bold text-amber-900 font-poppins">
              Get In Touch With Us
            </h2>
            <p className="text-[13px] text-black/70 font-poppins max-w-sm mx-auto mb-10">
              We'd love to answer your questions. Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
              <div className="flex flex-col gap-2 ml-6">
                <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                  Parent Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="px-4 py-3 bg-slate-50 border-none rounded-[15px] focus:ring-2
                   focus:ring-amber-200 outline-none transition-all font-poppins text-sm ring-amber-800/50 ring-1"
                />
              </div>
              <div className="flex flex-col gap-2 mr-6">
                <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="px-4 py-3 bg-slate-50 border-none rounded-[15px] focus:ring-2 ring-amber-800/50 ring-1
                    focus:ring-amber-200 outline-none transition-all font-poppins text-sm"
                />
              </div>
              <div className="flex flex-col gap-2 ml-6">
                <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                  Child's Age
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3 years old"
                  className="px-4 py-3 bg-slate-50 border-none rounded-[15px] focus:ring-2 transition-all ring-amber-800/50 ring-1
                   focus:ring-amber-200 outline-none font-poppins text-sm shadow-[0px_3px_8px_rgba(0,0,0,0.03)"
                />
              </div>
              <div className="flex flex-col gap-2 mr-6">
                <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                  Child's Sex
                </label>
                <input
                  type="text"
                  placeholder="e.g. Male"
                  className="px-4 py-3 bg-slate-50 border-none rounded-[15px] focus:ring-2 transition-all ring-amber-800/50 ring-1
                   focus:ring-amber-200 outline-none font-poppins text-sm shadow-[0px_3px_8px_rgba(0,0,0,0.03)"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-black/60 ml-4 font-poppins">
                  Message
                </label>
                <textarea
                  rows={2.5}
                  required
                  placeholder="How can we help you?"
                  className="px-6 py-4 bg-slate-50 border-none rounded-3xl focus:ring-2 shadow-[0px_3px_8px_rgba(0,0,0,0.03)]
                  focus:ring-amber-200 outline-none transition-all font-poppins resize-none text-sm ring-amber-800/50 ring-[1.5px]"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-[30%] py-3 bg-[#f8bbd0] text-black/80 rounded-full 
                  text-sm hover:bg-[#f48fb1] transition-all flex items-center font-poppins
                  justify-center gap-3 active:scale-[0.98] shadow-lg font-regular mx-auto"
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
