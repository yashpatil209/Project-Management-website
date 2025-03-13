import React from "react";
import { Carousel } from "flowbite-react";
import Imag1 from "../../../../public/images/curosal1.png";
import Imag2 from "../../../../public/images/curosal1.png";
import Imag3 from "../../../../public/images/curosal1.png";

export default function ImageCarousel() {
  const Images = [Imag1, Imag2, Imag3];

  return (
    <div className="">
      <Carousel
        className="h-[33rem] rounded-lg overflow-hidden"
        leftControl={<span className="hidden">.</span>}
        rightControl={<span className="hidden">.</span>}
        indicators={false}
      >
        {Images.map((Image, index) => (
          <img className="rounded-lg" key={index} src={Image} alt="..." />
        ))}
      </Carousel>
    </div>
  );
}
