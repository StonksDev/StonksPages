import React from "react";
import { Link as CustomLink } from "./Link";
import { cn } from "@/lib/cn";

type BaseButtonProps = {
    size?: "default" | "small" | "large";
    variant?: "primary" | "secondary" | "tertiary" | "rainbow" | "outline" | "outline-white" | "borderless" | "ghost";
    className?: string;
    children?: React.ReactNode;
};

type LinkButtonProps = BaseButtonProps & {
    href: string;
    external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;

type NativeButtonProps = BaseButtonProps & {
    href?: never;
    external?: never;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>;

type ButtonProps = LinkButtonProps | NativeButtonProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    href,
    className,
    size = "default",
    variant = "primary",
    external = false,
    children,
    ...props
}, ref) => {
    const sharedClasses = cn(
        // Base styles - prevent text selection on long press
        "inline-flex items-center justify-center font-semibold no-underline transition-all duration-200 rounded-button text-center select-none [&>*]:text-inherit [-webkit-touch-callout:none]",

        // Variants
        variant === "primary" && "bg-primary text-white hover:text-white",
        variant === "secondary" && "bg-secondary text-white hover:text-white",
        variant === "tertiary" && "bg-tertiary text-white hover:text-white",
        variant === "rainbow" && "bg-gradient-button text-white hover:text-white",
        variant === "outline" && "border border-gray-500 text-black hover:text-white! hover:border-secondary active:text-black focus:text-black focus-visible:text-black",
        variant === "outline-white" && "border border-gray-300 text-white hover:text-white hover:border-secondary",
        variant === "borderless" && "bg-transparent text-white hover:text-white",
        variant === "ghost" && "bg-primary/5 text-primary/50 hover:text-white hover:bg-primary/10",

        // Sizes
        size === "large" && "px-7 py-3 text-h5 min-h-[58.6px]",
        size === "default" && "px-6 py-2.5 text-h5 text-base",
        size === "small" && "px-5 py-2 text-small font-normal",

        "hover-gradient-button",

        className
    );

    if (href) {
        const extraProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
        return (
            <CustomLink
                href={href}
                {...extraProps}
                className={sharedClasses}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </CustomLink>
        );
    }

    return (
        <button
            ref={ref as React.Ref<HTMLButtonElement>}
            className={sharedClasses}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

export { Button };
export default Button;
