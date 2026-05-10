import { cn } from "@/lib/cn";
import { PropsWithChildren, FC } from "react";

type Props = PropsWithChildren & {
    className?: string
}

const ContentTextContainer: FC<Props> = ({ className, children }) => {
    return (
        <div className={cn("flex-1 flex flex-col gap-4", className)}>
            {children}
        </div>
    );
};

export default ContentTextContainer;

