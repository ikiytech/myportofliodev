import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Muhammad Rifki - Junior SysAdmin & Web Developer",
  description:
    "Berpengalaman dalam VPS & AWS deployment, Linux server setup, web app hosting, dan pengembangan aplikasi web menggunakan PHP dan MySQL.",
  openGraph: {
    title: "Muhammad Rifki - Junior SysAdmin & Web Developer",
    description:
      "Berpengalaman dalam VPS & AWS deployment, Linux server setup, dan pengembangan aplikasi web PHP & MySQL.",
    images: ["https://avatars.githubusercontent.com/u/60310528?v=4"],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

import BootLoader from "@/components/BootLoader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased bg-charcoal-950 text-charcoal-50">
        <BootLoader />
        {children}
      </body>
    </html>
  );
}
