import Page from "@/components/Page";
import StickyNavigation from "@/components/StickyNavigation";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Hero from "@/content/ip/Hero";
import Provenance from "@/content/ip/Provenance";
import ForWho from "@/content/ip/ForWho";
import FaqSection from "@/content/ip/Faq";
import Contact from "@/content/ip/Contact";
import ConsoleEasterEgg from "@/content/homepage/ConsoleEasterEgg";
import { FAQ_ITEMS } from "@/content/ip/faq-items";
import { BASE_URL, OG_IMAGE, SITE_NAME } from "@/lib/site-config";

const TITLE = "Stonks IP | License the Original Stonks Meme";
const DESCRIPTION =
  "Henry Hooper made the original Stonks meme in 2017. The $STNK community owns it. First memecoin on Solana. License the image for web3.";
const URL = `${BASE_URL}/ip`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Stonks meme",
    "Stonks IP",
    "Stonks meme origin",
    "stonks meme history",
    "stonks copyright owner",
    "license Stonks meme",
    "is stonks public domain",
    "who created stonks",
    "meme man",
    "Henry Hooper",
    "Stonks copyright",
    "what does stonks mean",
    "first memecoin on Solana",
    "STNK",
    "STONKS",
    "web3",
    "commercial rights",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    type: "website",
    url: URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function IpPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${URL}/#webpage`,
        url: URL,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: {
          "@id": `${BASE_URL}/#organization`,
        },
        about: {
          "@id": `${URL}/#artwork`,
        },
      },
      {
        "@type": "VisualArtwork",
        "@id": `${URL}/#artwork`,
        name: "Stonks",
        alternateName: ["Meme Man Stonks", "Original Stonks Meme"],
        creator: {
          "@type": "Person",
          name: "Henry Hooper",
        },
        dateCreated: "2017-06-05",
        artform: "Digital Art",
        artMedium: "3D Render",
        description:
          "The original 2017 Stonks meme by Henry Hooper: Meme Man in a suit in front of a rising stock chart. The $STNK community holds the commercial rights.",
        copyrightHolder: {
          "@type": "Organization",
          name: SITE_NAME,
          url: BASE_URL,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <Page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ConsoleEasterEgg />
      <StickyNavigation />
      <Hero />
      <Provenance />
      <ForWho />
      <FaqSection />
      <Contact />
      <Footer />
    </Page>
  );
}
