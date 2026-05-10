import Page from "@/components/Page";
import StickyNavigation from "@/components/StickyNavigation";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Hero from "@/content/swap/Hero";
import Swap from "@/content/swap/Swap";
import Lore from "@/content/swap/Lore";
import ConsoleEasterEgg from "@/content/homepage/ConsoleEasterEgg";

const TITLE = "Stonksplit | Bridge $STNK ⇄ $STONKS (1:17,190)";
const DESCRIPTION =
    "The official Stonks bridge. Wrap the 2021 relic ($STNK) into the liquid supply ($STONKS). A fully reversible 1:17,190 link that preserves onchain provenance.";
const OG_IMAGE = "/images/og-stonksplit.png";
const URL = "https://stonkscoin.org/stonksplit";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        type: "website",
        url: URL,
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

export default function SwapPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Stonksplit Bridge",
        "url": URL,
        "description":
            "The official bridge for wrapping and unwrapping $STNK and $STONKS tokens at a 1:17,190 ratio.",
        "mainEntity": {
            "@type": "Action",
            "name": "Asset Wrapper",
            "target": URL,
        },
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
            <Swap />
            <Lore />
            <Footer />
        </Page>
    );
}
