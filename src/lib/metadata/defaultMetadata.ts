import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: "Mon Site E-Commerce",
  description: "Mini site d'e-commerce pour une boutique en ligne",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monsite.com",
    siteName: "Mon Site E-Commerce",
  },
  twitter: {
    card: "summary_large_image",
  },
};
