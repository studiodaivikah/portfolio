import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/navbar";

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Daivikah",
  description: "Studio Daivikah Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <main className="flex-center flex-col max-w-[2800px] w-full">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
