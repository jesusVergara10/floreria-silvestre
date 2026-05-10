import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const garamond = localFont({
  src: "../public/fonts/EBGaramond-VariableFont_wght.ttf",
  variable: "--font-garamond",
  style: "normal",
});

const frauncesLightItalic = localFont({
  src: "../public/fonts/Fraunces_72pt-LightItalic.ttf",
  variable: "--font-fraunces-light-italic",
  style: "italic",
  weight: "300",
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
    <html lang="es" className={`${garamond.variable} ${frauncesLightItalic.variable}`}>
      <body className={garamond.className}>{children}</body>
    </html>
  );
}
