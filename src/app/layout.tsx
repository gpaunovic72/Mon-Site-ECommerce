import { defaultMetadata } from "@/lib/metadata/defaultMetadata";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

export const metadata = defaultMetadata;

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
