import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Zak Edmundson Nutritionist | IBS Specialist | Low FODMAP Diet",
  description: "Nutrition consultant specialising in IBS and the low FODMAP diet. Get practical support to understand your triggers, expand your diet, and enjoy eating again.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://img.youtube.com" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
