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
  metadataBase: new URL("https://code.marc.tt"),
  title: "CodeDuck - Programming Interview Flashcards",
  description:
    "Practice coding interview problems with interactive flashcards. Study algorithms, data structures, and problem-solving techniques with programming interview questions.",
  keywords:
    "codeduck, coding interview, algorithms, data structures, programming, flashcards, practice, interview prep, leetcode",
  authors: [
    { name: "Marc Beepath", url: "https://marc.tt" },
    { name: "Daniel Diaz", url: "https://github.com/Daniel-04" },
    { name: "Haowen Rong", url: "https://github.com/HaowenRong" },
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "CodeDuck - Programming Interview Flashcards",
    description:
      "Practice coding interview problems with interactive flashcards. Study algorithms and data structures efficiently.",
    type: "website",
    siteName: "CodeDuck",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CodeDuck - Programming Interview Flashcards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeDuck - Programming Interview Flashcards",
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
