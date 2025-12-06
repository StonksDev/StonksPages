import Image from "next/image";

const exchanges = [
  {
    name: "Bitget",
    url: "https://www.bitget.com/spot/STNKUSDT",
    icon: "/images/icons/bitget.webp",
  },
  {
    name: "KuCoin",
    url: "https://www.kucoin.com/trade/STNK-USDT",
    icon: "/images/icons/kucoin.svg",
  },
  {
    name: "MEXC",
    url: "https://www.mexc.com/exchange/STNK_USDT",
    icon: "/images/icons/mexc.webp",
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
  },
];

export default function Exchanges() {
  return (
    <section className="shadow-[0_-2px_2px_var(--color-background)] md:-mt-5">
      <div className="content-container !py-0">
        <ul className="m-0 mx-auto max-w-[640px] p-0 list-none flex flex-row gap-4 flex-wrap justify-center">
          {exchanges.map((exchange) => (
            <li key={exchange.name}>
              <a
                href={exchange.url}
                target="_blank"
                rel="noopener noreferrer"
                className="exchange-link"
              >
                <span>{exchange.name}</span>
                <Image
                  src={exchange.icon}
                  alt={`${exchange.name} logo`}
                  width={24}
                  height={24}
                  className="!w-6 !h-6"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
