import { Manrope, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "./smooth-scroll";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
