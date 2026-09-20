import Image from "next/image";
import Section from "../../components/Section";
import ContentContainer from "../../components/ContentContainer";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import { TELEGRAM_URL } from "@/lib/site-config";

export default function Contact() {
  return (
    <Section id="contact">
      <ContentContainer className="md:flex-col items-center text-center pt-6 md:pt-8">
        <p className="max-w-[560px]">
          Want the original Stonks meme for your token, dapp, or community?
        </p>
        <Button
          href={TELEGRAM_URL}
          external
          variant="outline"
          size="large"
          className="gap-3"
        >
          <Image
            src="/images/icons/telegram.webp"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7"
          />
          <span>Reach out on Telegram</span>
        </Button>
      </ContentContainer>
    </Section>
  );
}
