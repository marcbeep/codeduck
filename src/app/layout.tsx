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
  title: "Data Structures and Algorithms Flashcards",
  description: "A tool to help you study data structures and algorithms",
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
