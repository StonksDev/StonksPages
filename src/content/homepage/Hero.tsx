import Image from "next/image";
import NavigationBar from "../../components/NavigationBar";
import Button from "../../components/Button";
import ContentContainer from "../../components/ContentContainer";

const SOCIAL_LINKS = [
  {
    href: "https://t.me/StonksSOLMemecoin",
    label: "Telegram",
    title: "Join the Telegram channel",
    src: "/images/icons/telegram.webp",
    alt: "Telegram logo",
  },
  {
    href: "https://x.com/STONKS_SOL",
    label: "X",
    title: "Follow us on X",
    src: "/images/icons/x.webp",
    alt: "X logo",
  },
];

export default function Hero() {
  return (
    <header className="bg-primary bg-stock-header text-white pb-10 md:pb-[140px]">
      <NavigationBar />

      <section className="text-center md:text-left">
        <ContentContainer className="gap-0 py-0 items-center justify-center">
          <div className="pt-5 flex-1 flex flex-col gap-6 items-center md:items-start">
            <h1 className="text-stroke text-[clamp(4rem,7vw,5rem)] font-bold leading-tight">
              STONKS
            </h1>
            <h2 className="text-xl leading-8 font-semibold">
              The first memecoin on Solana
              <br />
              $STNK anchors $STONKS
            </h2>

            <div className="flex flex-row flex-wrap gap-5 my-5 justify-center md:justify-start">
              <Button
                href="/stonksplit"
                variant="outline-white"
                size="large">
                $STNK ⇄ $STONKS
              </Button>
              <Button
                href="https://jup.ag/swap/SOL-STNK"
                external
                variant="tertiary"
                size="large"
              >
                Buy $STNK
              </Button>
            </div>

            <ul className="m-0 p-0 list-none flex items-center justify-center md:justify-start gap-4">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.title}
                    className="block w-12 h-12 rounded-full overflow-hidden hover:outline-2 hover:outline-secondary"
                  >
                    <Image
                      src={link.src}
                      alt={link.alt}
                      width={48}
                      height={48}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex-1 ml-auto mr-auto scale-110 pointer-events-none">
            <Image
              src="/images/arrow.webp"
              alt="Large arrow pointing up and to the right"
              width={229}
              height={257}
              className="animate-rotate-arrow w-full h-auto origin-center will-change-transform absolute -right-[60px] -rotate-6"
              priority
            />
            <Image
              src="/images/stonksguy.webp"
              alt="Stonksguy in a business suit standing with his arms crossed"
              width={633}
              height={633}
              className="relative md:-scale-x-100 z-1"
              priority
            />
          </div>
        </ContentContainer>
      </section>
    </header>
  );
}
