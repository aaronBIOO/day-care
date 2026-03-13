"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Phone, ChevronRight, FileText, Download, ExternalLink } from "lucide-react";
import { sendOwnerEmail } from "@/app/actions/email";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const documents = [
  {
    title: "Parent Handbook",
    description: "Everything you need to know about our daycare policies and procedures.",
    file: "/files/parent_handbook.pdf",
  },
  {
    title: "Child Care Enrollment Form",
    description: "Complete this form to begin the enrollment process for your child.",
    file: "/files/child_care_enrollment.pdf",
  },
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setError(null);
      }, 500);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await sendOwnerEmail(formData);
      if (result.success) {
        onClose();
      } else {
        setError(result.error || "Failed to send. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsPending(false);
    }
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
          onClick={step === 2 ? () => setStep(1) : onClose}
          className="absolute top-6 left-4 md:top-4 md:left-8 p-3 md:px-4 bg-black/20 hover:bg-black/10 cursor-pointer
            rounded-full transition-colors z-10 group flex items-center shadow-[0px_5px_10px_rgba(0,0,0,0.05)]"
        >
          <ArrowLeft className="w-4 h-4 text-black/50 group-hover:text-black transition-colors" />
          <span className="hidden md:inline text-black/50 group-hover:text-black/70 font-poppins text-sm font-medium ml-2">
            Back
          </span>
        </button>

        <div className="relative w-full h-full md:w-120 md:h-auto md:max-h-[90vh] bg-white md:bg-white/70 rounded-none md:rounded-[40px] shadow-2xl overflow-y-auto p-4 pt-24 md:p-10 md:pt-6">
          <AnimatePresence mode="wait">
            {/* ─── STEP 1: Documents + Call ─── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="text-center flex flex-col"
              >
                <h2 className="text-md font-semibold text-amber-800 font-poppins">
                  Get In Touch
                </h2>
                <p className="w-[65%] md:w-auto text-[12px] text-black/70 font-poppins max-w-xs mx-auto mt-1 mb-4">
                  Read the files below, or schedule a call and let&apos;s discuss
                </p>

                {/* Call link */}
                <div
                  className="flex items-center justify-center gap-2 text-amber-800 font-poppins text-sm font-medium 
                    hover:text-amber-900 transition-colors mb-4"
                >
                  <Phone className="w-4 h-4" />
                  +1 (978) 427-0302
                </div>

                {/* Document Cards */}
                <div className="flex flex-col gap-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.title}
                      className="bg-white/80 rounded-2xl p-5 text-left border border-black/5 
                        shadow-[0px_4px_12px_rgba(0,0,0,0.04)] hover:shadow-xm transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="w-5 h-5 text-amber-800" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-black/70 font-poppins">{doc.title}</h3>
                          <p className="text-xs text-black/50 font-poppins mt-0.5">{doc.description}</p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <a
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full
                            bg-slate-50 text-black/70 text-xs font-poppins font-medium 
                            hover:bg-slate-100 transition-colors border border-black/5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View in Browser
                        </a>
                        <a
                          href={doc.file}
                          download
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full
                            bg-amber-50 text-amber-800 text-xs font-poppins font-medium 
                            hover:bg-amber-100 transition-colors border border-amber-200/60"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Send us a message button */}
                <button
                  onClick={() => setStep(2)}
                  className="mt-20 md:mt-6 w-[60%] md:w-[60%] py-4 bg-[#f8bbd0] text-black/80 rounded-full
                    text-sm hover:bg-[#f48fb1] transition-all font-poppins font-regular mx-auto cursor-pointer
                    active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                >
                  Message us
                </button>
              </motion.div>
            )}

            {/* ─── STEP 2: Form ─── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="text-center flex flex-col"
              >
                <h2 className="text-lg font-semibold text-amber-800 font-poppins mb-6">
                  Send Us a Message
                </h2>
               

                {/* Form */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 text-left">
                  <input type="hidden" name="formType" value="Getting in Touch" />
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="parent-name"
                      className="text-sm font-medium text-black/60 ml-4 font-poppins"
                    >
                      Parent / Guardian Name
                    </label>
                    <input
                      id="parent-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Chris Pratt"
                      className="px-4 py-3 bg-slate-50 border-none rounded-[15px] md:focus:ring-2
                       md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins text-base md:text-sm ring-amber-800/20 ring-1"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email-address"
                      className="text-sm font-medium text-black/60 ml-4 font-poppins"
                    >
                      Email Address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="chris@example.com"
                      className="px-4 py-3 bg-slate-50 border-none rounded-[15px] md:focus:ring-2 ring-amber-800/20 ring-1
                        md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins text-base md:text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-sm font-medium text-black/60 ml-4 font-poppins"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      placeholder="How can we help you?"
                      className="px-6 py-4 bg-slate-50 border-none rounded-3xl md:focus:ring-2 shadow-[0px_3px_8px_rgba(0,0,0,0.03)]
                      md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins resize-none text-base md:text-sm ring-amber-800/20 ring-1"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs ml-4 font-poppins">{error}</p>
                  )}

                  <div className="mt-20 md:mt-4">
                    <button
                      type="submit"
                      disabled
                      className="w-[60%] md:w-[40%] py-4 md:py-3 bg-[#f8bbd0] text-black/80 rounded-full
                      text-sm transition-all flex items-center font-poppins
                      justify-center gap-2 shadow-lg font-medium mx-auto
                      opacity-70 cursor-not-allowed"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
