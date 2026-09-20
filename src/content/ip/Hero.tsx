import NavigationBar from "../../components/NavigationBar";
import Button from "../../components/Button";
import ContentContainer from "../../components/ContentContainer";

export default function Hero() {
  return (
    <header className="bg-primary bg-stock-header text-white pb-32 md:pb-28">
      <NavigationBar />

      <section>
        <ContentContainer className="gap-0 py-10 md:py-16 md:flex-col items-center text-center">
          <h1 className="text-stroke text-[clamp(3.25rem,8vw,5rem)] font-bold leading-tight">
            STONKS IP
          </h1>
          <h2 className="text-xl md:text-2xl leading-8 font-semibold mt-4">
            The original 2017 Stonks meme. We own it.
          </h2>

          <div className="flex flex-row flex-wrap gap-5 my-8 justify-center">
            <Button href="#teh-meme" variant="outline-white" size="large">
              Teh meme
            </Button>
            <Button href="#contact" variant="tertiary" size="large">
              Use the IP
            </Button>
          </div>
        </ContentContainer>
      </section>
    </header>
  );
}
