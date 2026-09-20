import Section from "../../components/Section";
import ContentContainer from "../../components/ContentContainer";
import SectionHeading from "../../components/SectionHeading";
import Faq from "../../components/Faq";
import { FAQ_ITEMS } from "./faq-items";

export default function FaqSection() {
  return (
    <Section id="faq">
      <ContentContainer className="md:flex-col items-center pb-4 md:pb-6">
        <SectionHeading className="mx-auto">Frenquently askt</SectionHeading>
        <Faq items={FAQ_ITEMS} className="w-full max-w-[720px]" />
      </ContentContainer>
    </Section>
  );
}
