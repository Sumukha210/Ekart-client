import SubHeading from "@/elements/SubHeading";
import { secondaryFont } from "@/lib/fonts";
import { useGetCategoriesQuery } from "@/redux/api/productApi";
import SectionContainer from "@/shared/SectionContainer";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";

const Categories = () => {
  const { data, isError } = useGetCategoriesQuery(null);

  return (
    <SectionContainer>
      <SubHeading text="Our Categories" />
      <ScrollContainer className="flex items-center gap-6 overflow-x-auto">
        {!isError && data?.result.length
          ? data.result.map((category: string) => (
              <div
                key={category}
                className="border border-gray-400 rounded-full min-w-[190px] text-center  py-2 ">
                <Link
                  href={`/shop?category=${category}`}
                  className={`${secondaryFont.className} inline-block text-gray-700 tracking-wide font-semibold capitalize text-lg`}>
                  {category}
                </Link>
              </div>
            ))
          : null}
      </ScrollContainer>
    </SectionContainer>
  );
};

export default Categories;
