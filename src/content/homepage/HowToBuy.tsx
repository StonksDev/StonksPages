import Image from "next/image";
import ContentContainer from "../../components/ContentContainer";
import ContentTextContainer from "../../components/ContentTextContainer";
import SectionHeading from "../../components/SectionHeading";
import ContentHeading from "../../components/ContentHeading";
import ContentImageContainer from "../../components/ContentImageContainer";
import Section from "../../components/Section";
import { Link } from "../../components/Link";

export default function HowToBuy() {
  return (
    <Section id="how-to-buy" variant="dark">
      <ContentContainer>
        <ContentTextContainer>
          <SectionHeading>How to buy</SectionHeading>
          <ContentHeading className="text-xl">1. Create a wallet</ContentHeading>
          <p>
            Download{" "}
            <Link href="https://phantom.app/">
              Phantom
            </Link>{" "}
            for mobile (
            <Link href="https://apps.apple.com/us/app/phantom-crypto-wallet/id1598432977">
              App Store
            </Link>,{" "}
            <Link href="https://play.google.com/store/apps/details?id=app.phantom">
              Google Play
            </Link>
            ) or as a <Link href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?hl=en">Chrome extension</Link>.
          </p>
          <ContentHeading className="text-xl">2. Get SOL</ContentHeading>
          <p>
            Buy SOL directly in Phantom or transfer from an exchange.<br />You need gas to transact.
          </p>
          <ContentHeading className="text-xl">3. Buy $STNK</ContentHeading>
          <p>
            Go to{" "}
            <Link href={`https://jup.ag/swap/SOL-STNK`}>
              Jupiter
            </Link>{" "}
            and swap SOL for $STNK.
          </p>
          <ContentHeading className="text-xl">4. Wrap to $STONKS</ContentHeading>
          <p>
            Use the{" "}
            <Link href="/stonksplit">
              stonksplit
            </Link>{" "}
            to wrap your $STNK into $STONKS.<br />Now you own the real thing.
          </p>
        </ContentTextContainer>
        <ContentImageContainer className="max-w-[480px]">
          <Image
            src="/images/teajor.webp"
            alt="Stonks guy as a teacher writing on a whiteboard"
            width={512}
            height={317}
            loading="lazy"
          />
        </ContentImageContainer>
      </ContentContainer>
    </Section>
  );
}
