"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Heart, ShieldCheck, Users, Info, GraduationCap } from "lucide-react";
import Image from "next/image";

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LearnMoreModal({ isOpen, onClose }: LearnMoreModalProps) {
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

  if (!isOpen) return null;

  const sections = [
    {
      title: "Our Mission",
      icon: <Heart className="w-8 h-8 text-pink-400" />,
      content: "To provide a nurturing, safe, and stimulating environment where children can learn, grow, and thrive through play, exploration, and structured early education. We believe every child is a unique individual with the potential to achieve greatness.",
      image: "/images/kids-learning.jpg"
    },
    {
      title: "Our Expert Teachers",
      icon: <Users className="w-8 h-8 text-blue-400" />,
      content: "Our team consists of certified early childhood educators who are passionate about child development. With years of experience and a deep commitment to our students, they create a welcoming atmosphere that feels like home.",
      image: "/images/kids-teacher-1.jpg"
    },
    {
      title: "Safe & Modern Facilities",
      icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
      content: "Safety is our number one priority. Our facilities are equipped with state-of-the-art security systems, age-appropriate play equipment, and clean, bright classrooms designed to inspire creativity and learning.",
      image: "/images/kids-playing-1.jpg"
    },
    {
      title: "Licenses & Accreditation",
      icon: <GraduationCap className="w-8 h-8 text-amber-400" />,
      content: "We are fully licensed and hold several prestigious accreditations in early childhood education. We consistently exceed state health and safety standards to ensure the best possible care for your children.",
      image: "/images/kid-playing.jpg"
    },
    {
      title: "Family Communications",
      icon: <Info className="w-8 h-8 text-purple-400" />,
      content: "We value the partnership between teachers and parents. Through daily updates, regular parent-teacher conferences, and an open-door policy, we keep you informed and involved in your child's milestones.",
      image: "/images/kids-teacher-3.jpg"
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-110 bg-white/90 backdrop-blur-3xl overflow-y-auto"
      >
        {/* Navigation / Header */}
        <div className="sticky top-0 z-50 bg-white/40 backdrop-blur-md px-8 py-6 flex items-center justify-between border-b border-slate-100">
          <button
            onClick={onClose}
            className="p-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors group flex items-center gap-2"
          >
            <ArrowLeft className="w-6 h-6 text-black/50 group-hover:text-black transition-colors" />
            <span className="text-black/50 group-hover:text-black/80 font-poppins text-sm font-medium pr-2">Back</span>
          </button>
          <h2 className="text-xl font-bold text-amber-900 font-poppins">Our Story & Commitment</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="max-w-6xl mx-auto p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 font-poppins mb-6">
              Nurturing Tomorrow's Leaders
            </h1>
            <p className="text-xl text-slate-600 font-poppins max-w-3xl mx-auto leading-relaxed">
              At DayCare, we go beyond typical childcare. We provide a foundation for lifelong learning in a space where every child feels seen, loved, and encouraged.
            </p>
          </motion.div>

          <div className="space-y-32">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center`}
              >
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-white shadow-xl rounded-[20px]">
                      {section.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-amber-900 font-poppins">{section.title}</h3>
                  </div>
                  <p className="text-lg text-slate-600 font-poppins leading-relaxed">
                    {section.content}
                  </p>
                </div>
                <div className="flex-1 w-full relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl group border-8 border-white">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-700" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-40 text-center bg-amber-50 rounded-[60px] p-12 md:p-24 border border-amber-100"
          >
            <h2 className="text-4xl font-bold text-amber-900 font-poppins mb-6">
              Want to see our facility?
            </h2>
            <p className="text-lg text-amber-800/70 font-poppins mb-10 max-w-2xl mx-auto">
              We offer personalized tours for parents every Tuesday and Thursday. Come meet the team and explore our classrooms.
            </p>
            <button
              onClick={onClose}
              className="px-10 py-5 bg-[#f8bbd0] text-black/80 rounded-full shadow-lg font-bold text-xl hover:bg-[#f48fb1] transition-all hover:scale-105 active:scale-95"
            >
              Book a Tour Today
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
