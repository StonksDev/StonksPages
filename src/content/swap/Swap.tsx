'use client';

import ContentTextContainer from "../../components/ContentTextContainer";
import ContentContainer from "../../components/ContentContainer";
import SectionHeading from "../../components/SectionHeading";
import Section from "../../components/Section";
import { cn } from "@/lib/cn";
import { shortenAddress } from "@/lib/shorten-address";
import { Link } from "@/components/Link";
import { SwapForm } from "@/components/forms/SwapForm";

const TABLE_DATA = [
    { label: "ERA", stnk: "April 2021", stonks: "Jan 2026" },
    { label: 'RATIO', stnk: '1', stonks: "17,190" },
    { label: "SUPPLY", stnk: "581,918*", stonks: "10,002,674,891**" },
    {
        label: "IP",
        stnk: "Grey Market",
        stonks: (
            <Link
                href="https://opensea.io/item/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/18661172622810850372796117433098046466540407174306911208368628814753287897089"
            >
                Onchain
            </Link>
        )
    },
    {
        label: "CA",
        stnk: (
            <Link
                href="https://solscan.io/token/43VWkd99HjqkhFTZbWBpMpRhjG469nWa7x7uEsgSH7We"
            >
                43VW...H7We
            </Link>
        ),
        stonks: (
            <Link
                href={`https://solscan.io/token/${process.env.NEXT_PUBLIC_WRAPPER_TOKEN_ADDRESS!}`}
            >
                {shortenAddress(process.env.NEXT_PUBLIC_WRAPPER_TOKEN_ADDRESS!, 8, 4)}
            </Link>
        ),
        className: "font-mono text-base",
    },
];

export default function Swap() {
    return (
        <Section id="swap">
            <ContentContainer className="flex-col! lg:flex-row!">
                <ContentTextContainer className="w-full lg:w-auto">
                    <SectionHeading>$STNK ⇄ $STONKS</SectionHeading>
                    <p>The Stonksplit is a seamless 1:17,190 bridge that scales the 2021 provenance to a 10 billion supply, allowing you to wrap and unwrap the historical origin into a scalable asset built for global liquidity.</p>
                    <div className="overflow-x-auto mt-6">
                        <table className="w-full text-left border-collapse min-w-[300px]">
                            <thead>
                                <tr className="border-b-2 border-primary/10">
                                    <th className="p-3"></th>
                                    <th className="p-3 font-bold text-lg">$STNK</th>
                                    <th className="p-3 font-bold text-lg">$STONKS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/10">
                                {TABLE_DATA.map((row) => (
                                    <tr key={row.label}>
                                        <td className="p-3 font-semibold text-black/60">{row.label}</td>
                                        <td className={cn("p-3", row.className)}>{row.stnk}</td>
                                        <td className={cn("p-3 font-semibold", row.className)}>{row.stonks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 space-y-1">
                        <small className="block text-black/60 text-xs">* Max supply based on CoinGecko (Jan 31, 2025)</small>
                        <small className="block text-black/60 text-xs">** Max supply assuming 100% of $STNK is wrapped</small>
                    </div>
                </ContentTextContainer>
                <div className="w-full max-w-[500px] mx-auto pt-5 lg:pt-15 overflow-hidden p-3 -m-3">
                    <SwapForm />
                </div>
            </ContentContainer>
        </Section>
    );
}
