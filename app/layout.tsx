import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/general/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Helena Street Child Care",
  description: "A warm, licensed family child care program in Leominster, MA. Nurturing every child's growth through play, learning, and personal care.",
  openGraph: {
    title: "Helena Street Child Care",
    description: "A warm, licensed family child care program in Leominster, MA. Nurturing every child's growth through play, learning, and personal care.",
    url: "https://day-care-alpha.vercel.app",
    siteName: "Helena Street Child Care",
    images: [
      {
        url: "/open-graph.png",
        width: 1200,
        height: 630,
        alt: "Helena Street Child Care",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helena Street Child Care",
    description: "A warm, licensed family child care program in Leominster, MA.",
    images: ["/open-graph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
