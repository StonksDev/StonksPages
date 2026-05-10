import { cn } from "@/lib/cn";
import { FC, PropsWithChildren } from "react";

const ContentHeading: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
    return (
        <h3 className={cn("mt-2 text-h4", className)}>
            {children}
        </h3>
    );
};

export default ContentHeading;
