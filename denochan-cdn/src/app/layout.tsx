import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const url = process.env.SITE_URL || "https://www.ame-x.net";
const icon = "favicon.png";
const siteName = "Denochan CDN";
const description = `Denochan CDN | ${siteName}`;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: `${siteName}`,
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
    images: icon,
  },
  icons: icon,
  verification: {
    google: "",
  },
  publisher: `@EdamAme-x`,
  robots: "index, follow",
  creator: `@EdamAme-x`,
  keywords: ["Denochan CDN", siteName],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
