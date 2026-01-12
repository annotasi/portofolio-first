import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Singgih Pratama | Creative Developer",
  description: "Bridging design and engineering. Building digital experiences that matter.",
  keywords: ["creative developer", "portfolio", "frontend", "web development", "design"],
  openGraph: {
    title: "Singgih Pratama | Creative Developer",
    description: "Bridging design and engineering. Building digital experiences that matter.",
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
      </body>
    </html>
  );
}
