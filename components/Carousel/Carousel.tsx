"use-client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowUpRight } from "@phosphor-icons/react";

export default function Carousel({ children }: { children: any }) {
  const [emblaRef] = useEmblaCarousel({ align: "center" });

  return (
    <div ref={emblaRef}>
      <div className="w-full flex flex-row text-center items-center gap-4">
        {children}
      </div>
    </div>
  );
}
