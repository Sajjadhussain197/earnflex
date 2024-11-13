import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WebTechDev",
  description: "A web app to list user, basically this is just to test the ability of frontend developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <div className="flex min-h-screen">
          <SideBar />
          
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
