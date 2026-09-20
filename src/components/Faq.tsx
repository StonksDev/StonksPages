import { cn } from "@/lib/cn";

export type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: readonly FaqItem[];
  className?: string;
};

export default function Faq({ items, className }: Props) {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      {items.map((item) => (
        <details
          key={item.question}
          className="group border-b border-current/20 last:border-b-0"
        >
          <summary
            className={cn(
              "flex items-center justify-between gap-4 py-4 min-h-11 font-semibold text-h5 leading-snug",
              "list-none cursor-pointer select-none",
              "[&::-webkit-details-marker]:hidden marker:content-none"
            )}
          >
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="shrink-0 w-7 h-7 flex items-center justify-center text-xl leading-none transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-5 pr-10">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
