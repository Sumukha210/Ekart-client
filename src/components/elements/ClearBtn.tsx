import { AiOutlineClose } from "react-icons/ai";

interface ClearBtnprops {
  clickEvent: () => void;
  label?: string;
}

const ClearBtn: React.FC<ClearBtnprops> = ({ clickEvent, label = "Clear" }) => {
  return (
    <>
      <div className="bg-gray-200 px-4 py-2 text-gray-600 gap-1 rounded-full cursor-pointer inline-block" onClick={clickEvent}>
        <h5 className="flex items-center">
          <span className="text-xs font-semibold mr-1 capitalize">{label}</span>
          <AiOutlineClose className="h-4 w-4" />
        </h5>
      </div>
    </>
  );
};

export default ClearBtn;
