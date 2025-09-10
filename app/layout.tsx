import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Daivikah",
  description: "Studio Daivikah Portfolio",
  metadataBase: new URL('https://studiodaivikah.com'),
  openGraph: {
    title: "Studio Daivikah",
    description: "Studio Daivikah Portfolio",
    url: "https://studiodaivikah.com",
    siteName: "Studio Daivikah",
    images: [
      {
        url: "https://studiodaivikah.com/preview.png",
        width: 1200,
        height: 630,
        alt: "Studio Daivikah Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
          {children}
        </main>
      </body>
    </html>
  );
}
