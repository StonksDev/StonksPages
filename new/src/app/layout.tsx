import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Stonks ($STNK) | First memecoin on Solana | Official Stonks token",
  description:
    "Stonks ($STNK) is the first memecoin on Solana. Official token with full IP rights to the Stonks meme, community owned with locked liquidity.",
  metadataBase: new URL("https://stonkscoin.org"),
  openGraph: {
    type: "website",
    url: "https://stonkscoin.org",
    title: "Stonks ($STNK) | First memecoin on Solana | There is no second first.",
    description:
      "The first memecoin on Solana. Official token with full IP rights to the Stonks meme, community owned with locked liquidity.",
    images: ["/images/social-preview.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stonks ($STNK) | First memecoin on Solana | There is no second first.",
    description:
      "The first memecoin on Solana. Official token with full IP rights to the Stonks meme, community owned with locked liquidity.",
    images: ["/images/social-preview.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico" },
      { url: "/images/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/images/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
