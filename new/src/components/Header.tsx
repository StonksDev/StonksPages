import Image from "next/image";

export default function Header() {
  return (
    <header className="stock-bg-header text-white pb-10 md:pb-[140px]">
      {/* Navigation */}
      <nav>
        <div className="content-container !flex-row !gap-0 !py-0">
          <a
            href="/"
            className="flex items-center justify-center pr-2 no-underline min-h-[80px]"
          >
            <Image
              src="/images/logo.webp"
              alt="Stonks guy's floating head"
              width={48}
              height={48}
              className="w-12 -ml-2 mr-1.5"
            />
            <span className="text-stroke-sm text-white text-[1.56rem] font-extrabold">
              STONKS
            </span>
          </a>
          <ol className="m-0 ml-auto -mr-2 p-0 list-none flex flex-row flex-wrap justify-center items-center gap-0 md:gap-2">
            <li>
              <a
                href="https://t.me/StonksSOLMemecoin"
                className="flex items-center justify-center gap-3 text-white no-underline p-2 hover:text-[--color-secondary] hover:outline hover:outline-2 hover:outline-[--color-secondary]"
                target="_blank"
                rel="noopener noreferrer"
                title="Join the Telegram channel"
              >
                <Image
                  src="/images/icons/telegram.webp"
                  alt="Telegram logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full md:w-7 md:h-7"
                />
                <span className="hidden md:block">Telegram</span>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/STONKS_SOL"
                className="flex items-center justify-center gap-3 text-white no-underline p-2 hover:text-[--color-secondary] hover:outline hover:outline-2 hover:outline-[--color-secondary]"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on X (Twitter)"
              >
                <Image
                  src="/images/icons/x.webp"
                  alt="X (Twitter) logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full md:w-7 md:h-7"
                />
                <span className="hidden md:block">X/Twitter</span>
              </a>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center md:text-left">
        <div className="content-container !gap-0 !py-0 items-center justify-center">
          <div className="pt-10 md:pt-0 flex-1 flex flex-col gap-6 items-center md:items-start">
            <h1 className="text-stroke text-white text-[clamp(4rem,10vw,5rem)] font-bold leading-tight">
              stonks
            </h1>
            <h2 className="text-[1.25rem] font-semibold leading-tight">
              Stonks ($STNK) is the first memecoin on Solana.
              <br />
              There is no second first.
            </h2>
            <a
              href="https://jup.ag/swap/SOL-STNK"
              target="_blank"
              rel="noopener noreferrer"
              className="buy-button my-4"
            >
              Buy $STNK
            </a>
            <ul className="m-0 p-0 list-none flex items-center justify-center md:justify-start gap-4">
              <li>
                <a
                  href="https://coinmarketcap.com/currencies/stonks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on CoinMarketCap"
                  className="block w-12 h-12 rounded-full overflow-hidden hover:outline hover:outline-2 hover:outline-[--color-secondary]"
                >
                  <Image
                    src="/images/icons/coinmarketcap.avif"
                    alt="CoinMarketCap logo"
                    width={48}
                    height={48}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.coingecko.com/en/coins/stonks"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on CoinGecko"
                  className="block w-12 h-12 rounded-full overflow-hidden hover:outline hover:outline-2 hover:outline-[--color-secondary]"
                >
                  <Image
                    src="/images/icons/coingecko.webp"
                    alt="CoinGecko logo"
                    width={48}
                    height={48}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://dexscreener.com/solana/eyktefod1gagsum1hxmepqkitffk9xczkqlpx2vkiceg"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on DEXScreener"
                  className="block w-12 h-12 rounded-full overflow-hidden hover:outline hover:outline-2 hover:outline-[--color-secondary]"
                >
                  <Image
                    src="/images/icons/dexscreener.webp"
                    alt="DEXScreener logo"
                    width={48}
                    height={48}
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="relative flex-1 ml-auto mr-auto scale-110 pointer-events-none">
            <Image
              src="/images/arrow.webp"
              alt="Large arrow pointing up and to the right"
              width={200}
              height={200}
              className="animate-arrow absolute -right-[60px] scale-[0.66] -rotate-6"
            />
            <Image
              src="/images/stonksguy.webp"
              alt="Stonksguy in a business suit standing with his arms crossed"
              width={400}
              height={400}
              className="relative md:-scale-x-100"
              priority
            />
          </div>
        </div>
      </section>
    </header>
  );
}
