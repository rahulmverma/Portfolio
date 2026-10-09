import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahul Verma — AI Engineer",
  description:
    "Portfolio of Rahul Verma, an AI Engineer and Full Stack Developer building reliable AI-powered products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
