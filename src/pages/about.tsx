import AboutImg from "@/assets/about.jpg";
import COOImg from "@/assets/cfo.jpg";
import CFOImg from "@/assets/manager.webp";
import CEOImg from "@/assets/president.webp";
import PageHeading from "@/elements/PageHeading";
import SubHeading from "@/elements/SubHeading";
import ChooseUs from "@/layout/home/ChooseUs";
import { secondaryFont } from "@/lib/fonts";
import SectionContainer from "@/shared/modules/SectionContainer";
import NextImage from "next/image";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";

const About = () => {
  return (
    <>
      <SectionContainer className="mt-6 md:mt-20">
        <header>
          <h3 className="flex items-center text-sm">
            <Link href={"/"} className="text-gray-500">
              Home
            </Link>
            <AiOutlineRight className="text-gray-400 mx-1" />
            <span className="font-semibold">About</span>
          </h3>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-center mt-8">
          <div>
            <PageHeading text="About Us" allowBottomLine={false} className="mb-6" />
            <p className="leading-7 tracking-wide  text-gray-500">
              At EKart, we are passionate about bringing you a wide range of high-quality products to enhance your lifestyle. Whether you&apos;re looking for automotive
              fragrances to freshen up your car, stylish furniture to transform your living space, or everyday groceries to stock your pantry, we&apos;ve got you covered.
            </p>
          </div>

          <div className="relative w-full h-[450px]">
            <NextImage src={AboutImg} placeholder="blur" className="object-cover" alt="about us" fill />
          </div>
        </div>
      </SectionContainer>

      <div className="bg-accent py-16 mt-20">
        <SectionContainer className="mt-0">
          <div className="sm:w-3/4 sm:mx-auto sm:text-center">
            <div>
              <SubHeading text="Our Vision" className="mb-6" />
              <p className="leading-8 text-xl text-grey">
                Our vision is to provide our customers with an exceptional online shopping experience. We strive to be your one-stop destination for all your home,
                lifestyle, and personal care needs. We carefully curate our product selection to ensure that every item meets our strict standards of quality, style, and
                functionality.
              </p>
            </div>
          </div>
        </SectionContainer>
      </div>

      <ChooseUs />

      <SectionContainer>
        <SubHeading text="Our Team" className="mb-6" />

        <div className="grid sm:grid-cols-3 gap-6 lg:gap-12">
          <div className="bg-light">
            <div className="relative h-96 w-full">
              <NextImage src={COOImg} fill placeholder="blur" className="object-cover h-full w-full" alt="CEO" />
            </div>

            <div className="p-4">
              <h4 className={`${secondaryFont.className} font-bold text-xl tracking-widest mt-2`}>CEO</h4>
              <h5 className="font-semibold text-gray-500 text-sm tracking-wider">Mr. Vikrant</h5>
            </div>
          </div>

          <div className="bg-light">
            <div className="relative h-96 w-full">
              <NextImage src={CFOImg} fill placeholder="blur" className="object-cover h-full w-full" alt="COO" />
            </div>

            <div className="p-4">
              <h4 className={`${secondaryFont.className} font-bold text-xl tracking-widest mt-2`}>COO</h4>
              <h5 className="font-semibold text-gray-500 text-sm tracking-wider">Ms. Mithali</h5>
            </div>
          </div>

          <div className="bg-light">
            <div className="relative h-96 w-full">
              <NextImage src={CEOImg} fill placeholder="blur" className="object-cover h-full w-full" alt="CFO" />
            </div>

            <div className="p-4">
              <h4 className={`${secondaryFont.className} font-bold text-xl tracking-widest mt-2`}>CFO</h4>
              <h5 className="font-semibold text-gray-500 text-sm tracking-wider">Mr. Manohar</h5>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default About;
