"use-client";
import React, { useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import clsx from "clsx";

export default function Carousel({ children }: { children: any }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // const slideNodeLength = useMemo<number>(() => {
  //   if (emblaApi) {
  //     return emblaApi?.slideNodes()?.length;
  //   }
  //   return 0;
  // }, [emblaApi]);

  return (
    <div
      className="w-full grid
      [grid-template-areas:'carouselContent_carouselContent'_'carouselPrev_carouselNext']
      md:[grid-template-areas:'carouselPrev_carouselContent_carouselContent_carouselContent_carouselContent_carouselContent_carouselContent_carouselContent_carouselContent_carouselContent_carouselContent_carouselNext']"
    >
      <div
        className="text-center my-auto
      [grid-area:carouselPrev]"
      >
        <button
          className={clsx(
            "button-hover button-icon mx-4 mt-4 md:my-4",
            // emblaApi?.slidesInView().includes(0) && "opacity-65"
          )}
          onClick={scrollPrev}
        >
          <ArrowCircleLeft size={32} />
        </button>
      </div>
      <div
        className="overflow-hidden
      [grid-area:carouselContent]
      "
        ref={emblaRef}
      >
        <div className="flex flex-row gap-4">{children}</div>
      </div>
      <div
        className="text-center my-auto
      [grid-area:carouselNext]"
      >
        <button
          className={clsx(
            "button-hover button-icon mx-4 mt-4 md:my-4",
            // emblaApi?.slidesInView().includes(slideNodeLength - 1) && "opacity-65"
          )}
          onClick={scrollNext}
        >
          <ArrowCircleRight size={32} />
        </button>
      </div>
    </div>
  );
}
