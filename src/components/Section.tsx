import { cn } from "@/lib/cn";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    id?: string;
    variant?: "default" | "dark";
    className?: string;
}>;

const Section: FC<Props> = ({ children, id, variant = "default", className = "" }) => {
    const isDark = variant === "dark";

    return (
        <section
            id={id}
            className={cn(
                isDark && "bg-primary bg-stock-section text-white",
                className
            )}
        >
            {children}
        </section>
    );
};

export default Section;
