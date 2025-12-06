import Image from "next/image";

export default function About() {
  return (
    <section id="abuot">
      <div className="content-container">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="section-heading">Abuot</h2>
          <p>
            The stonks meme is an ancient meme,{" "}
            <a
              href="https://knowyourmeme.com/memes/stonks"
              target="_blank"
              rel="noopener noreferrer"
            >
              originating in 2017
            </a>
            , starring the enigmatic{" "}
            <a
              href="https://knowyourmeme.com/memes/meme-man"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meme Man
            </a>
            . His birth on the Solana blockchain was initially overlooked by
            most - until now.
          </p>
          <p>
            The community has revived $STNK coin to reclaim its rightful place
            amongst blue chip memes as the first memecoin ever created on
            Solana.{" "}
            <a
              href="https://raydium.io/liquidity/increase/?mode=add&pool_id=EyktEFod1gAgsuM1hXmEpqkitFFk9XczkqLPx2vKiceg"
              target="_blank"
              rel="noopener noreferrer"
            >
              LP locked
            </a>
            , no presale, contract renounced, $STNK is for the real stonk
            investors.
          </p>
          <h3 className="mt-2 text-[1.56rem] font-semibold">Don trus, vryfi</h3>
          <p>
            The Stonks coin ($STNK) contract was created on the{" "}
            <a
              href="https://solscan.io/tx/2NcXezaNUZrfhJW53aoEbejCFNYu7x1krAC1tPFzjL6oyYzcP4ovXsdYyJTCWHiK1baR32zM7DEpmMGWgcx8L8PD"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solana blockchain April 2, 2021
            </a>
            .
          </p>
          <p>
            Contract address:{" "}
            <a
              href="https://solscan.io/token/43VWkd99HjqkhFTZbWBpMpRhjG469nWa7x7uEsgSH7We"
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>43VWkd99HjqkhFTZbWBpMpRhjG469nWa7x7uEsgSH7We</code>
            </a>
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center max-w-[480px] mx-auto md:order-first">
          <Image
            src="/images/detektiv.webp"
            alt="Stonks guy inspecting a laptop with binoculars"
            width={480}
            height={480}
          />
        </div>
      </div>
    </section>
  );
}
