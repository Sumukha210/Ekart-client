import { secondaryFont } from "@/lib/fonts";
import SectionContainer from "@/shared/SectionContainer";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";

const categories = [
  "category-1",
  "category-2",
  "category-3",
  "category-4",
  "category-5",
  "category-6",
  "category-7",
  "category-8",
  "category-9",
  "category-10",
  "category-11",
  "category-12",
  "category-13",
  "category-14",
  "category-15",
  "category-16",
  "category-17",
  "category-18",
  "category-19",
];

const Categories = () => {
  return (
    <SectionContainer>
      <ScrollContainer className="flex items-center gap-6 overflow-x-auto">
        {categories.length
          ? categories.map((category) => (
              <div
                key={category}
                className="border border-gray-400 rounded-full min-w-[140px] text-center py-2 ">
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
