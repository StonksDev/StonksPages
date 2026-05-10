import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, FC } from "react";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> &
    NextLinkProps & {
        children?: React.ReactNode;
    } & React.RefAttributes<HTMLAnchorElement>;

export const Link: FC<LinkProps> = ({ href, children, ...props }) => {
    const isExternal = typeof href === "string" && (href.startsWith("http") || href.startsWith("mailto:"));

    if (isExternal) {
        return (
            <a
                href={href as string}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <NextLink href={href} {...props}>
            {children}
        </NextLink>
    );
};
