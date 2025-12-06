import Header from "@/components/Header";
import StickyHeader from "@/components/StickyHeader";
import Exchanges from "@/components/Exchanges";
import About from "@/components/About";
import HowToBuy from "@/components/HowToBuy";
import Roadmap from "@/components/Roadmap";
import IPSection from "@/components/IPSection";
import Contribute from "@/components/Contribute";
import Footer from "@/components/Footer";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-hidden">
      <ConsoleEasterEgg />
      <StickyHeader />
      <Header />
      <Exchanges />
      <About />
      <HowToBuy />
      <Roadmap />
      <IPSection />
      <Contribute />
      <Footer />
    </main>
  );
}
