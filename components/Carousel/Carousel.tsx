"use-client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel({ align: "center" });

  return (
    <div ref={emblaRef}>
      <div className="w-full flex flex-row text-center items-center gap-4">
        <div className="min-w-52 h-52 border rounded-md">Slide 1</div>
       <div className="min-w-52 h-52 border rounded-md">Slide 2</div>
       <div className="min-w-52 h-52 border rounded-md">Slide 3</div>
       <div className="min-w-52 h-52 border rounded-md">Slide 4</div>
       <div className="min-w-52 h-52 border rounded-md">Slide 5</div>
       <div className="min-w-52 h-52 border rounded-md">Slide 6</div>
      </div>
    </div>
  );
}
