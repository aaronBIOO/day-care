"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Send, Calendar } from "lucide-react";

interface BookTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookTourModal({ isOpen, onClose }: BookTourModalProps) {
  // Lock scroll when modal is open
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
    // In a real app, this would send the data to a server
    console.log("Tour request submitted");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-120 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative bg-white/95 backdrop-blur-xl w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border border-white/40"
          >
            {/* Header / Call Section */}
            <div className="bg-amber-50/50 p-8 pt-4 text-center border-b border-amber-100/50">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-all text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6 text-amber-800" />
              </div>

              <h2 className="text-md font-poppins font-semibold text-black/80">
                Book a Tour
              </h2>

              <div className="flex flex-col items-center gap-1 mt-4">
                <p className="text-sm text-black/70 font-poppins">Call us to book now</p>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 text-amber-800 font-poppins font-medium hover:scale-105 transition-transform"
                >
                  <Phone className="w-4 h-4" />
                  +1 (555) 123-4567
                </a>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8">
              <p className="text-center text-sm text-black/80 font-poppins mb-4">
                OR message us and we'll schedule it for you
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-amber-200 outline-none transition-all font-poppins text-sm ring-amber-800 ring-1"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-amber-200 outline-none transition-all font-poppins text-sm ring-amber-800 ring-1"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Preferred date or special requests..."
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-amber-200 outline-none transition-all font-poppins text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#f8bbd0] text-black/80 rounded-2xl font-poppins font-regular hover:bg-[#f48fb1] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                >
                  <Send className="w-4 h-4 text-black/70" />
                  Request Tour
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
