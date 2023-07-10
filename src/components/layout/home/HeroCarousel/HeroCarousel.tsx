import LinkButton from "@/elements/LinkButton";
import { secondaryFont } from "@/lib/fonts";
import SectionContainer from "@/shared/modules/SectionContainer";
import NextImage from "next/image";
import { useState } from "react";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";
import { data } from "./util";

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
    "p-3 border-2 rounded-full border-accent cursor-pointer inline-block lg:absolute -bottom-30 hover:bg-primary hover:text-white transition focus:bg-primary";

  return (
    <div className="relative bg-accent overflow-hidden">
      <SectionContainer className="mt-8  sm:mt-10 lg:mt-0 lg:h-[90vh]">
        <div className="grid grid-cols-12 lg:gap-20 min-h-full items-center md:text-center lg:text-left">
          <div className="col-span-12 lg:col-span-7 relative">
            <span className="block uppercase text-sm text-primary font-semibold mb-2">{data[currentSlide].category.toLowerCase().replaceAll("-", " ")}</span>
            <h1 className={`${secondaryFont.className} capitalize tracking-wide text-dark text-4xl lg:text-5xl leading-[1.25] lg:leading-[1.15]`}>
              {data[currentSlide].title.toLowerCase()}
            </h1>
            <p className="text-dark leading-7 lg:text-lg mt-6 lg:mt-8">{data[currentSlide].description}</p>
            <LinkButton href={`/collections?category=${data[currentSlide].category}`} className="min-w-[160px] py-3 mt-4">
              Shop Now
            </LinkButton>

            <div className="mt-6 lg:mt-0 space-x-6">
              <div onClick={handlePrevSlide} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handlePrevSlide()} className={`${ARROW_STYLE} right-14`}>
                <HiOutlineArrowNarrowLeft />
              </div>

              <div onClick={handleNextSlide} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handleNextSlide()} className={`${ARROW_STYLE} right-2`}>
                <HiOutlineArrowNarrowRight />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 relative md:mx-auto lg:mx-0 bg-white lg:bg-inherit">
            <figure className="relative bg-inherit lg:bg-white flex items-center justify-center h-[300px] w-[300px] md:rounded-full md:h-[500px] md:w-[500px] overflow-hidden">
              <NextImage
                className="object-contain overflow-hidden p-16 h-full w-full"
                placeholder="blur"
                fill
                src={data[currentSlide].image}
                alt={`${data[currentSlide].category}`}
              />
            </figure>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default HeroCarousel;
