"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { OrganicBlob, SlantedLinesDoodle } from "./general/Doodles";
import StackedGallery from "./main/StackedGallery";
import VideoPeek from "./main/VideoPeek";
import ProgramExpansion from "./main/ProgramExpansion";
import BookTourModal from "./main/BookTourModal";
import { programs } from "./Data";


export default function Content() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: "easeOut" as any,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any },
    },
  };

  const doodleVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -20 },
    visible: (custom: any) => ({
      opacity: custom?.opacity ?? 1,
      scale: 1,
      rotate: custom?.rotate ?? 0,
      transition: {
        delay: custom?.delay ?? 0.8,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      } as any,
    }),
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isVideoPeekOpen, setIsVideoPeekOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isBookTourOpen, setIsBookTourOpen] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="programs" className="hidden md:block bg-[#FAF9F6] py-24 px-6 overflow-hidden relative">
      <motion.div
        className="container mx-auto relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <motion.p
            variants={itemVariants}
            className="text-md font-semibold text-amber-800 uppercase font-poppins tracking-widest"
          >
            Our Programs
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-4xl font-poppins text-black/80 max-w-3xl mx-auto leading-tight"
          >
            Curated paths for every <br /> stage of growth
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-md font-poppins text-slate-600 max-w-xl mx-auto"
          >
            Discover a variety of programs tailored to nurture your child&apos;s
            curiosity and development through play and learning.
          </motion.p>
        </div>

        <motion.div
          variants={doodleVariants}
          custom={{ delay: 1.5 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="absolute right-15 md:right-5 md:w-36 md:h-12 
          xl:w-40 xl:h-16 bg-[#a78bfa] rounded-full z-0 rotate-45"
        />

        {/** Programs section */}
        <div className="relative mt-20 mx-auto px-5 w-[75%]  min-h-[400px]">
          <motion.div
            variants={doodleVariants}
            custom={{ delay: 2, opacity: 0.6 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="absolute -left-30 w-20 h-20 opacity-60 z-10"
          >
            <SlantedLinesDoodle className="w-20 h-20" color="#92400E" />
          </motion.div>

          {/** Programs grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-12 items-center justify-center">
            {programs.map((program, index) => {
              const isOtherExpanded = expandedIndex !== null && expandedIndex !== index;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  animate={{
                    filter: isOtherExpanded ? "blur(8px)" : "blur(0px)",
                  }}
                  className={`flex flex-row items-center gap-6 group transition-all duration-500 
                    ${expandedIndex === null ? "hover:scale-105" : "" }`}
                >
                  {/* Image on the left */}
                  <motion.div
                    layoutId={`program-image-${index}`}
                    className="relative w-32 h-32 md:w-32 md:h-32 shrink-0 rounded-[30px] overflow-hidden shadow-md"
                  >
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </motion.div>

                  {/* Descriptions on the right */}
                  <div className="flex flex-col gap-1">
                    <motion.h3
                      layoutId={`program-title-${index}`}
                      className="text-lg font-poppins font-medium text-black/80 leading-tight"
                    >
                      {program.title}
                    </motion.h3>
                    <p className="text-black/80 text-[12px] md:text-sm
                  leading-relaxed font-poppins line-clamp-2 md:line-clamp-3 w-[75%]">
                      {program.description}
                    </p>

                    {/* Button below descriptions */}
                    <div className="pt-2">
                      <button
                        onClick={() => setExpandedIndex(index)}
                        className="flex items-center gap-2 group/btn"
                      >
                        <span className="text-sm font-regular font-poppins text-black/60 hover:border-b-2 cursor-pointer
                      hover:border-amber-800 pb-0.5 group-hover/btn:opacity-60 transition-opacity hover:text-amber-800
                    ">
                          Learn More
                        </span>
                        <ChevronRight
                          className="w-4 h-4 group-hover/btn:text-amber-800 text-black/70
                      group-hover/btn:translate-x-1 transition-transform " />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          {/** Expanded program card */}
          <ProgramExpansion
            programs={programs}
            expandedIndex={expandedIndex}
            onClose={() => setExpandedIndex(null)}
          />
        </div>

        <motion.div
          variants={doodleVariants}
          custom={{ delay: 2.5, opacity: 0.3, rotate: 15 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="absolute bottom-10 right-0 z-0 opacity-30 pointer-events-none"
        >
          <OrganicBlob className="w-48 h-56" color="#D836E0" />
        </motion.div>

        {/* Enroll button */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 pt-15 mx-auto justify-center items-center mb-30"
        >
          <Link
            href=""
            className="px-6 py-3 bg-[#f8bbd0] text-black/80 rounded-full font-poppins
            shadow-[0_8px_30px_rgb(0,0,0,0.09)] font-regular hover:bg-[#f48fb1] transition-colors"
          >
            Enroll Now
          </Link>
        </motion.div>
      </motion.div>

      {/* A Video Peek section */}
      <div className="flex flex-cols-2 mx-10 h-140 bg-[#FDF5E6] rounded-[30px] 
        shadow-[0_8px_30px_rgb(0,0,0,0.09)] items-center justify-center mb-20
      ">
        <div className="text-black/60 font-poppins text-lg m-4 ml-6 h-60 w-[40%]">
          <p className="text-amber-800 text-2xl">
            A Peek
          </p>

          <p className="mt-3">
            Take a peek inside our classrooms and see children learning, playing and growing in a safe,
            joyful environment
          </p>

          <p className="mt-3">
            From engaging activities to warm interactions with our teachers, every
            moment is designed to help your child feel confident and cared for
          </p>
        </div>
        <div className="ml-4 m-10 h-120 w-[50%] relative group">
          <video
            src="/vids/daycare-2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-[30px] cursor-pointer"
            preload="auto"
            controls={false}
            onClick={() => setIsVideoPeekOpen(true)}
          />
          <button
            onClick={() => setIsVideoPeekOpen(true)}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-white 
            text-black/80 rounded-full shadow-lg font-poppins font-regular hover:bg-slate-50 
            transition-all scale-95 group-hover:scale-100 cursor-pointer"
          >
            Take a peek
          </button>
        </div>
      </div>

      <VideoPeek isOpen={isVideoPeekOpen} onClose={() => setIsVideoPeekOpen(false)} />

      {/* A Button to book a tour */}
      <div className="flex flex-col items-center justify-center mb-20">
        <div className="text-2xl text-black/80 font-poppins text-center mb-5">
          Want to see it in person?
        </div>
        <button
          onClick={() => setIsBookTourOpen(true)}
          className="px-6 py-3 bg-[#f8bbd0] text-black/80 rounded-full font-poppins
          shadow-[0_8px_30px_rgb(0,0,0,0.09)] font-regular hover:bg-[#f48fb1] transition-colors"
        >
          Book a Tour
        </button>
      </div>

      <BookTourModal isOpen={isBookTourOpen} onClose={() => setIsBookTourOpen(false)} />

      {/* Gallery */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        custom={{ delay: 2.5, opacity: 0.3, }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="mt-40 mb-20" id="gallery">
          <div className="text-md font-semibold text-amber-800 text-center
          font-poppins tracking-widest mb-10 text-shadow-sm uppercase
        ">
            Gallery
          </div>
          <StackedGallery />
        </div>

        {/* videos & images */}
        <div className="flex flex-cols mx-10 gap-5 items-center justify-center">
          <div className="relative w-[28%] h-100 ">
            <video
              src="/vids/daycare-3.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-[30px]"
              preload="auto"
            />
          </div>
          <div className="relative w-[28%] h-100">
            <Image
              src="/images/kids-teacher-6.jpg"
              alt="Happy kids"
              fill
              className="object-cover rounded-[30px] shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
            />
          </div>
          <div className="relative w-[28%] h-100">
            <Image
              src="/images/kids-teacher-5.jpg"
              alt="Happy kids"
              fill
              className="object-cover rounded-[30px] shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}