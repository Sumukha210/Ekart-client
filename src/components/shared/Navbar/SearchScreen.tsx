import { secondaryFont } from "@/lib/fonts";
import { AiOutlineClose } from "react-icons/ai";
import SectionContainer from "../modules/SectionContainer";

interface SearchScreenprops {
  show: boolean;
  handleClose: () => void;
}

const SearchScreen: React.FC<SearchScreenprops> = ({ show, handleClose }) => {
  return (
    <>
      <div
        className={`fixed transition-all duration-500 top-0 left-0 h-screen w-screen bg-black bg-opacity-70 z-50 ${
          show ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
        }`}>
        <div className="text-end m-4">
          <button title="close search" className="px-8 inline-block" onClick={handleClose}>
            <AiOutlineClose className="text-light h-20 w-20" />
          </button>
        </div>
        <SectionContainer className="mt-0">
          <h2 className={`${secondaryFont.className} text-center text-light text-6xl`}>Search Products</h2>
        </SectionContainer>
      </div>
    </>
  );
};

export default SearchScreen;
