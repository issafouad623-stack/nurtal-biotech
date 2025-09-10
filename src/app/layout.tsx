import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nurtal Biotechnologies News - Latest AI & Biotechnology Insights",
  description: "Your premier source for cutting-edge biotechnology and AI news. Stay informed with the latest breakthroughs, research, and innovations in the biotech sector.",
  keywords: "biotechnology, AI, news, startup, research, innovation, science, Nurtal Biotechnologies",
  authors: [{ name: "Nurtal Biotechnologies News Team" }],
  openGraph: {
    title: "Nurtal Biotechnologies News - Latest AI & Biotechnology Insights",
    description: "Your premier source for cutting-edge biotechnology and AI news.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nurtal Biotechnologies News - Latest AI & Biotechnology Insights",
    description: "Your premier source for cutting-edge biotechnology and AI news.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased bg-black text-white min-h-screen`}
        style={{ backgroundColor: '#000000', color: '#ffffff' }}
      >
        {children}
      </body>
    </html>
  );
}
