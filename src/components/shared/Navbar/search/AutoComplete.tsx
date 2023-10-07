import Spinner from "@/elements/Spinner";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchBar } from "../styles";
import ProductListItem from "./ProductListItem";
import { IProductData } from "./types";

interface AutoCompleteProps {
  showModal: boolean;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ showModal }) => {
  const [searchInput, setSearchInput] = useState("");
  const [productData, setProductData] = useState<IProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDropdown, setOpenDropdown] = useState(false);

  const fetchData = async (searchInput: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/products/search/${searchInput}`);
      const data = await response.json();
      if (data.status === "success" && data.result.length) {
        setProductData(data.result);
      } else {
        setProductData([]);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchInput.trim().length) {
        fetchData(searchInput);
      } else {
        setProductData([]);
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

  useEffect(() => {
    if (!showModal) {
      handleCloseMenu();
    }
  }, [showModal]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setIsLoading(true);
  };

  const handleCloseMenu = () => {
    setSearchInput("");
    setProductData([]);
    setOpenDropdown(false);
  };

  const handleInputFocus = () => {
    setOpenDropdown(true);
  };

  return (
    <div className="relative w-[80%] md:w-[600px] mx-auto mt-10">
      <SearchBar className="relative h-14 bg-borderColor rounded-sm w-full">
        <input
          onFocus={handleInputFocus}
          value={searchInput}
          onChange={handleInput}
          type="text"
          className="pl-10 text-sm bg-white w-full rounded-lg h-full"
          placeholder="Search product"
        />
        <div className="absolute top-2/4 -translate-y-2/4 grid place-items-center pl-2">
          <AiOutlineSearch className="h-6 w-6 opacity-40" />
        </div>
      </SearchBar>

      {isOpenDropdown && (
        <div className="absolute bg-zinc-100 rounded-b-lg top-14 w-full z-30 h-[70vh] border border-gray-300 overflow-y-auto">
          <ul>
            {productData.length ? (
              productData.map((data) => <ProductListItem data={data} handleCloseMenu={handleCloseMenu} key={data._id} />)
            ) : (
              <li className="p-10">
                {isLoading ? (
                  <span className="text-center">
                    <Spinner />
                  </span>
                ) : (
                  <span className=""></span>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
