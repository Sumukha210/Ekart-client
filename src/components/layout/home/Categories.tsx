import SubHeading from "@/elements/SubHeading";
import { useGetCategoriesQuery } from "@/redux/api/productApi";
import SectionContainer from "@/shared/modules/SectionContainer";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";

const Categories = () => {
  const { data, isError } = useGetCategoriesQuery(null);

  return (
    <div className="bg-accent py-16 mt-20">
      <SectionContainer className="mt-0">
        <SubHeading text="Our Categories" className="text-center" />
        <ScrollContainer className="flex items-center gap-6 overflow-x-auto cursor-grab">
          {!isError && data?.result.length
            ? data.result.map((category: string) => (
                <div key={category} className="border border-primary  min-w-[190px]  text-center  py-3">
                  <Link href={`/collections?category=${category}`} className={`cursor-pointer text-dark font-medium tracking-wider text-sm  capitalize`}>
                    {category.replaceAll("-", " ").toLowerCase()}
                  </Link>
                </div>
              ))
            : null}
        </ScrollContainer>
      </SectionContainer>
    </div>
  );
};

export default Categories;
