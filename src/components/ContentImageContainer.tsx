import { cn } from "@/lib/cn";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    className?: string;
}>;

const ContentImageContainer: FC<Props> = ({ children, className = "" }) => {
    return (
        <div
            className={cn(
                "flex justify-center items-center flex-1 mx-auto md:w-1/2",
                className
            )}
        >
            {children}
        </div>
    );
};

export default ContentImageContainer;
