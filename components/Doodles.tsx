import React from "react";

interface DoodleProps {
  className?: string;
  color?: string;
}

export const StarDoodle = ({ className, color = "currentColor" }: DoodleProps) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="4"
    strokeLinecap="round"
  >
    <path d="M50 10L61 38H91L67 56L76 84L50 67L24 84L33 56L9 38H39L50 10Z" />
  </svg>
);

export const CloudDoodle = ({ className, color = "currentColor" }: DoodleProps) => (
  <svg
    viewBox="0 0 100 60"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="4"
    strokeLinecap="round"
  >
    <path d="M20 40C20 30 30 20 45 20C55 20 65 25 70 35C80 35 90 40 90 50C90 55 85 60 75 60H25C15 60 10 55 10 45C10 40 15 35 20 40Z" />
  </svg>
);

export const SwirlDoodle = ({ className, color = "currentColor" }: DoodleProps) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="4"
    strokeLinecap="round"
  >
    <path d="M20 50C20 30 40 20 60 30C80 40 80 60 60 70C40 80 20 70 20 50C20 35 35 25 50 25C65 25 75 35 75 50" />
  </svg>
);

export const ConnectedBubbles = ({ className, color = "#10b981" }: DoodleProps) => (
  <svg
    viewBox="0 0 300 150"
    className={className}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="75" cy="75" r="75" />
    <circle cx="150" cy="75" r="75" />
    <circle cx="225" cy="75" r="75" />
    <path d="M75,75 L225,75" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" fill="none" className="text-black/20" />
    {/* Swirl on top */}
    <path d="M120,40 Q150,110 180,40" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

export const ScallopedCircle = ({ className, color = "#3b82f6" }: DoodleProps) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M50 0C53.7 0 57.2 2.6 60 5.6C62.8 8.6 65.3 12.3 69.1 14C72.9 15.7 77.6 15.1 81 17.7C84.4 20.3 86.4 24.1 88.5 27.6C90.6 31.1 94.6 34.3 95.7 38.2C96.8 42.1 94.8 46.5 94.8 50.5C94.8 54.5 96.8 58.9 95.7 62.8C94.6 66.7 90.6 69.9 88.5 73.4C86.4 76.9 84.4 80.7 81 83.3C77.6 85.9 72.9 85.3 69.1 87C65.3 88.7 62.8 92.4 60 95.4C57.2 98.4 53.7 101 50 101C46.3 101 42.8 98.4 40 95.4C37.2 92.4 34.7 88.7 30.9 87C27.1 85.3 22.4 85.9 19 83.3C15.6 80.7 13.6 76.9 11.5 73.4C9.4 69.9 5.4 66.7 4.3 62.8C3.2 58.9 5.2 54.5 5.2 50.5C5.2 46.5 3.2 42.1 4.3 38.2C5.4 34.3 9.4 31.1 11.5 27.6C13.6 24.1 15.6 20.3 19 17.7C22.4 15.1 27.1 15.7 30.9 14C34.7 12.3 37.2 8.6 40 5.6C42.8 2.6 46.3 0 50 0Z" />
  </svg>
);

export const LeafShape = ({ className, color = "white" }: DoodleProps) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0,100 Q0,0 100,0 Q100,100 0,100" />
  </svg>
);

export const OrganicBlob = ({ className, color = "#FF0066" }: DoodleProps) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21.8,-32.8C31.3,-23.1,44.2,-20.8,51.9,-13.1C59.6,-5.4,62,7.8,56.5,16.4C51,25,37.5,29.1,26.8,26.1C16,23.2,8,13.3,-4,18.8C-16.1,24.4,-32.2,45.4,-41.3,47.8C-50.4,50.2,-52.5,34,-50.9,20.8C-49.3,7.6,-44,-2.5,-42.7,-16.2C-41.5,-29.9,-44.1,-47.2,-37.7,-57.8C-31.2,-68.4,-15.6,-72.4,-4.7,-65.9C6.1,-59.4,12.3,-42.4,21.8,-32.8Z" transform="translate(100 100)" />
  </svg>
);

export const HandDrawnArrow = ({ className, color = "black" }: DoodleProps) => (
  <svg
    viewBox="0 0 200 120"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Wiggly line with loop */}
    <path d="M20,25 Q50,10 60,60 Q70,110 90,80 Q110,50 130,80 Q140,100 170,90" />
    {/* Arrow head */}
    <path d="M165,75 L185,90 L160,110 Q165,95 165,75" fill={color} />
    {/* Hatching in arrow head */}
    <path d="M168,82 L175,88 M168,90 L178,95 M165,98 L170,102" stroke="white" strokeWidth="1" opacity="0.5" />
  </svg>
);

export const CurlyDoodle = ({ className, color = "black" }: DoodleProps) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M30,90 Q20,50 50,40 Q80,30 70,10 Q60,0 55,20 Q50,40 70,50 Q90,60 70,80" />
  </svg>
);

export const SlantedLinesDoodle = ({ className, color = "black" }: DoodleProps) => (
  <svg
    viewBox="0 0 60 40"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="4"
    strokeLinecap="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10,30 L25,10 M25,30 L40,10 M40,30 L55,10" />
  </svg>
);
