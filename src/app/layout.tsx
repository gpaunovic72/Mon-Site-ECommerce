import type { Metadata } from "next";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
export const metadata: Metadata = {
  title: "Mon Site E-Commerce",
  description: "Mini site d'e-commerce pour une boutique en ligne",
};

const deleteHydratationWarning = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        suppressHydrationWarning={deleteHydratationWarning}
        className="min-h-screen flex flex-col"
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
