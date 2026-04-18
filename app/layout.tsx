import type { Metadata } from "next";
import { Sora, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["300", "400", "500", "600", "700"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400", "500", "600"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "CryptoIndex.live — The Intelligence Layer for Serious Crypto",
  description: "AI-powered fundamental scoring for the infrastructure projects building the future of finance.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${jetbrains.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}