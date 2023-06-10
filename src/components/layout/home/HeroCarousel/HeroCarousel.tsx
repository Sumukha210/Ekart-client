import { secondaryFont } from "@/lib/fonts";
import NextImage from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";
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

  const ARROW_STYLE = "p-3 rounded-full border-2 cursor-pointer inline-block absolute top-2/4 -translate-y-2/4 hover:bg-yellow-300 transition focus:bg-yellow-300";

  return (
    <div className="relative mt-10 bg-white">
      <div className="mx-8 sm:w-9/12 sm:mx-auto">
        {data.map(({ title, category, image }, index) => (
          <Slide key={category} className={`hidden text-center ${index === currentSlide ? "active" : ""}`}>
            <div className="mb-8">
              <div className="absolute bg-yellow-300 h-32 w-32 opacity-70 rounded-full top-2/3 left-1/4 z-10"></div>
              <div className="absolute bg-orange-300 h-16 w-16 rounded-full bottom-2/3 right-3/4 z-10"></div>

              <div className="absolute bg-blue-300 h-16 w-16 rounded-full top-2/3 right-1/4 z-10"></div>
              <div className="absolute bg-purple-300 h-32 w-32 opacity-70 rounded-full bottom-2/3 left-3/4 z-10"></div>

              <h1 className={`${secondaryFont.className} text-xl font-medium  tracking-wide leading-9 sm:!leading-[1.25] sm:text-4xl md:text-5xl relative z-20`}>
                {title}
              </h1>

              <Link href={`/shop?category=${category}`} className="bg-lime-400 px-12 py-3 mt-8 inline-block rounded-full font-semibold border-2 ">
                Shop Now
              </Link>
            </div>

            <figure className="relative mx-auto h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] ">
              <NextImage className="relative z-20" placeholder="blur" fill src={image} alt={`${category}`} />
            </figure>
          </Slide>
        ))}
      </div>

      <div>
        <div onClick={handlePrevSlide} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handlePrevSlide()} className={`${ARROW_STYLE} left-2`}>
          <HiOutlineArrowNarrowLeft />
        </div>

        <div onClick={handleNextSlide} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handleNextSlide()} className={`${ARROW_STYLE} right-2`}>
          <HiOutlineArrowNarrowRight />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
