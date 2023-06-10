import SubHeading from "@/elements/SubHeading";
import SectionContainer from "@/shared/SectionContainer";
import { IconType } from "react-icons";
import { BsCart4 } from "react-icons/bs";
import { IoPricetagsSharp } from "react-icons/io5";
import { RiCustomerService2Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import styled from "styled-components";

interface IContent {
  title: string;
  description: string;
  Icon: IconType;
}

const content: IContent[] = [
  {
    Icon: BsCart4,
    title: "Wide Product Selection",
    description:
      "Discover an extensive collection of products across various categories. From electronics to fashion, find exactly what you're looking for on our website.",
  },
  {
    Icon: IoPricetagsSharp,
    title: "Competitive Prices",
    description: "Enjoy competitive prices on high-quality items. We offer great value, ensuring you save while experiencing the best shopping experience.",
  },
  {
    Icon: TbTruckDelivery,
    title: "Fast and Reliable Shipping",
    description: "Experience speedy and reliable shipping services. We prioritize prompt delivery to ensure your satisfaction every step of the way.",
  },
  {
    Icon: RiCustomerService2Line,
    title: "Exceptional Customer Service",
    description: "Our dedicated customer service team is always ready to assist you.",
  },
];

const ChooseUs = () => {
  return (
    <SectionContainer>
      <SubHeading text="Why to choose us" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {content.map(({ title, description, Icon }, index) => (
          <Section key={index} className="bg-white border border-borderColor p-4 rounded-2xl hover:bg-lime-300 transition text-center">
            <div className="bg-lime-400 mb-2  h-[70px] w-[70px] p-5 rounded-full mx-auto flex items-center justify-center">
              <Icon className="h-full w-full" />
            </div>
            <h4 className="text-xl sm:text-lg font-semibold mb-2">{title}</h4>
            <p className="text-gray-600 leading-7">{description}</p>
          </Section>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ChooseUs;

const Section = styled.section`
  &:hover {
    svg {
      color: white;
    }
  }
`;
