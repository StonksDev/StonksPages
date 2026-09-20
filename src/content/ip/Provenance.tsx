import Image from "next/image";
import Section from "../../components/Section";
import ContentContainer from "../../components/ContentContainer";
import ContentTextContainer from "../../components/ContentTextContainer";
import SectionHeading from "../../components/SectionHeading";
import ContentImageContainer from "../../components/ContentImageContainer";
import { Link } from "../../components/Link";

const ORIGINAL_TOKEN_ADDRESS = "43VWkd99HjqkhFTZbWBpMpRhjG469nWa7x7uEsgSH7We";

export default function Provenance() {
  return (
    <Section id="teh-meme">
      <ContentContainer>
        <ContentTextContainer>
          <SectionHeading>Teh meme</SectionHeading>
          <p>
            The original Stonks meme went up on June 5, 2017. Digital artist{" "}
            <Link href="https://knowyourmeme.com/memes/stonks">Henry Hooper</Link>{" "}
            posted it on Special Meme Fresh: Meme Man in a suit, orange arrow,
            misspelled caption. That picture is the IP.
          </p>
          <p>
            It started as a surreal Facebook shitpost. Then WallStreetBets
            grabbed it, GameStop happened, Google Trends hit 100, and Fortnite
            shipped a Stonks skin.{" "}
            <Link href="https://www.merriam-webster.com/slang/stonks">
              Merriam-Webster
            </Link>{" "}
            and Dictionary.com both put the word in the books. Now it is just
            how people talk about markets.
          </p>
          <p>
            Rights moved Hooper to Youtooz to DankBank to the $STNK community.{" "}
            <Link href="https://knowyourmeme.com/memes/stonks">
              Know Your Meme
            </Link>{" "}
            authenticated the creator. We{" "}
            <Link href="https://x.com/STONKS_SOL/status/1861174453159268421">
              put the title onchain
            </Link>.
          </p>
        </ContentTextContainer>
        <ContentImageContainer className="max-w-[520px]">
          <div className="relative w-full">
            <Image
              src="/images/stonks.webp"
              alt="The original Stonks meme: Meme Man in a suit before a rising stock chart"
              width={1000}
              height={750}
              className="w-full h-auto"
              loading="lazy"
            />
            <Image
              src="/images/copirights.jpeg"
              alt="Certificate of Registration of Stonks intellectual property"
              width={1024}
              height={1024}
              className="absolute bottom-3 left-3 w-[32%] max-w-[160px] h-auto -rotate-6 rounded-md shadow-[0_12px_28px_rgba(0,0,0,0.28)] ring-1 ring-black/10"
              loading="lazy"
            />
          </div>
        </ContentImageContainer>
      </ContentContainer>
    </Section>
  );
}
