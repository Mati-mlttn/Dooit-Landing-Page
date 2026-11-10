import { Manrope, Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { headers } from "next/headers";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "./smooth-scroll";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-dooit-locale") === "es" ? "es" : "en";

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {/* Fixed blur along the top edge (full width, always visible) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-40 h-12 backdrop-blur-[8px] [mask-image:linear-gradient(black,transparent)]"
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
