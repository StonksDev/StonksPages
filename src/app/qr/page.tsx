import Redirect from "@/content/qr/Redirect";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reedirektin...",
    robots: {
        index: false,
        follow: false,
    },
};

export default function QrPage() {
    return <Redirect to="https://www.stonkscoin.org" />;
}
