import { Program } from "./main/ProgramExpansion";
import { GalleryStack } from "@/types/types";


{/** Program data */}
export const programs: Program[] = [
  {
    title: "Infant Care",
    description: "A nurturing environment focused on sensory exploration...",
    image: "/images/kids-learning.jpg",
    badge: "0-18 MONTHS"
  },
  {
    title: "Toddler Program",
    description: "Encouraging independence and social skills through...",
    image: "/images/kids-teacher-6.jpg",
  },
  {
    title: "Preschool",
    description: "Preparing children for school with a focus on literacy...",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=800&auto=format&fit=crop",
    badge: "READY FOR SCHOOL"
  },
  {
    title: "After School",
    description: "Fun and educational activities that provide a...",
    image: "/images/kids-playing-2.jpg",
  },
  {
    title: "Summer Camp",
    description: "Seasonal adventures, outdoor play, and special workshops to keep...",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Special Events",
    description: "Themed parties, holiday celebrations, and...",
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