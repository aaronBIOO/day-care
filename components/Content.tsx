"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OrganicBlob, SlantedLinesDoodle } from "./Doodles";

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
    description: "Seasonal adventures, outdoor play, and special workshops to keep...",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800&auto=format&fit=crop",
    hoverColor: "hover:bg-rose-100",
  },
  {
    title: "Special Events",
    description: "Themed parties, holiday celebrations, and...",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=800&auto=format&fit=crop",
    hoverColor: "hover:bg-cyan-100",
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
          <h2 className="text-4xl md:text-4xl font-poppins text-black/80 max-w-3xl mx-auto leading-tight">
            Curated paths for every <br /> stage of growth
          </h2>
          <p className="text-md font-poppins text-slate-600 max-w-xl mx-auto">
            Discover a variety of programs tailored to nurture your child&apos;s
            curiosity and development through play and learning.
          </p>
        </div>
        <div className="absolute right-15 w-24 h-24 md:w-40 md:h-16 bg-[#a78bfa] rounded-full rotate-45" />

        {/** Experimenting the Programs card */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-12 mx-auto px-5 items-center justify-center w-[75%]">
           <OrganicBlob className="absolute -left-10 w-50 h-50" color="#D836E0" />
          {programs.map((program, index) => (
            <div key={index} className="flex flex-row items-center gap-6 group hover:scale-105">
              {/* Image on the left */}
              <div className="relative w-30 h-30 md:w-30 md:h-30 shrink-0 rounded-[30px] overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Descriptions on the right */}
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-poppins font-medium text-slate-900 leading-tight">
                  {program.title}
                </h3>
                <p className="text-slate-600 text-[12px] md:text-sm leading-relaxed font-poppins line-clamp-2 md:line-clamp-3 w-[75%]">
                  {program.description}
                </p>

                {/* Button below descriptions */}
                <div className="pt-2">
                  <button className="flex items-center gap-2 group/btn">
                    <span className="text-sm font-regular font-poppins text-black/70 hover:border-b-2 hover:border-black/50 pb-0.5 group-hover/btn:opacity-60 transition-opacity">
                      Learn More
                    </span>
                    <ChevronRight className="w-4 h-4 text-black/70 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SlantedLinesDoodle className="absolute right-15 w-20 h-20 opacity-60" color="#92400E" />
    </section>
  );
}