import { useGetBrandsQuery, useGetCategoriesQuery } from "@/redux/api/productApi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/modules/Accordion";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

interface AllFilterMenuprops {
  isSideBarOpen: boolean;
  selectedCategory: string[];
  selectedBrand: string[];
  // eslint-disable-next-line no-unused-vars
  handleSelectCategory: (category: string, isSelected: boolean) => () => void;

  // eslint-disable-next-line no-unused-vars
  handleSelectBrand: (brand: string, isSelected: boolean) => () => void;

  // eslint-disable-next-line no-unused-vars
  handleSelectedRating: (rating: number) => void;
  closeAllFilterMenu: () => void;
  selectedRating: number | null;
}

const AllFilterMenu: React.FC<AllFilterMenuprops> = ({ isSideBarOpen, handleSelectCategory, handleSelectBrand, selectedCategory, selectedBrand, closeAllFilterMenu }) => {
  const { data: brands, isLoading: isBrandsLoading } = useGetBrandsQuery(null);
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery(null);

  return (
    <>
      <SideBar className={`bg-gray-200 fixed top-0  ${isSideBarOpen ? "left-0" : "-left-96"} h-screen w-96 z-50 overflow-y-auto`}>
        <div className="m-4 relative">
          <div className="absolute right-0 top-0 flex items-center bg-gray-300 px-4 py-1 rounded-full cursor-pointer" onClick={closeAllFilterMenu}>
            <span className="text-sm font-semibold">Close</span>
            <AiOutlineClose className="h-4 w-4" />
          </div>

          <Accordion type="single" collapsible className="w-full pt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>Yes. Its animated by default, but you can disable it if you prefer.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold transition hover:text-lime-500">
                <span>Categories {selectedCategory.length ? <span className="text-sm">( {selectedCategory.length} )</span> : null}</span>
              </AccordionTrigger>
              <AccordionContent className="pl-2">
                <ul className="font-medium capitalize space-y-3">
                  {!isCategoriesLoading && categories?.result
                    ? categories.result.map((category: string) => {
                        const isSelected = selectedCategory.indexOf(category) != -1;
                        return (
                          <li
                            onClick={handleSelectCategory(category, isSelected)}
                            className={`hover:text-dark hover:underline hover:font-semibold transition-all cursor-pointer flex items-center ${
                              isSelected ? "text-blue-500 font-semibold" : ""
                            }`}
                            key={category}>
                            {isSelected && <AiOutlineCheck />}
                            <span className="ml-1">{category}</span>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold transition hover:text-lime-500">
                <span>Brands {selectedBrand.length ? <span className="text-sm">( {selectedBrand.length} )</span> : null}</span>
              </AccordionTrigger>
              <AccordionContent className="pl-2">
                <ul className="font-medium capitalize space-y-3">
                  {!isBrandsLoading && brands?.result
                    ? brands.result.map((brand: string) => {
                        const isSelected = selectedBrand.indexOf(brand) != -1;
                        return (
                          <li
                            onClick={handleSelectBrand(brand, isSelected)}
                            className={`hover:text-dark hover:underline hover:font-semibold transition-all cursor-pointer flex items-center ${
                              isSelected ? "text-blue-500 font-semibold" : ""
                            }`}
                            key={brand}>
                            {isSelected && <AiOutlineCheck />}
                            <span className="ml-1">{brand}</span>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SideBar>
    </>
  );
};

export default AllFilterMenu;

const SideBar = styled.div`
  transition: left 0.6s ease-in-out;
`;
