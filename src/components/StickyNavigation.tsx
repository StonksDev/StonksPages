"use client";

import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";

export default function StickyNavigation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const threshold = header ? header.offsetHeight - 100 : 750;

      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "bg-primary bg-stock-section fixed top-0 left-0 w-full z-50 transition-transform duration-150 ease-out shadow-glow pb-5 sm:pb-0",
        isVisible ? "translate-y-0" : "-translate-y-[120%]"
      )}
      aria-hidden={!isVisible}
    >
      <NavigationBar variant="sticky" />
    </div>
  );
}
