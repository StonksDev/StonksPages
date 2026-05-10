import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Tells tailwind-merge about custom spacing keys
const customTwMerge = extendTailwindMerge({
    extend: {
        theme: {
            spacing: ["content-x", "content-y"],
        },
        classGroups: {
            "font-size": ["text-h1", "text-h2", "text-h3", "text-h4", "text-h5", "text-small"],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return customTwMerge(clsx(inputs));
}