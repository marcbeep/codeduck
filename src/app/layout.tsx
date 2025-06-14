import type { Metadata } from "next";
import { Outfit, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeetCode Flashcards - Master Coding Interviews",
  description:
    "Practice coding interview problems with interactive flashcards. Study algorithms, data structures, and problem-solving techniques with LeetCode-style questions.",
  keywords:
    "leetcode, coding interview, algorithms, data structures, programming, flashcards, practice, interview prep",
  authors: [
    { name: "Marc Beepath", url: "https://marc.tt" },
    { name: "Daniel Diaz", url: "https://github.com/Daniel-04" },
    { name: "Haowen Rong", url: "https://github.com/HaowenRong" },
  ],
  openGraph: {
    title: "LeetCode Flashcards - Master Coding Interviews",
    description:
      "Practice coding interview problems with interactive flashcards. Study algorithms and data structures efficiently.",
    type: "website",
    siteName: "LeetCode Flashcards",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "LeetCode Flashcards - Coding Interview Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeetCode Flashcards - Master Coding Interviews",
    description:
      "Practice coding interview problems with interactive flashcards.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${outfit.variable} ${notoSansMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
