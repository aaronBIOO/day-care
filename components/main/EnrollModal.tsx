"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Phone, ChevronRight, FileText, Download, ExternalLink, Upload, CheckCircle2 } from "lucide-react";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const documents = [
  {
    title: "Child Care Enrollment Form",
    description: "Complete this form to begin the enrollment process for your child.",
    file: "/files/child_care_enrollment.pdf",
  },
  {
    title: "Parent Handbook",
    description: "Everything you need to know about our daycare policies and procedures.",
    file: "/files/parent_handbook.pdf",
  },
];

export default function EnrollModal({ isOpen, onClose }: EnrollModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setTimeout(() => {
        setStep(1);
        setError(null);
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Disabled as requested for now
    console.log("Enrollment form submission attempted (disabled)");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-110 flex items-center justify-center md:bg-white/30 
            backdrop-blur-xl p-0 md:p-6 overscroll-contain bg-white"
        >
          {/* Main Close Button / Back Button */}
          <button
            onClick={step === 2 ? () => setStep(1) : onClose}
            className="absolute top-6 left-4 md:top-4 md:left-8 p-3 md:px-4 bg-black/20 hover:bg-black/10 cursor-pointer
              rounded-full transition-colors z-120 group flex items-center 
              shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-white md:text-black/50 group-hover:text-black transition-colors" />
            <span className="hidden md:inline text-black/50 group-hover:text-black/80 font-poppins text-sm font-medium ml-2">
              Back
            </span>
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-full md:h-auto max-w-xl bg-white md:bg-white/80 md:rounded-[40px] 
              overflow-y-auto md:max-h-[90vh] p-4 pt-24 md:p-10 md:pt-6 md:w-120 mx-auto shadow-2xl rounded-none"
          >
            <AnimatePresence mode="wait">
              {/* ─── STEP 1: Info & Documents ─── */}
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
                    Enroll Now
                  </h2>
                  <p className="text-[12px] text-black/70 font-poppins max-w-xs mx-auto mb-4">
                    To enroll, read and fill the forms below to begin the enrollment process or call to discuss.
                  </p>

                  {/* Call link */}
                  <a
                    href="tel:+15551234567"
                    className="flex items-center justify-center gap-2 text-amber-800 font-poppins  
                      hover:text-amber-900 transition-colors mb-10 md:mb-4 text-sm font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    +1 (978) 427-0302
                  </a>

                  {/* Document Cards */}
                  <div className="flex flex-col gap-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.title}
                        className="bg-white/80 rounded-2xl p-5 text-left border border-black/5 
                          shadow-[0px_4px_12px_rgba(0,0,0,0.04)] hover:shadow-sm transition-shadow"
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

                  {/* Next button */}
                  <button
                    onClick={() => setStep(2)}
                    className="mt-20 md:mt-6 w-[45%] md:w-[60%] py-4 md:py-4 bg-[#f8bbd0] text-black/80 rounded-full
                      text-sm hover:bg-[#f48fb1] transition-all font-poppins font-regular mx-auto cursor-pointer
                      active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                  >
                    Next
                  </button>
                </motion.div>
              )}

              {/* ─── STEP 2: Submit Form ─── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                  className="text-center flex flex-col"
                >
                  <h2 className="text-lg font-semibold text-amber-800 font-poppins mb-4">
                    Form completed?
                  </h2>
                  <p className="text-[12px] text-black/70 font-poppins max-w-sm mx-auto mb-4">
                    Submit the form and we&apos;ll get back to you
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 text-left">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="parent-name-enroll"
                        className="text-sm font-medium text-black/60 ml-4 font-poppins"
                      >
                        Parent / Guardian Name
                      </label>
                      <input
                        id="parent-name-enroll"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="John Doe"
                        className="px-4 py-3 bg-slate-50 border-none rounded-[15px] md:focus:ring-2
                        md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins text-base md:text-sm ring-amber-800/20 ring-1"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="email-address-enroll"
                        className="text-sm font-medium text-black/60 ml-4 font-poppins"
                      >
                        Email Address
                      </label>
                      <input
                        id="email-address-enroll"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="john@example.com"
                        className="px-4 py-3 bg-slate-50 border-none rounded-[15px] md:focus:ring-2 ring-amber-800/20 ring-1
                          md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins text-base md:text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label 
                        htmlFor="file-upload"
                        className="text-sm font-medium text-black/60 ml-4 font-poppins"
                      >
                        Completed Enrollment Form
                      </label>
                      <div className="relative">
                        <input
                          id="file-upload"
                          type="file"
                          accept=".pdf,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const fileName = e.target.files?.[0]?.name;
                            const label = document.getElementById('file-label');
                            if (label && fileName) label.innerText = fileName;
                          }}
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-none rounded-[15px] 
                            cursor-pointer ring-amber-800/20 ring-1 hover:bg-slate-100 transition-colors"
                        >
                          <Upload className="w-4 h-4 text-black/40" />
                          <span id="file-label" className="text-sm text-black/40 font-poppins">Upload PDF or DOCX</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="enroll-message"
                        className="text-sm font-medium text-black/60 ml-4 font-poppins"
                      >
                        Anything you&apos;d like us to know?
                      </label>
                      <textarea
                        id="enroll-message"
                        name="message"
                        rows={3}
                        placeholder="Additional notes..."
                        className="px-6 py-4 bg-slate-50 border-none rounded-3xl md:focus:ring-2 shadow-[0px_3px_8px_rgba(0,0,0,0.03)] mb-10 md:mb-auto
                        md:focus:ring-amber-200 focus:outline-none outline-none transition-all font-poppins resize-none text-base md:text-sm ring-amber-800/20 ring-1"
                      />
                    </div>

                    <div className="mt-2">
                      <button
                        type="submit"
                        disabled
                        className="w-[45%] md:w-[40%] py-4 md:py-3 bg-[#f8bbd0] text-black/80 rounded-full
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
