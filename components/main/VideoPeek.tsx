"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, ArrowLeft } from "lucide-react";
import { videos } from "@/components/Data";

interface VideoPeekProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPeek({ isOpen, onClose }: VideoPeekProps) {
  const [view, setView] = useState<"thumbnails" | "video">("thumbnails");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setView("thumbnails");
    }
  }, [isOpen]);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setView("video");
    setIsPlaying(true);
  };

  const handleBackToThumbnails = () => {
    setView("thumbnails");
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const navigate = (direction: number) => {
    const nextIndex = (currentIndex + direction + videos.length) % videos.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const scrollThumbnails = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-200 flex flex-col items-center justify-center 
        bg-white md:bg-white/80 md:backdrop-blur-xl p-0 md:p-10 overflow-hidden"
      >
        {/* Navigation Buttons */}
        <button
          onClick={view === "thumbnails" ? onClose : handleBackToThumbnails}
          className="fixed top-6 left-2 p-3 bg-black/20 hover:bg-black/70 
            rounded-full transition-colors z-210 group flex items-center shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>

        {view === "thumbnails" ? (
          <div
            className="relative w-full md:w-[90%] h-full md:h-90 flex 
            flex-col items-center justify-start md:justify-center"
            style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
          >
            <div className="w-full flex flex-col items-center pt-24 md:pt-0 pb-10">
            {/* Gallery Navigation */}
            <button
              onClick={() => scrollThumbnails("left")}
              className="ml-4 absolute left-20 top-1/2 -translate-y-1/2 -translate-x-full hidden 
              md:flex items-center justify-center p-4 hover:scale-110 transition-transform"
            >
              <ChevronLeft className="w-12 h-12 text-black/40" />
            </button>
            <button
              onClick={() => scrollThumbnails("right")}
              className="mr-4 absolute right-20 top-1/2 -translate-y-1/2 translate-x-full hidden md:flex 
              items-center justify-center p-4 hover:scale-110 transition-transform"
            >
              <ChevronRight className="w-12 h-12 text-black/40" />
            </button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-2xl font-poppins text-black/70 max-w-3xl 
              mx-auto leading-tight text-center mb-10 md:mb-2">
              Curated paths for every <br /> stage of growth
            </motion.div>

            <motion.div
              ref={scrollContainerRef}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.3
                  }
                }
              }}
              className="flex flex-col md:flex-row gap-8 md:gap-4 pb-20 pt-4 md:pt-8 w-full md:w-auto px-8 
              md:px-0 scrollbar-hide snap-y md:snap-x items-center justify-start md:justify-center"
            >
              {videos.map((src, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.8, ease: "easeOut" }
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="relative shrink-0 w-full h-80 md:w-40 md:h-[250px] 
                    rounded-[35px] md:rounded-[25px] overflow-hidden cursor-pointer shadow-xl snap-center"
                  onClick={() => handleThumbnailClick(idx)}
                >
                  <video
                    src={src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="auto"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center group">
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex 
                      items-center justify-center transition-transform group-hover:scale-110">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
            {/* Video Navigation */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-20 top-1/2 -translate-y-1/2 hidden md:flex 
              items-center justify-center p-4 hover:scale-110 transition-transform z-210 group"
            >
              <ChevronLeft className="w-16 h-16 text-black/30 group-hover:text-black/60 transition-colors" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="absolute right-20 top-1/2 -translate-y-1/2 hidden md:flex items-center 
              justify-center p-4 hover:scale-110 transition-transform z-210 group"
            >
              <ChevronRight className="w-16 h-16 text-black/30 group-hover:text-black/60 transition-colors" />
            </button>

            <motion.div
              layoutId="video-container"
              className="relative w-full md:w-[60%] aspect-9/16 md:aspect-video bg-black rounded-none  
                overflow-hidden shadow-2xl cursor-pointer border-none group md:rounded-[40px]"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src={videos[currentIndex]}
                autoPlay
                preload="auto"
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
                onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
              />

              {/* Custom Controls Bar */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 
                to-transparent p-6 pt-12 opacity-0 group-hover:opacity-100 transition-opacity 
                duration-300 pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-2 pointer-events-auto">
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xs font-poppins min-w-[35px]">
                      {formatTime(currentTime)}
                    </span>
                    <div className="relative flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden group/progress">
                      <div
                        className="absolute top-0 left-0 h-full bg-amber-500 transition-all duration-100"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleProgressChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <span className="text-white text-xs font-poppins min-w-[35px]">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Play/Pause Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <Pause className="w-12 h-12 text-white fill-white" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Pagination / Dots */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
              {videos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                    ${currentIndex === idx ? "bg-amber-800 w-6" : "bg-amber-800/20 hover:bg-amber-800/40" }`}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
