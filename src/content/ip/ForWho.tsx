import Section from "../../components/Section";
import ContentContainer from "../../components/ContentContainer";
import SectionHeading from "../../components/SectionHeading";
import ContentHeading from "../../components/ContentHeading";

const AUDIENCES = [
  {
    title: "Tokens",
    body: "The original picture on your ticker, site, and docs.",
  },
  {
    title: "Dapps",
    body: "Wallets, dashboards, and games that want Meme Man on the product.",
  },
  {
    title: "Communities",
    body: "NFTs and cultures built around the original meme.",
  },
];

export default function ForWho() {
  return (
    <Section id="who-its-for" variant="dark">
      <ContentContainer className="flex-col! items-center text-center gap-8! md:gap-10! py-12! md:py-16!">
        <div className="max-w-[560px]">
          <SectionHeading className="mx-auto">Who its for</SectionHeading>
          <p>
            Web3 projects. Tokens, dapps, games, NFTs, communities. 
            <br />You get
            the real image, the meme, and the references.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-8 w-full max-w-[900px] text-center sm:text-left">
          {AUDIENCES.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <ContentHeading className="text-xl mt-0 mb-0">{item.title}</ContentHeading>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
        <p className="max-w-[560px]">
          Personal memes are free. Commercial onchain use, come talk.
        </p>
      </ContentContainer>
    </Section>
  );
}
