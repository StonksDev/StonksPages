import Image from "next/image";
import Section from "./Section";
import ContentContainer from "./ContentContainer";
import Button from "./Button";

const SOCIAL_LINKS = [
    {
        href: "https://t.me/StonksSOLMemecoin",
        label: "Join Telegram",
        title: "Join the Telegram channel",
        src: "/images/icons/telegram.webp",
        alt: "Telegram logo",
    },
    {
        href: "https://x.com/STONKS_SOL",
        label: "Follow on X",
        title: "Follow us on X",
        src: "/images/icons/x.webp",
        alt: "X logo",
    },
];

export default function Footer() {
    return (
        <Section variant="dark">
            <ContentContainer className="md:flex-col items-center text-center gap-3">
                <Image
                    src="/images/logo.webp"
                    alt="Stonks guy's floating head"
                    width={56}
                    height={56}
                    loading="lazy"
                />

                <ul className="m-0 p-0 list-none flex items-center justify-center">
                    {SOCIAL_LINKS.map((link) => (
                        <li key={link.href}>
                            <Button
                                href={link.href}
                                title={link.title}
                                variant="borderless"
                                size="small"
                                external
                                className="gap-2"
                            >
                                <Image
                                    src={link.src}
                                    alt={link.alt}
                                    width={20}
                                    height={20}
                                    className="w-6 h-6"
                                />
                                <span>{link.label}</span>
                            </Button>
                        </li>
                    ))}
                </ul>

                <small className="max-w-[720px]">
                    $STNK and $STONKS are memecoins with no intrinsic value or expectation
                    of financial return. There is no formal team or roadmap. The coins are
                    completely useless and for entertainment purposes only.
                </small>
        </ContentContainer>
      </Section>
    );
  }
