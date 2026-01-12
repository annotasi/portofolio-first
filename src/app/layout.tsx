import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/ui/AudioPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Singgih Pratama | Backend Developer & Product Engineer",
  description: "Building scalable middleware and modern backend systems. Enterprise middleware by day, SaaS products by passion.",
  keywords: ["backend developer", "portfolio", "java spring", "microservices", "kafka", "product engineer"],
  openGraph: {
    title: "Singgih Pratama | Backend Developer & Product Engineer",
    description: "Building scalable middleware and modern backend systems. Enterprise middleware by day, SaaS products by passion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        {/* Ambient Audio Player - persists across routes */}
        <AudioPlayer />
      </body>
    </html>
  );
}
