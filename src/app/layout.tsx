import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matt Edmundson",
  description: "Single page website",
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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
