import { secondaryFont } from "@/lib/fonts";
import { twMerge } from "tailwind-merge";

interface SubHeadingprops {
  text: string;
  className?: string;
}

const SubHeading: React.FC<SubHeadingprops> = ({ text, className }) => {
  return <h2 className={twMerge(`${secondaryFont.className} text-3xl mb-10 tracking-wider font-semibold ${className}`)}>{text}</h2>;
};

export default SubHeading;
