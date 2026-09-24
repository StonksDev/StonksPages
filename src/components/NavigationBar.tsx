"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import ContentContainer from "./ContentContainer";
import Button from "./Button";
import { ConnectWallet } from "./ConnectWallet";

interface Props {
    variant?: "default" | "sticky";
}

const NAV_LINKS: {
    href: string;
    label: string;
    title: string;
    icon: string;
    external: boolean;
}[] = [
    {
        href: "/ip",
        label: "IP",
        title: "Stonks intellectual property",
        icon: "/images/icons/ip.png",
        external: false,
    },
    {
        href: "https://locker.stonkscoin.org",
        label: "Locker",
        title: "Lock or view locked stonks",
        icon: "/images/icons/stonkslocker.png",
        external: true,
    }
];

export default function NavigationBar({ variant = "default" }: Props) {
    const pathname = usePathname();
    const isSticky = variant === "sticky";
    const isStonksplitPage = pathname.includes("/stonksplit");

    return (
        <nav>
            <ContentContainer
                className={cn(
                    "flex-row items-center gap-0 py-0 relative z-1",
                    isStonksplitPage && "flex-col sm:flex-row",
                    isSticky && "min-h-16 md:min-h-20"
                )}
            >
                <Link
                    href="/"
                    className={cn(
                        "flex flex-row items-center justify-center pr-2 no-underline min-h-20 gap-3",
                        isStonksplitPage && "w-full sm:w-auto"
                    )}
                >
                    <Image
                        src="/images/logo.webp"
                        alt="Stonks guy's floating head"
                        width={48}
                        height={48}
                        className="w-12"
                    />
                    <span className="text-white text-stroke-sm text-h4 font-extrabold drop-shadow-glow-sm">
                        STONKS
                    </span>
                </Link>


                <ol className={cn(
                    "m-0 -mr-2 ml-auto pl-0 list-none flex flex-row flex-wrap justify-center gap-0 items-center md:gap-4",
                    isStonksplitPage && "sm:ml-auto w-full sm:w-auto"
                )}>
                    {NAV_LINKS.map((link) => {
                        const normalizedPathname = pathname.replace(/\/$/, '');
                        const normalizedHref = link.href.replace(/\/$/, '');
                        const isActive = !link.external && normalizedPathname === normalizedHref;
                        return (
                        <li key={link.label}>
                            <Button
                                href={link.href}
                                title={link.title}
                                variant="borderless"
                                external={link.external}
                                className="gap-3 p-2"
                            >
                                <Image
                                    src={link.icon}
                                    alt={`${link.label} icon`}
                                    width={40}
                                    height={40}
                                    className="nav-icon-glow w-10 h-10 shrink-0 rounded-full object-cover"
                                    priority
                                />
                                <span className={cn(
                                    "hidden md:block uppercase font-semibold border-b-2 border-transparent",
                                    isActive && "border-secondary"
                                )}>
                                    {link.label}
                                </span>
                            </Button>
                        </li>
                        );
                    })}
                    {
                        pathname.includes("/stonksplit") && (
                            <li>
                                <ConnectWallet />
                            </li>
                        )
                    }
                </ol>
            </ContentContainer>
        </nav>
    );
}
