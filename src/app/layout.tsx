import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arya Vishal | Cloud Engineer & Infrastructure Specialist",
  description: "Portfolio of Arya Vishal, a Cloud Engineer specializing in high-availability infrastructure, 24x7 mission-critical systems, and smart meter data management. Based in Ahmedabad, Gujarat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-50 relative min-h-screen`}
      >
        <div className="mesh-gradient fixed inset-0" />
        <div className="grid-overlay fixed inset-0 opacity-40" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
