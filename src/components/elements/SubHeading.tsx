import { secondaryFont } from "@/lib/fonts";
import { twMerge } from "tailwind-merge";

interface SubHeadingprops {
  text: string;
  className?: string;
}

const SubHeading: React.FC<SubHeadingprops> = ({ text, className }) => {
  return <h2 className={twMerge(`${secondaryFont.className} text-[40px] mb-10 text-dark tracking-wider  ${className}`)}>{text}</h2>;
};

export default SubHeading;
