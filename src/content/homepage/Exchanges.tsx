import Image from "next/image";
import Section from "../../components/Section";
import ContentContainer from "../../components/ContentContainer";
import Button from "../../components/Button";

const exchanges = [
  {
    name: "CoinMarketCap",
    url: "https://coinmarketcap.com/currencies/stonks/",
    icon: "/images/icons/coinmarketcap.avif",
  },
  {
    name: "CoinGecko",
    url: "https://www.coingecko.com/en/coins/stonks",
    icon: "/images/icons/coingecko.webp",
  },
  {
    name: "DEXScreener",
    url: "https://dexscreener.com/solana/eyktefod1gagsum1hxmepqkitffk9xczkqlpx2vkiceg",
    icon: "/images/icons/dexscreener.webp",
  },
  {
    name: "Birdeye",
    url: "https://birdeye.so/solana/token/43VWkd99HjqkhFTZbWBpMpRhjG469nWa7x7uEsgSH7We",
    icon: "/images/icons/birdeye.webp",
  },
  {
    name: "Moonshot",
    url: "https://moonshot.money/pnAdupsrO3lQARxKF9wAB5BM?",
    icon: "/images/icons/moonshot.webp",
  },
  {
    name: "Jupiter",
    url: "https://jup.ag/swap/SOL-STNK",
    icon: "/images/icons/jupiter.webp",
  },
  {
    name: "Raydium",
    url: "https://raydium.io/swap/?inputCurrency=43vwkd99hjqkhftzbwbpmprhjg469nwa7x7uesgsh7we&outputCurrency=so11111111111111111111111111111111111111112&inputMint=sol&outputMint=43VWkd99HjqkhFTZbWBpMpRhjG469nWa7x7uEsgSH7We",
    icon: "/images/icons/raydium.webp",
  }
];

export default function Exchanges() {
  return (
    <Section>
      <ContentContainer className="py-0">
        <ul className="m-0 mx-auto w-full max-w-[720px] p-0 list-none flex flex-wrap justify-center gap-4">
          {exchanges.map((exchange) => (
            <li key={exchange.name} className="w-full min-[400px]:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]">
              <Button
                href={exchange.url}
                variant="outline"
                size="small"
                external
                className="w-full gap-2 uppercase"
              >
                <Image
                  src={exchange.icon}
                  alt={`${exchange.name} logo`}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span>{exchange.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </ContentContainer>
    </Section>
  );
}
