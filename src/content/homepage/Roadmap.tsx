import Image from "next/image";
import Section from "../../components/Section";
import ContentContainer from "../../components/ContentContainer";
import ContentTextContainer from "../../components/ContentTextContainer";
import SectionHeading from "../../components/SectionHeading";
import ContentImageContainer from "../../components/ContentImageContainer";

export default function Roadmap() {
  return (
    <Section id="roadmop">
      <ContentContainer className="md:flex-col items-center gap-8">
        <ContentTextContainer>
          <SectionHeading>Roadmop</SectionHeading>
        </ContentTextContainer>
        <ContentImageContainer className="max-w-[640px] w-full md:w-full">
          <Image
            src="/images/stillfirstson.webp"
            alt="Still first meme"
            width={1226}
            height={684}
            loading="lazy"
          />
        </ContentImageContainer>
      </ContentContainer>
    </Section>
  );
}
