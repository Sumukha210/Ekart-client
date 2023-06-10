import { secondaryFont } from "@/lib/fonts";
import { removeFromCart } from "@/redux/slices/cartSlice";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

interface ConfirmDialogprops {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  id: number;
  title: string;
}

const ConfirmDialog: React.FC<ConfirmDialogprops> = ({ showDialog, setShowDialog, id, title }) => {
  const dispatch = useDispatch();

  return (
    <>
      <dialog open={showDialog} className="z-40 fixed top-2/4 rounded-lg -translate-x-2/4 -translate-y-2/4 left-2/4 right-2/4 w-80">
        <div className="text-center p-2">
          <h4 className={`${secondaryFont.className} text-xl font-medium tracking-wider leading-8 mb-8`}>
            Are you sure want remove <span className="font-bold text-lg text-blue-400">{title}?</span>
          </h4>

          <div className="text-sm">
            <button onClick={() => dispatch(removeFromCart({ id }))} className="bg-red-500 text-white  px-5 py-2 rounded-full font-semibold tracking-wide">
              Remove
            </button>

            <button onClick={() => setShowDialog(false)} className="bg-lime-400 px-5 py-2 rounded-full font-medium tracking-wide ml-4">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ConfirmDialog;
