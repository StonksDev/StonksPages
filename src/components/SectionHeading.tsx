import { cn } from "@/lib/cn";
import { ElementType, FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
    className?: string
    as?: ElementType
    noArrow?: boolean
}
const SectionHeading: FC<Props> = ({ className, children, as: Component = "h2", noArrow }) => {
    return (
        <Component
            className={cn(`
                text-h3 font-semibold mb-4 w-fit
            `, !noArrow && `
                after:content-[''] after:ml-2 after:-mt-2 after:bg-arrow after:bg-no-repeat after:bg-size-[36px]
                after:inline-block after:w-14 after:h-9 after:align-middle
            `, className)}
        >
            {children}
        </Component>
    );
};

export default SectionHeading;
