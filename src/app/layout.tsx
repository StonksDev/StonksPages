import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Providers } from "@/components/Providers";
import {
  SITE_NAME,
  BASE_URL,
  DEFAULT_TITLE,
  TITLE_TEMPLATE,
  DESCRIPTION,
  OG_IMAGE,
  THEME_COLOR,
} from "@/lib/site-config";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: DESCRIPTION,
  keywords: ["STNK", "Stonks", "Solana", "Memecoin", "Crypto", "Cryptocurrency", "Blockchain", "Provenance", "Web3"],
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: {
      default: DEFAULT_TITLE,
      template: TITLE_TEMPLATE,
    },
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: DEFAULT_TITLE,
      template: TITLE_TEMPLATE,
    },
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico", sizes: "any" },
      { url: "/images/favicon/favicon-32x32.png", type: "image/png" },
      { url: "/images/favicon/favicon-16x16.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} font-sans`}>
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-QJCKP3MSZ0" />}
      </body>
    </html>
  );
}
