import { Geist, Geist_Mono, Inter } from "next/font/google";

export const geistSans = Geist({
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const tittleFont = Inter({
  subsets: ["latin"],
  weight: ["100", "500", "700"],
});
