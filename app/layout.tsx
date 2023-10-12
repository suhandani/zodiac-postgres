import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zodiac PostgreSQL Database",
  description: "Soal Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
