import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Florería Silvestre",
  description: "Arreglos florales únicos — Florería Silvestre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cormorant.variable}>
      <body>{children}</body>
    </html>
  );
}
