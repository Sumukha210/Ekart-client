import { twMerge } from "tailwind-merge";

interface SectionContainerprops {
  children: React.ReactNode;
  className?: string;
}

const SectionContainer: React.FC<SectionContainerprops> = ({ children, className }) => {
  return <div className={twMerge(`w-11/12 mx-auto mt-20 ${className}`)}>{children}</div>;
};

export default SectionContainer;
