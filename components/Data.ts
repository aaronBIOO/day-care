import { Program } from "./main/ProgramExpansion";
import { GalleryStack } from "@/types/types";


{/** Program data */}
export const programs: Program[] = [
  {
    title: "Infant Care",
    description: "A warm and nurturing space where babies feel safe, loved, and cared for. We support early development through gentle routines, sensory play, and attentive one-on-one care.",
    image: "/images/kids-learning.jpg",
  },
  {
    title: "Toddler Program",
    description: "A fun and supportive environment where toddlers explore, play, and build confidence. Through guided activities and social interaction, we help children develop independence, communication skills, and early learning habits.",
    image: "/images/kids-teacher-6.jpg",
  },
  {
    title: "Preschool",
    description: "A playful learning environment that prepares children for school. We focus on early literacy, creativity, and social skills through engaging activities that build confidence and curiosity.",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "After School",
    description: "A safe and welcoming space for children after school. We offer supervised play, homework support, and fun activities that help children relax, learn, and connect with friends.",
    image: "/images/kids-playing-2.jpg",
  },
  {
    title: "Early Learning Activities",
    description: "Daily activities designed to spark curiosity and creativity. Through storytelling, music, art, and hands-on play, children explore new ideas while building early learning skills in a fun and supportive environment.",
    image: "/images/kids-teacher-1.jpg",
  },
  {
    title: "Celebrations & Special Days",
    description: "Throughout the year, we celebrate holidays, birthdays, and special moments with fun themed activities. These events create joyful memories and give children opportunities to learn, share, and celebrate together.",
    image: "/images/kids-celebrate.jpg",
  }
];


{/** Gallery data */}
export const galleryData: GalleryStack[] = [
  {
    title: "Learning & Play",
    images: ["/images/kids-learning.jpg", "/images/kids-playing-1.jpg", "/images/kids-teacher-1.jpg"],
  },
  {
    title: "Daily Smiles",
    images: ["/images/kids-teacher-3.jpg", "/images/kid-playing.jpg"],
  },
  {
    title: "Teacher Moments",
    images: ["/images/kid-smile-2.jpg", "/images/teacher-play.jpg", "/images/kids-teacher-2.jpg"],
  },
];


{/** Video data */}
export const videos = [
  "/vids/daycare-2.mp4",
  "/vids/daycare-3.mp4",
  "/vids/daycare-2.mp4",
  "/vids/daycare-3.mp4",
];


export const aboutData = [
  {
    stepTitle: "01. The People",
    title: "Our Caring Team",
    headline: "A Personal and Nurturing Environment",
    content: "Our daycare is a licensed family child care program led by an experienced educator who is dedicated to providing a safe, caring, and supportive environment for every child. Because we keep our group small, each child receives personal attention, guidance, and encouragement throughout their day.",
    image: "/images/teach-illus-1.jpg",
  },
  {
    stepTitle: "02. Licensing & Qualifications",
    title: "Licensed by the State of Massachusetts",
    headline: "Licensed by the State of Massachusetts",
    content: "We are a fully licensed Family Child Care program regulated by the Massachusetts Department of Early Education and Care (EEC). Our program follows state guidelines designed to ensure children receive safe, healthy, and high-quality early education and care.",
    image: "/images/kids-learning.jpg",
  },
  {
    stepTitle: "03. Safety & Care Standards",
    title: "Safety & Daily Care Standards",
    headline: "Committed to Safe, Quality Child Care",
    content: "Our program follows EEC standards for health, safety, and early learning. We maintain approved child capacity limits, structured daily routines, and a safe learning environment where children can play, grow, and thrive.",
    image: "/images/place-1.jpg",
  }
];
