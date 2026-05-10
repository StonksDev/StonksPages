import Image from "next/image";
import ContentTextContainer from "../../components/ContentTextContainer";
import ContentContainer from "../../components/ContentContainer";
import ContentImageContainer from "../../components/ContentImageContainer";
import SectionHeading from "../../components/SectionHeading";
import ContentHeading from "../../components/ContentHeading";
import Section from "../../components/Section";
import { Link } from "../../components/Link";
import { shortenAddress } from "../../lib/shorten-address";

const ORIGINAL_TOKEN_ADDRESS = "43VWkd99HjqkhFTZbWBpMpRhjG469nWa7x7uEsgSH7We";
const WRAPPER_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_WRAPPER_TOKEN_ADDRESS || "";

export default function About() {
  return (
    <Section id="abuot">
      <ContentContainer>
        <ContentTextContainer>
          <SectionHeading>Abuot</SectionHeading>
          <p>
            The stonks meme is an ancient meme,{" "}
            <Link href="https://knowyourmeme.com/memes/stonks">
              originating in 2017
            </Link>
            , starring the enigmatic{" "}
            <Link href="https://knowyourmeme.com/memes/meme-man">Meme Man</Link>
            . His birth on the Solana blockchain was initially overlooked by
            most - until now.
          </p>
          <p>
            In November 2024, <Link href="https://x.com/STONKS_SOL/status/1860765137680159089">the community revived $STNK</Link> to reclaim its rightful place
            amongst blue chip memes as the first memecoin ever created on
            Solana.{" "}
            <Link href="https://raydium.io/liquidity/increase/?mode=add&pool_id=EyktEFod1gAgsuM1hXmEpqkitFFk9XczkqLPx2vKiceg">
              LP locked
            </Link>
            , no presale, contract renounced. Stonks is for the real stonk
            investors.
          </p>
          <ContentHeading>Don trus, veryfi.</ContentHeading>
          <p>Don&apos;t just trust the narrative, verify the timestamps yourself.</p>
          <p>
            <strong>Original $STNK</strong> deployed {" "}
            <Link href="https://solscan.io/tx/2NcXezaNUZrfhJW53aoEbejCFNYu7x1krAC1tPFzjL6oyYzcP4ovXsdYyJTCWHiK1baR32zM7DEpmMGWgcx8L8PD">
              April 2, 2021
            </Link>
            <br />
            CA:{" "}
            <Link
              href={`https://solscan.io/token/${ORIGINAL_TOKEN_ADDRESS}`}
              className="no-underline"
            >
              <code>
                <span className="hidden min-[560px]:inline min-[768px]:hidden min-[1080px]:inline">{ORIGINAL_TOKEN_ADDRESS}</span>
                <span className="inline min-[560px]:hidden min-[768px]:inline min-[1080px]:hidden">{shortenAddress(ORIGINAL_TOKEN_ADDRESS, 6, 6)}</span>
              </code>
            </Link>
          </p>
          <p>
            <strong>Upgraded $STONKS</strong> deployed {" "}
            <Link href="https://solscan.io/tx/4rnKLn6x3mKuV2n8nrgHaaVdcQbVZrW1q7FCAGsQxnsejpCG3d3w8YS9taDK32wcHsjHG84NC18KqcWS1eb1jBoV">
              November 23, 2025
            </Link>
            <br />
            CA:{" "}
            <Link
              href={`https://solscan.io/token/${WRAPPER_TOKEN_ADDRESS}`}
              className="no-underline"
            >
              <code>
                <span className="hidden min-[560px]:inline min-[768px]:hidden min-[1080px]:inline">{WRAPPER_TOKEN_ADDRESS}</span>
                <span className="inline min-[560px]:hidden min-[768px]:inline min-[1080px]:hidden">{shortenAddress(WRAPPER_TOKEN_ADDRESS, 6, 6)}</span>
              </code>
            </Link>
          </p>
        </ContentTextContainer>
        <ContentImageContainer className="max-w-[480px] md:order-first">
          <Image
            src="/images/detektiv.webp"
            alt="Stonks guy inspecting a laptop with binoculars"
            width={752}
            height={473}
          />
        </ContentImageContainer>
      </ContentContainer>
    </Section>
  );
}
