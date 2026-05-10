"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link } from "../../components/Link";

interface RedirectProps {
    to: string;
}

export default function Redirect({ to }: RedirectProps) {
    const router = useRouter();

    useEffect(() => {
        router.replace(to);
    }, [router, to]);

    return (
        <>
            <noscript>
                <meta httpEquiv="refresh" content={`0; url=${to}`} />
            </noscript>
            <div className="flex h-screen w-screen items-center justify-center text-center font-['Comic_Sans_MS','Chalkboard_SE','Marker_Felt',sans-serif]">
                <p className="text-2xl font-bold">
                    Reedirektin u... If no go,{" "}
                    <Link href={to} className="text-primary underline">
                        klik dis
                    </Link>
                    .
                </p>
            </div>
        </>
    );
}
