import { cn } from "@/lib/cn";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    className?: string;
}>;

const ContentContainer: FC<Props> = ({ children, className = "" }) => {
    return (
        <div
            className={cn(
                "mx-auto flex flex-col md:flex-row box-content",
                "max-w-page-content px-content-x py-content-y",
                "gap-x-content-x gap-y-content-y",
                className
            )}
        >
            {children}
        </div>
    );
};

export default ContentContainer;
