import Hero from "@/content/homepage/Hero";
import StickyNavigation from "@/components/StickyNavigation";
import Exchanges from "@/content/homepage/Exchanges";
import About from "@/content/homepage/About";
import HowToBuy from "@/content/homepage/HowToBuy";
import Roadmap from "@/content/homepage/Roadmap";
import IPSection from "@/content/homepage/IPSection";
import Contribute from "@/content/homepage/Contribute";
import Footer from "@/components/Footer";
import ConsoleEasterEgg from "@/content/homepage/ConsoleEasterEgg";
import Page from "@/components/Page";

const ORG_NAME = "Stonks";
const ORG_ALTERNATE_NAME = "$STONKS";
const ORG_URL = "https://stonkscoin.org";
const ORG_LOGO = "https://stonkscoin.org/images/logo.webp";
const ORG_FOUNDING_DATE = "2021-04-02";
const ORG_SAME_AS = [
  "https://twitter.com/STONKS_SOL",
  "https://t.me/StonksSOLMemecoin",
  "https://www.tiktok.com/@mrsuccstonks",
  "https://reddit.com/r/stonks_meme",
  "https://stocktwits.com/stonks",
];
const ORG_DESCRIPTION =
  "The first memecoin on Solana. Community owned with locked liquidity and fully onchain IP rights.";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": ORG_NAME,
    "alternateName": ORG_ALTERNATE_NAME,
    "url": ORG_URL,
    "logo": ORG_LOGO,
    "foundingDate": ORG_FOUNDING_DATE,
    "sameAs": ORG_SAME_AS,
    "description": ORG_DESCRIPTION,
  };

  return (
    <Page className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ConsoleEasterEgg />
      <StickyNavigation />
      <Hero />
      <Exchanges />
      <About />
      <HowToBuy />
      <Roadmap />
      <IPSection />
      <Contribute />
      <Footer />
    </Page>
  );
}
