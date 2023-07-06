import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  totalProducts: number;
  productsPerPage: number;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalProducts, productsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const [currentPageGroup, setCurrentPageGroup] = useState(Math.ceil(currentPage / 5));

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);
    setCurrentPageGroup(Math.ceil(page / 5));
  };

  const renderPaginationNumbers = () => {
    const startPage = (currentPageGroup - 1) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);

    const paginationNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 h-7 w-8 text-base flex items-center justify-center rounded ${i === currentPage ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"}`}>
          {i}
        </button>
      );
    }

    return paginationNumbers;
  };

  return (
    <div className="flex items-center justify-center my-10">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 h-7 w-8 text-base flex items-center justify-center rounded bg-gray-300 text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed">
        <IoIosArrowBack />
      </button>
      {renderPaginationNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 h-7 w-8 text-base flex items-center justify-center rounded bg-gray-300 text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed">
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
