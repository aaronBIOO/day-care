"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StarDoodle, HandDrawnArrow, ConnectedBubbles, OrganicBlob, LeafShape } from "./Doodles";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } as any,
    },
  };

  const doodleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.6,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 } as any,
    },
  };

  return (
    <section id="home" className="hidden md:flex relative min-h-screen md:pt-40 pt-20 pb-20 overflow-hidden bg-[#f8d057]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 relative z-10 flex flex-col justify-between h-full min-h-[80vh] mt-8"
      >
        {/* Top Text Cluster */}
        <div className="lg:max-w-4xl relative md:max-w-2xl">
          <motion.div variants={itemVariants} className="relative z-20">
            <OrganicBlob className="absolute -top-50 -left-20 w-50 h-50" color="#D836E0" />
            <p className="lg:text-4xl md:text-3xl text-2xl font-medium text-black/80 tracking-tight leading-[0.8]">
              <span>a safe</span>
              <br />
              <span className="lg:text-6xl md:text-5xl text-4xl mt-2">loving place</span>
            </p>
          </motion.div>

          <motion.div variants={doodleVariants}
            className="absolute top-20 left-0 pointer-events-none md:-left-20
          ">
            <HandDrawnArrow className="md:w-60 md:h-35 xl:w-80 xl:h-40" color="#15803D" />
          </motion.div>

          <motion.div variants={doodleVariants}
            className="absolute top-20 right-40 pointer-events-none
             lg:right-70 md:right-55
          ">
            <ConnectedBubbles className="md:w-70 md:h-45 lg:w-80 lg:h-50" color="#a78bfa" />
          </motion.div>

          {/* Image overlapping 'love' */}
          <motion.div
            variants={itemVariants}
            className="
            absolute xl:-top-10 xl:-right-80 xl:w-[550px] xl:h-[250px]
            lg:-top-3 lg:-right-20 lg:w-[400px] lg:h-[200px]  
            md:-top-3 md:-right-20 md:w-[400px] md:h-[200px] 
            w-[300px] h-[150px] shadow-3xl rounded-sm overflow-hidden shadow-2xl border-4 border-white z-10"
          >
            <Image
              src="/images/kid-smile-2.jpg"
              alt="Child"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            variants={doodleVariants}
            className="absolute xl:top-10 xl:right-50 lg:w-12 lg:h-12 bg-green-700 rounded-full
             md:-top-20 md:-left-60
            "
          />

          <motion.div variants={doodleVariants} className="absolute top-0 -right-50 pointer-events-none z-20">
            <OrganicBlob className="w-50 h-50" color="#D836E0" />
          </motion.div>
        </div>

        {/* Bottom Text/Image Cluster */}
        <div className="mt-10 flex flex-col md:flex-row items-center gap-12 relative pb-10">
          <motion.div
            variants={itemVariants}
            className="relative w-[500px] h-[230px] shrink-0 md:w-[400px] md:h-[200px]"
          >
            <div className="absolute inset-0 -rotate-2 shadow-2xl rounded-sm overflow-hidden border-4 border-white">
              <Image
                src="/images/teach-illus-2.jpg"
                alt="Learning"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 md:w-40 md:h-16 bg-[#a78bfa] rounded-full rotate-45" />
          </motion.div>

          <motion.p variants={itemVariants} className="text-4xl text-black/80 font-medium whitespace-nowrap text-shadow-lg">
            for your child <br /> to grow
          </motion.p>

          {/* Stacking images */}
          <div className="flex flex-col gap-4 -translate-y-4">
            <motion.div
              variants={itemVariants}
              className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-3 md:right-8 lg:right-0"
            >
              <Image
                src="/images/kid-smile.jpg"
                alt="Child"
                fill
                className="object-cover" />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl -rotate-6 md:right-20 top-14 lg:right-0 lg:top-0"
            >
              <Image
                src="/images/kid-calm.jpg"
                alt="Child"
                fill
                className="object-cover" />
            </motion.div>
          </div>

          <motion.div variants={doodleVariants} className="pointer-events-none">
            <LeafShape className="w-48 h-48" color="#F24DDB" />
          </motion.div>

          <motion.div variants={doodleVariants} className="flex-row gap-2 pointer-events-none">
            <StarDoodle className="w-15 h-15" color="#fff" />
            <StarDoodle className="w-10 h-10" color="#fff" />
            <StarDoodle className="w-7 h-7" color="#fff" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
