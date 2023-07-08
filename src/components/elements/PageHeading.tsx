import { secondaryFont } from "@/lib/fonts";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";

interface PageHeadingprops {
  text: string;
  allowBottomLine?: boolean;
  className?: string;
}

const PageHeading: React.FC<PageHeadingprops> = ({ text, allowBottomLine = true, className }) => {
  return (
    <Heading
      className={twMerge(
        `${secondaryFont.className} ${allowBottomLine ? "bottomLine" : ""} relative text-4xl font-medium after:bg-lime-400 inline-block mb-12 ${className}`
      )}>
      {text}
    </Heading>
  );
};

export default PageHeading;

const Heading = styled.h1`
  &.bottomLine {
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
  }
`;
