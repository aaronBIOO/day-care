"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.001, // Lower value = smoother/slower scroll
        duration: 1.0,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
