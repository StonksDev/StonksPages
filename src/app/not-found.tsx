import Image from "next/image";
import Page from "@/components/Page";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ContentContainer from "@/components/ContentContainer";
import { Button } from "@/components/Button";

export default function NotFound() {
    return (
        <Page className="min-h-screen">
            <Section variant="dark">
                <NavigationBar />
            </Section>
            <Section className="flex-1 flex items-center justify-center">
                <ContentContainer className="items-center text-center gap-8 md:flex-col">
                    <h1 className="text-4xl font-bold">404 - Stonks Not Found</h1>
                    <div className="relative max-w-[600px]">
                        <Image
                            src="/images/not-stonks.webp"
                            alt="404. Not Stonks"
                            width="960"
                            height="576"
                        />
                    </div>
                    <Button href="/" variant="tertiary" size="large">
                        Home
                    </Button>
                </ContentContainer>
            </Section>
            <Footer />
        </Page>
    );
}
