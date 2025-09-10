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
  metadataBase: new URL("https://studiodaivikah.com"),

  // Add basic meta tags
  keywords: "studio, portfolio, design, creative",
  authors: [{ name: "Studio Daivikah" }],

  openGraph: {
    title: "Studio Daivikah",
    description: "Studio Daivikah Portfolio",
    url: "https://studiodaivikah.com",
    siteName: "Studio Daivikah",
    images: [
      {
        url: "/images/preview.png",
        width: 1200,
        height: 630,
        alt: "Studio Daivikah Portfolio Preview",
        type: "image/png", // Add this
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Studio Daivikah",
    description: "Studio Daivikah Portfolio",
    images: ["/images/preview.png"],
  },

  // Add additional meta properties
  other: {
    image: "/images/preview.png",
    "og:image:secure_url": "https://studiodaivikah.com/images/preview.png",
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
