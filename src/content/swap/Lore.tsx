import ContentTextContainer from "../../components/ContentTextContainer";
import ContentContainer from "../../components/ContentContainer";
import SectionHeading from "../../components/SectionHeading";
import Section from "../../components/Section";
import Button from "../../components/Button";
import ContentImageContainer from "../../components/ContentImageContainer";
import Image from "next/image";
import { Link } from "../../components/Link";

export default function Lore() {
    return (
        <>
            <Section variant="dark">
                <ContentContainer>
                    <SectionHeading noArrow className="mx-auto text-center mb-0 md:-my-5 font-bold text-stroke text-[clamp(2.5rem,12vw,3rem)]">THERE IS NO SECOND FIRST</SectionHeading>
                </ContentContainer>
            </Section>

            <Section id="relic">
                <ContentContainer>
                    <ContentImageContainer className="max-w-[440px]">
                        <Image
                            src="/images/stonks.webp"
                            alt="Original Stonks meme"
                            width={1000}
                            height={750}
                        />
                    </ContentImageContainer>
                    <ContentTextContainer>
                        <SectionHeading as="h3">I. THE RELIK</SectionHeading>
                        <p>
                            April 2, 2021. <Link href="https://solscan.io/tx/2NcXezaNUZrfhJW53aoEbejCFNYu7x1krAC1tPFzjL6oyYzcP4ovXsdYyJTCWHiK1baR32zM7DEpmMGWgcx8L8PD">Block 71935764</Link>. Before the dogs and the hats. $STNK manifested as the <strong>First Memecoin on Solana</strong>.
                        </p>
                        <p>The parameters were simple: 1,000,000 supply. Zero inflation. But the distribution was inefficient. To qualify for an allocation, all you had to do was paste a wallet address into Discord.</p>
                        <p>The result was inevitable. Recipients incinerated over 41% of the supply just to scrape back pennies in SOL state rent.</p>
                        <p>That&apos;s how you know this thing is a fucking relic.</p>
                    </ContentTextContainer>
                </ContentContainer>
            </Section>

            <Section id="takeover" variant="dark">
                <ContentContainer>
                    <ContentTextContainer>
                        <SectionHeading as="h3">II. THE TAKEOVER</SectionHeading>
                        <p>
                            November 23, 2024. While the market was chasing rotations, a member of the Big Brain Collective was conducting <Link href="https://x.com/kaiynne/status/1864223343169462348">onchain archaeology</Link>. He unearthed the original, unpriced $STNK.
                        </p>
                        <p>Vital signs were faint: a humiliating <strong>$16k market cap</strong> and dust for liquidity.</p>
                        <p>But the block height was irrefutable.</p>
                        <p>
                            We secured the float, the code, and the narrative. We <Link href="https://raydium.io/liquidity/increase/?mode=add&pool_id=EyktEFod1gAgsuM1hXmEpqkitFFk9XczkqLPx2vKiceg">locked the liquidity</Link>. Then we sealed the provenance by securing <Link href="https://x.com/STONKS_SOL/status/1861174453159268421">full IP rights onchain</Link>.
                        </p>
                    </ContentTextContainer>
                    <ContentImageContainer className="max-w-[440px]">
                        <Image
                            src="/images/copirights.jpeg"
                            alt="The Takeover"
                            width={1000}
                            height={750}
                        />
                    </ContentImageContainer>
                </ContentContainer>
            </Section>

            <Section id="split">
                <ContentContainer>
                    <ContentTextContainer className="mx-auto sm:max-w-[75%] lg  :max-w-[50%]">
                        <SectionHeading as="h3" className="">III. STONKSPLIT</SectionHeading>
                        <p>
                            The 580-something thousand supply? It’s a bottleneck; a relic of an era that didn&apos;t understand Solana&apos;s velocity. To capture the supercycle, we need to reset the board.
                        </p>
                        <Image
                            src="/images/ultra-stonks.png"
                            alt="Ultra mega ultimate powered fucking Stonks"
                            width={735}
                            height={540}
                            className="mx-auto my-5 w-[90%] h-auto max-w-[480]"
                        />
                        <p className="font-bold text-xl">
                        $STNK ⇄ $STONKS
                        </p>
                        <p>
                            The Stonksplit is a <strong>two-way 1:17,190 bridge</strong> that scales the 2021 provenance to a 10 billion supply. The origin is preserved. The unit bias is resolved.
                        </p>
                        <p>
                            The First Memecoin on Solana is finally scaled to eat the world.
                        </p>
                        <p><strong>There is no second first.</strong></p>
                        <div className="flex flex-wrap gap-4 my-7 justify-center md:justify-start">
                            <Button variant="outline" size="large" href="#swap">$STNK ⇄ $STONKS</Button>
                            <Button variant="tertiary" size="large" href="https://jup.ag/swap/SOL-STNK" external>Buy $STNK</Button>
                        </div>
                    </ContentTextContainer>
                </ContentContainer>
            </Section>
        </>
    );
}
