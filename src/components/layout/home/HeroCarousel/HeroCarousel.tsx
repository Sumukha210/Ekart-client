import { secondaryFont } from "@/lib/fonts";
import NextImage from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { Slide, data } from "./util";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    if (currentSlide >= data.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide < 1) {
      setCurrentSlide(data.length - 1);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const ARROW_STYLE =
    "p-3 rounded-full border-2 cursor-pointer inline-block absolute top-2/4 -translate-y-2/4 hover:bg-yellow-300 transition focus:bg-yellow-300";

  return (
    <div className="relative mt-10">
      <div className="mx-8 sm:w-9/12 sm:mx-auto">
        {data.map(({ title, category, image }, index) => (
          <Slide
            key={category}
            className={`hidden text-center ${
              index === currentSlide ? "active" : ""
            }`}>
            <div className="mb-8">
              <h1
                className={`${secondaryFont.className} text-xl  tracking-wide !leading-[1.25] sm:text-4xl md:text-5xl `}>
                {title}
              </h1>

              <Link
                href={`/shop?category=${category}`}
                className="bg-yellow-300 px-12 py-2 mt-4 inline-block rounded-full font-semibold border ">
                Shop Now
              </Link>
            </div>

            <figure className="relative mx-auto h-[250px] w-[250px] sm:h-[400px] sm:w-[400px]">
              <NextImage
                placeholder="blur"
                fill
                src={image}
                alt={`${category}`}
              />
            </figure>
          </Slide>
        ))}
      </div>

      <div>
        <div
          onClick={handlePrevSlide}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handlePrevSlide()}
          className={`${ARROW_STYLE} left-2`}>
          <HiOutlineArrowNarrowLeft />
        </div>

        <div
          onClick={handleNextSlide}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNextSlide()}
          className={`${ARROW_STYLE} right-2`}>
          <HiOutlineArrowNarrowRight />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
