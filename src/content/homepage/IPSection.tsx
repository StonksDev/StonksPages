import Image from "next/image";
import Section from "../../components/Section";
import ContentContainer from "../../components/ContentContainer";
import ContentTextContainer from "../../components/ContentTextContainer";
import SectionHeading from "../../components/SectionHeading";
import ContentImageContainer from "../../components/ContentImageContainer";
import Button from "../../components/Button";
import { Link } from "../../components/Link";

export default function IPSection() {
  return (
    <Section id="intlektual-propert" variant="dark">
      <ContentContainer>
        <ContentTextContainer>
          <SectionHeading>Intlektual propert</SectionHeading>
          <p>
            Stonks is the owner of the full onchain IP rights to the original
            Stonks meme, created by Henry Hooper. The image that went from a
            2017 Facebook shitpost to the face of retail finance. $STONKS is
            the only project with the copyright license to use and tokenise
            the meme.
          </p>
          <p>
            We also grabbed the Stonks handle on Stocktwits:{" "}
            <Link href="https://stocktwits.com/stonks">
              stocktwits.com/stonks
            </Link>
            .
          </p>
          <p>
            We would like to thank{" "}
            <Link href="https://x.com/DankBankHQ">@DankBankHQ</Link>, the
            previous owners to the rights, who have also provided us with a
            number of Stonks figurines! We are grateful for their continued
            support.
          </p>
          <p>
            $STNK is the first memecoin ever deployed on Solana, and it comes
            with the original meme (and artist) that inspired it.
            Community-owned STONKS!
          </p>
          <div className="flex flex-wrap gap-4 my-3">
            <Button href="/ip" variant="outline-white" size="large">
              More on the IP
            </Button>
          </div>
        </ContentTextContainer>
        <ContentImageContainer className="max-w-[420px]">
          <Image
            src="/images/copirights.jpeg"
            alt="Certificate of Registration of Stonks"
            width={1024}
            height={1024}
            loading="lazy"
          />
        </ContentImageContainer>
      </ContentContainer>
    </Section>
  );
}
