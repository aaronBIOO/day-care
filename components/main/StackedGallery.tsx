"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, ArrowLeft } from "lucide-react";
import { galleryData } from "@/components/Data";

export default function StackedGallery() {
  const [expandedStack, setExpandedStack] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleStackClick = (index: number) => {
    if (expandedStack === index) return;
    setExpandedStack(index);
  };

  const handleImageClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex(idx);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(null);
    } else {
      setExpandedStack(null);
    }
  };

  const navigate = (direction: number) => {
    if (expandedStack === null || selectedIndex === null) return;
    const currentStack = galleryData[expandedStack];
    const newIdx = (selectedIndex + direction + currentStack.images.length) % currentStack.images.length;
    setSelectedIndex(newIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, expandedStack]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  return (
    <div className="relative w-full px-4 min-h-[100px] flex items-center justify-center bg-[#FAF9F6]">
      <div className="flex mx-auto py-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-8 mx-auto">
          {galleryData.map((stack, sIdx) => {
            const isExpanded = expandedStack === sIdx;
            const isOtherExpanded = expandedStack !== null && !isExpanded;

            return (
              <motion.div
                key={sIdx}
                layout
                initial={false}
                animate={{
                  filter: isOtherExpanded ? "blur(8px)" : "blur(0px)",
                  opacity: isOtherExpanded ? 0.4 : 1,
                  scale: isExpanded ? 1.05 : 1,
                  zIndex: isExpanded ? 50 : 10,
                }}
                className={`relative cursor-pointer transition-all duration-700 
                  ${isExpanded ? "w-full" : "w-64 h-64 lg:w-52 lg:h-52" }`}
                onClick={() => handleStackClick(sIdx)}
              >
                {/* Horizontal Spread (Expanded) */}
                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    <motion.div
                      key="spread"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="flex flex-wrap justify-center gap-5 py-10 relative"
                    >
                      <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={handleClose}
                        className="fixed top-0 right-0 p-4 bg-black/30 backdrop-blur-xl 
                        rounded-full shadow-2xl  hover:scale-110 active:scale-95 transition-all text-slate-800"
                      >
                        <X className="w-4 h-4 text-white" />
                      </motion.button>

                      {stack.images.map((img, iIdx) => (
                        <motion.div
                          key={iIdx}
                          layoutId={`stack-${sIdx}-image-${iIdx}`}
                          className="relative w-42 h-42 md:w-32 md:h-36 rounded-[15px] 
                          overflow-hidden shadow-2xl group border-4 border-white"
                          onClick={(e) => handleImageClick(iIdx, e)}
                        >
                          <Image
                            src={img}
                            alt={`${stack.title} ${iIdx}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 
                            transition-all duration-500 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full opacity-0 
                              group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                              <Maximize2 className="text-white w-4 h-4" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (

                    /* Stacked View (Default) */
                    <motion.div
                      key="stacked"
                      className="relative w-44 h-44 md:w-38 md:h-40 group items-center justify-center mx-auto"
                      whileHover={{ scale: 1.05 }}
                    >
                      {stack.images.map((img, iIdx) => {
                        let rotation = 0;
                        let zIndex = 5;

                        if (sIdx === 0 || sIdx === 2) {
                          // 1 and 3: 3 images. 0 and 2 on top of 1.
                          if (iIdx === 0) { rotation = -15; zIndex = 20; }
                          if (iIdx === 1) { rotation = 0; zIndex = 10; }
                          if (iIdx === 2) { rotation = 15; zIndex = 30; }
                        } else if (sIdx === 1) {
                          // 2: 2 images. 0 on top of 1, rotated left.
                          if (iIdx === 0) { rotation = -12; zIndex = 20; }
                          if (iIdx === 1) { rotation = 0; zIndex = 10; }
                        }

                        return (
                          <motion.div
                            key={iIdx}
                            layoutId={`stack-${sIdx}-image-${iIdx}`}
                            initial={false}
                            animate={{ rotate: rotation }}
                            className="absolute inset-0 rounded-[30px] overflow-hidden shadow-lg border-4 
                            border-white bg-slate-200 items-center justify-center"
                            style={{ zIndex }}
                          >
                            <Image
                              src={img}
                              alt={`${stack.title} ${iIdx}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-amber-900/0 
                              group-hover:bg-amber-900/5 transition-colors duration-500" />
                          </motion.div>
                        );
                      })}

                      {/* Interaction Clue */}
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-0 
                        group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-[#FDF5E6] px-4 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.09)]">
                          <p className="text-[14px] font-medium text-black/70 whitespace-nowrap">
                            Click To Expand
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && expandedStack !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-white backdrop-blur-lg flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Navigation buttons inside Lightbox */}
            <button
              className="absolute inset-y-0 left-0 w-24 md:w-40 lg:w-64 flex items-center 
                justify-center transition-all outline-none cursor-pointer z-110 group"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            >
              <div className="bg-white/80 md:bg-transparent p-3 md:p-0 rounded-full flex items-center justify-center shadow-lg md:shadow-none">
                <ChevronLeft className="w-6 h-6 md:w-16 md:h-16 text-black md:text-black/50 
                  group-hover:text-black/80 group-hover:scale-125 transition-all" />
              </div>
            </button>

            <button
              className="absolute inset-y-0 right-0 w-24 md:w-40 lg:w-64 flex items-center 
                justify-center transition-all outline-none cursor-pointer z-110 group"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
            >
              <div className="bg-white/80 md:bg-transparent p-3 md:p-0 rounded-full flex items-center justify-center shadow-lg md:shadow-none">
                <ChevronRight className="w-6 h-6 md:w-16 md:h-16 text-black md:text-black/50 
                  group-hover:text-black/80 group-hover:scale-125 transition-all" />
              </div>
            </button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              className="absolute top-6 left-2 md:top-8 md:left-10 p-3 bg-black/20 md:bg-black/5 hover:bg-black/70 md:hover:bg-black/10 
                rounded-full transition-colors z-120 group flex items-center gap-2 shadow-lg md:shadow-none"
            >
              <ArrowLeft className="w-4 h-4 md:w-6 md:h-6 text-white md:text-black/50 group-hover:text-black transition-colors" />
              <span className="hidden md:inline text-black/50 group-hover:text-black/80 font-poppins text-sm font-medium pr-2">
                Back
              </span>
            </motion.button>

            {/* Top Right Close Button (Returns to Main View) - Hidden on Mobile */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => { e.stopPropagation(); setExpandedStack(null); setSelectedIndex(null); }}
              className="hidden md:block absolute top-8 right-10 p-3 bg-black/5 hover:bg-black/10 
                rounded-full transition-colors z-120"
            >
              <X className="w-6 h-6 text-black/50" />
            </motion.button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full max-h-[60vh] flex items-center justify-center p-8 group"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryData[expandedStack].images[selectedIndex]}
                alt="Full view"
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                priority
              />

              {/* Pagination Dots (Inside Image Container, at the bottom) */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 px-4 
                py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 z-120">
                {galleryData[expandedStack].images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setSelectedIndex(idx); }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${selectedIndex === idx ? "bg-white w-6" : "bg-white/30 hover:bg-white/50"}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
