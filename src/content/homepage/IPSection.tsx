import Image from "next/image";
import Section from "../../components/Section";
import ContentContainer from "../../components/ContentContainer";
import ContentTextContainer from "../../components/ContentTextContainer";
import SectionHeading from "../../components/SectionHeading";
import ContentImageContainer from "../../components/ContentImageContainer";
import { Link } from "../../components/Link";

export default function IPSection() {
  return (
    <Section id="intlektual-propert" variant="dark">
      <ContentContainer>
        <ContentTextContainer>
          <SectionHeading>Intlektual propert</SectionHeading>
          <p>
            Stonks is the owner of the full onchain IP rights to the original
            Stonks meme, created by Henry Hooper. This means that $STONKS is the
            only project that has the copyright license to use and tokenise the
            meme.
          </p>
          <p>
            As the rightful owner, We have
            also secured the coveted &apos;Stonks&apos; handle on Stocktwits:{" "}
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
            Not only is $STNK the first memecoin ever deployed on Solana, it
            also has the provenance of being supported by the original meme (and
            artist) that inspired it. Community-owned STONKS!
          </p>
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
