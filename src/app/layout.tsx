import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mon Site E-Commerce",
  description: "Mini site d'e-commerce pour une boutique en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
