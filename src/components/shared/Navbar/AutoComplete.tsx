import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchBar } from "./styles";

interface IProductData {
  _id: string;
  id: number;
  title: string;
  category: string;
  score: number;
  brand: string;
}

const AutoComplete = () => {
  const [searchInput, setSearchInput] = useState("");
  const [productData, setProductData] = useState<IProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (searchInput: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL!}/products/${searchInput}`
      );
      const data = await response.json();
      if (data.status === "success" && data.result.length)
        setProductData(data.result);
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

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="relative w-[400px]">
      <SearchBar className="relative h-9 bg-borderColor overflow-hidden rounded-lg w-full">
        <input
          value={searchInput}
          onChange={handleInput}
          type="text"
          className="pl-9 text-sm bg-transparent w-full rounded-lg"
          placeholder="Search product"
        />
        <AiOutlineSearch className="icon h-4 w-4" />
      </SearchBar>

      {searchInput && (
        <div className="absolute bg-zinc-100 top-10 w-full z-30 h-min border border-gray-300">
          <ul className="py-4 px-5">
            {productData.length ? (
              productData.map((data) => (
                <li key={data._id} className="mb-3 text-sm">
                  <Link
                    href={`/products/${data._id}/${data.title}?category=${data.category}&brand=${data.brand}`}
                    className="block leading-7"
                    dangerouslySetInnerHTML={{
                      __html: `${data.title} from ${data.brand} brand <span class="text-blue-500 font-semibold block">in ${data.category}</span>`,
                    }}></Link>
                </li>
              ))
            ) : (
              <li>
                {isLoading ? (
                  <span className="text-center">Fetching...............</span>
                ) : (
                  <span>There is not data</span>
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
