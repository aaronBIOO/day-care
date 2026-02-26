"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Program {
  title: string;
  description: string;
  image: string;
  hoverColor: string;
  badge?: string;
}

const programs: Program[] = [
  {
    title: "Infant Care",
    description: "A nurturing environment focused on sensory exploration...",
    image: "https://images.unsplash.com/photo-1537655780520-1e392ead81f2?q=80&w=800&auto=format&fit=crop",
    hoverColor: "hover:bg-blue-100",
    badge: "0-18 MONTHS"
  },
  {
    title: "Toddler Program",
    description: "Encouraging independence and social skills through...",
    image: "https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?q=80&w=800&auto=format&fit=crop",
    hoverColor: "hover:bg-green-100",
  },
  {
    title: "Preschool",
    description: "Preparing children for school with a focus on literacy...",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=800&auto=format&fit=crop",
    hoverColor: "hover:bg-amber-100",
    badge: "READY FOR SCHOOL"
  },
  {
    title: "After School",
    description: "Fun and educational activities that provide a...",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    hoverColor: "hover:bg-purple-100",
  },
  {
    title: "Summer Camp",
    description: "Seasonal adventures, outdoor play, and special workshops...",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800&auto=format&fit=crop",
    hoverColor: "hover:bg-rose-100",
  }
];

export default function Content() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="programs" className="bg-[#FAF9F6] py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-md font-semibold text-amber-800 uppercase font-poppins tracking-widest">
            Our Programs
          </p>
          <h2 className="text-4xl md:text-5xl font-poppins text-black/80 max-w-3xl mx-auto leading-tight">
            Curated paths for every <br /> stage of growth
          </h2>
          <p className="text-lg font-poppins text-slate-600 max-w-xl mx-auto">
            Discover a variety of programs tailored to nurture your child&apos;s curiosity and development through play and learning.
          </p>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 pt-8">
            <button
              onClick={() => scroll("left")}
              className="p-4 rounded-full border border-slate-300 hover:bg-white hover:shadow-lg transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-4 rounded-full border border-slate-300 hover:bg-white hover:shadow-lg transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {programs.map((program, index) => (
            <div
              key={index}
              className={`shrink-0 w-[300px] md:w-[350px] snap-center rounded-3xl transition-colors duration-300 ${program.hoverColor} group shadow-sm hover:shadow-xl bg-slate-100`}
            >
              {/* Image Container */}
              <div className="relative aspect-5/3 w-full rounded-2xl overflow-hidden mb-3 border border-slate-50">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {program.badge && (
                  <div className="absolute top-4 right-4 bg-[#f8d057] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {program.badge}
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="space-y-3 px-4">
                <h3 className="text-lg font-poppins font-medium text-slate-900 leading-tight">
                  {program.title}
                </h3>
                <p className="text-slate-600 text-[15px] leading-relaxed font-poppins">
                  {program.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 p-2">
                <button className="px-6 py-2 rounded-full border-2 border-slate-200 text-sm font-regular text-slate-700 hover:bg-white transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}