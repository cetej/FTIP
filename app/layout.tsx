import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FTIP \u2014 Humor Generator",
  description: "Gener\u00E1tor vtip\u016F na b\u00E1zi Benign Violation Theory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans font-medium">{children}</body>
    </html>
  );
}
