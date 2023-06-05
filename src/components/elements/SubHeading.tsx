import { secondaryFont } from "@/lib/fonts";

interface SubHeadingprops {
  text: string;
}

const SubHeading: React.FC<SubHeadingprops> = ({ text }) => {
  return (
    <h2
      className={`${secondaryFont.className} text-3xl mb-12 tracking-wider font-semibold`}>
      {text}
    </h2>
  );
};

export default SubHeading;
