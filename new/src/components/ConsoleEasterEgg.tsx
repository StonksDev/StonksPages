"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const colors = [
      "red",
      "green",
      "blue",
      "orange",
      "purple",
      "pink",
      "yellow",
      "cyan",
      "lime",
    ];

    for (let i = 0; i < 69; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      console.log(
        `%cSTONKS`,
        `color: ${randomColor}; font-weight: bold; font-size: 16px;`
      );
    }
  }, []);

  return null;
}
