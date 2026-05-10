import { cn } from "@/lib/cn";
import { FC, PropsWithChildren } from "react";

type ContentListProps = PropsWithChildren & {
    className?: string
}
export const ContentList: FC<ContentListProps> = ({ className, children }) => {

    return <ul className={cn("list-none pl-8 m-0", className)}>{children}</ul>;
};

type ListItemProps = PropsWithChildren<{
    icon?: string;
    className?: string;
}>;

export const ContentListItem: FC<ListItemProps> = ({ className, children, icon = "📈" }) => {
    return (
        <li className={cn("relative before:absolute before:-left-8 before:content-[attr(data-icon)]", className)} data-icon={icon}>
            {children}
        </li>
    );
};
