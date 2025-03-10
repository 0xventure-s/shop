import type { Metadata } from "next";

import "./globals.css";
import { geistMono, geistSans, tittleFont } from "../config/font";
import { Provider } from "@/components/provider/Provider";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo Shop",
    default: "Home - Teslo Shop",
  },
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} ${tittleFont.className} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
