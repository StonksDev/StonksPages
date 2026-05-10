import Redirect from "@/content/qr/Redirect";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reedirektin...",
    robots: {
        index: false,
        follow: false,
    },
};

export default function Qr2Page() {
    return <Redirect to="https://www.stonkscoin.org" />;
}
