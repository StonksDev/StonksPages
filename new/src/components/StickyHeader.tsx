"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const headerSection = document.querySelector("header");
    if (!headerSection) return;

    const headerBottom =
      headerSection.getBoundingClientRect().bottom + window.scrollY;
    const scrollPosition = window.pageYOffset;

    setIsVisible(scrollPosition > headerBottom);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return (
    <section
      className={`sticky-header ${isVisible ? "visible" : ""}`}
      aria-hidden="true"
      tabIndex={-1}
    >
      <nav role="presentation" aria-hidden="true">
        <div className="content-container !flex-row items-center min-h-[64px] md:min-h-[80px] !py-0 !gap-0">
          <a
            href="https://jup.ag/swap/SOL-STNK"
            target="_blank"
            rel="noopener noreferrer"
            className="buy-button !text-base !py-2 !px-4 md:!py-2.5 md:!px-5 md:!text-[1.25rem]"
          >
            Buy $STNK
          </a>
          <ol className="m-0 ml-auto -mr-2 p-0 list-none flex flex-row flex-wrap justify-center items-center gap-0 md:gap-2">
            <li>
              <a
                href="https://t.me/StonksSOLMemecoin"
                className="flex items-center justify-center gap-3 text-white no-underline p-2 hover:text-[--color-secondary] hover:outline hover:outline-2 hover:outline-[--color-secondary]"
                target="_blank"
                rel="noopener noreferrer"
                title="Join the Telegram channel"
              >
                <Image
                  src="/images/icons/telegram.webp"
                  alt="Telegram logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full md:w-7 md:h-7"
                />
                <span className="hidden md:block">Telegram</span>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/STONKS_SOL"
                className="flex items-center justify-center gap-3 text-white no-underline p-2 hover:text-[--color-secondary] hover:outline hover:outline-2 hover:outline-[--color-secondary]"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on X (Twitter)"
              >
                <Image
                  src="/images/icons/x.webp"
                  alt="X (Twitter) logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full md:w-7 md:h-7"
                />
                <span className="hidden md:block">X/Twitter</span>
              </a>
            </li>
          </ol>
        </div>
      </nav>
    </section>
  );
}
