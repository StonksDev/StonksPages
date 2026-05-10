import Image from "next/image";
import Section from "../../components/Section";
import ContentContainer from "../../components/ContentContainer";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import { Link } from "../../components/Link";

const CONTRIBUTE_CARDS = [
  {
    id: "socials",
    title: "Teh Trenches",
    platform: "Community",
    description: (
      <>
        <Link href="https://x.com/STONKS_SOL">X</Link> is the frontline.{" "}
        <Link href="https://t.me/StonksSOLMemecoin">Telegram</Link> is the
        command center.{" "}
        <Link href="https://stocktwits.com/stonks">StockTwits</Link> is where
        we break the algorithm.
      </>
    ),
    cta: "Follow on X",
    href: "https://x.com/STONKS_SOL",
    icon: "/images/icons/kontribut.webp",
  },
  {
    id: "gtr",
    title: "Voluum = Burnz",
    platform: "GTR Trade",
    description: (
      <>
        Trade on GTR and join the STONKS Clan. Volume drives direct $STNK buybacks
        and shrinks the supply. Clan XP grants airdrops and early access. {" "}
        <Link href="https://apps.apple.com/us/app/gtr-trade/id6698866243">
          Apple App Store
        </Link>
        {" · "}
        <Link href="https://play.google.com/store/apps/details?id=com.dev_getrabbit.getrabbitapp&hl=en">
          Google Play Store
        </Link>
      </>
    ),
    cta: "Join the STONKS Clan",
    href: "https://gtr.trade/?ref=STONKS",
    icon: "/images/icons/gtr.jpg",
  },
  {
    id: "memecom",
    title: "Kwantified Konviction",
    platform: "Meme.com",
    description:
      "Meme.com quantifies conviction. Link your wallet for a 2x multiplier. Dominate the prediction markets to capture the global leaderboards. Visibility is liquidity.",
    cta: "Start Farming",
    href: "https://meme.com/coin/stonks-4",
    icon: "/images/icons/meme-com.webp",
  },
  {
    id: "locker",
    title: "The $1B Vault",
    platform: "Stonks Locker",
    description:
      "16% of the supply (~91k $STNK) is vaulted. The Stonks Locker is absolute. Assets are locked until $1B market cap. Incentives are aligned.",
    cta: "View the Stonks Locker",
    href: "https://locker.stonkscoin.org/",
    icon: "/images/icons/stonkslocker-dense.png",
  },
];

export default function Contribute() {
  return (
    <Section id="kontribut">
      <ContentContainer className="flex-col! gap-12">
        <div className="text-center w-full">
          <SectionHeading className="mx-auto">Kontribut</SectionHeading>
          <p>
            Contribution is leverage. These are the operational vectors to force the ticker.
          </p>
        </div>
        <div className="w-full mb-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CONTRIBUTE_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-5 duration-300"
              >
                <div className="flex items-start gap-4">
                    <Image
                      src={card.icon}
                      alt={`${card.platform} icon`}
                      width={80}
                      height={80}
                      className="w-20 object-contain shrink-0 self-start"
                    />
                  <div className="flex-1 min-w-0 shrink-0">
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                      {card.platform}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                      {card.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed grow">
                  {card.description}
                </p>

                <Button
                  href={card.href}
                  external
                  variant="outline"
                  size="default"
                  className="w-full"
                >
                  {card.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center w-full">
          <p className="text-sm text-gray-600">
            More ways to contribute:{" "}
            <Link href="https://t.me/addstickers/StonksSolana" className="whitespace-nowrap">
              Stonks Telegram sticker pack
            </Link>
            {" · "}
              <Link href="https://memedepot.com/d/stonks" className="whitespace-nowrap">Stonks Meme Depot</Link>
            {" · "}
            <Link href="https://civitai.com/models/1007602/stonks" className="whitespace-nowrap">Stonks AI Meme Model</Link>
          </p>
        </div>
      </ContentContainer>
    </Section>
  );
}
