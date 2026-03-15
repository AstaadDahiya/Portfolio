import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryan.dev"),
  title: "Aryan — AI/ML Engineer & Full-Stack Developer",
  description:
    "Electronic engineering student specializing in AI/ML and full-stack development. Building AI-powered products that scale.",
  keywords: [
    "AI/ML Engineer",
    "Full-Stack Developer",
    "Next.js",
    "Python",
    "TensorFlow",
    "Portfolio",
  ],
  authors: [{ name: "Aryan" }],
  openGraph: {
    title: "Aryan — AI/ML Engineer & Full-Stack Developer",
    description:
      "Electronic engineering student specializing in AI/ML and full-stack development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan — AI/ML Engineer & Full-Stack Developer",
    description:
      "Electronic engineering student specializing in AI/ML and full-stack development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
