import { AiOutlineCheck } from "react-icons/ai";

interface FilterListProps {
  isLoading: boolean;
  items: string[] | null;
  selectedItems: string[];
  // eslint-disable-next-line no-unused-vars
  onSelectItem: (item: string, isSelected: boolean) => void;
}

const FilterList: React.FC<FilterListProps> = ({ isLoading, items, selectedItems, onSelectItem }) => {
  if (isLoading || !items) {
    return null;
  }

  return (
    <>
      {items.map((item: string) => {
        const isSelected = selectedItems.includes(item);
        return (
          <li
            onClick={() => onSelectItem(item, isSelected)}
            className={`hover:text-dark hover:underline hover:font-semibold transition-all cursor-pointer flex items-center ${
              isSelected ? "text-blue-500 font-semibold" : ""
            }`}
            key={item}>
            {isSelected && <AiOutlineCheck />}
            <span className="ml-1">{item}</span>
          </li>
        );
      })}
    </>
  );
};

export default FilterList;
