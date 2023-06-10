import { secondaryFont } from "@/lib/fonts";
import styled from "styled-components";

interface PageHeadingprops {
  text: string;
}

const PageHeading: React.FC<PageHeadingprops> = ({ text }) => {
  return <Heading className={`${secondaryFont.className} relative text-4xl font-medium after:bg-lime-400 inline-block mb-12`}>{text}</Heading>;
};

export default PageHeading;

const Heading = styled.h1`
  &::after {
    content: "";
    position: absolute;
    left: 0%;
    bottom: -20px;
    height: 6px;
    border-radius: 10px;
    width: 50%;
    z-index: 2;
  }
`;
