import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dodo Cursos Dashboard",
  description: "Create by Dodo",
};

export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</div>;
}
