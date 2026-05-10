import { cn } from "@/lib/cn";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    className?: string;
}>;

const Page: FC<Props> = ({ children, className }) => {
    return (
        <main className={cn("flex flex-col", className)}>
            {children}
        </main>
    );
};

export default Page;
