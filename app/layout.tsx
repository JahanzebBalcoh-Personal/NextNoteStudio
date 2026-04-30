import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NextNote Studio | Create · Record · Inspire",
  description: "Multan's Premier Music Studio. Offering top-tier song recording, production, mixing, mastering, and instrument lessons.",
};

import GuitarCursor from "./components/GuitarCursor";

import SmoothScroll from "./components/SmoothScroll";

import Preloader from "./components/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${montserrat.variable} bg-primary text-body font-sans antialiased overflow-x-hidden selection:bg-gold selection:text-black`}
      >
        <Preloader />
        <SmoothScroll>
          <GuitarCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
