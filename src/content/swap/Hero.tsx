import { getImageProps } from "next/image";
import NavigationBar from "../../components/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import { cn } from "@/lib/cn";

export default function Hero() {
    const common = {
        alt: "Stonksguy standing next to an old laptop with lots of little stonksguys being dispersed",
        priority: true,
        className: "relative pointer-events-none scale-265 md:scale-200 -top-5 md:-top-15"
    };

    const {
        props: { srcSet: desktop },
    } = getImageProps({
        ...common,
        width: 8016,
        height: 2500,
        src: "/images/swap-hero.webp",
    });

    const {
        props: { ...mobile },
    } = getImageProps({
        ...common,
        width: 2000,
        height: 624,
        src: "/images/swap-hero-sm.webp",
    });

    return (
        <header className="bg-primary bg-stock-header text-white pb-40 overflow-x-hidden">
            <NavigationBar />
            <ContentContainer className="gap-0 items-center justify-center md:flex-col pt-10">
                <h1 className="text-stroke text-[clamp(2.5rem,12vw,4.5rem)] font-bold">
                    STONKSPLIT
                </h1>
                <h2 className="text-2xl md:text-3xl pb-7 font-mono text-center">1 $STNK ⇄ 17,190 $STONKS</h2>
                <picture className="w-full">
                    <source media="(min-width: 768px)" srcSet={desktop} />
                    <img
                        {...mobile}
                        className={cn(
                            mobile.className,
                            "w-full h-auto aspect-2000/624"
                        )}
                        alt="Stonksguy standing next to an old laptop with lots of little stonksguys being dispersed"
                    />
                </picture>
            </ContentContainer>
        </header>
    );
}
