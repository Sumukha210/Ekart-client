import { IProductItem } from "@/lib/types";
import { calculateTotalPrice } from "@/lib/utils";
import { changeProduct, decreaseProduct, increaseProduct, removeFromCart } from "@/redux/slices/cartSlice";
import NextImage from "next/image";
import Link from "next/link";
import { ChangeEvent } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch } from "react-redux";

interface TableRowprops extends IProductItem {
  index: number;
}

const TableRow: React.FC<TableRowprops> = ({ _id, id, title, price, numberOfItemsSelected, stock, discountPercentage, index }) => {
  const dispatch = useDispatch();

  const totalPrice = Number(calculateTotalPrice(price, discountPercentage)).toFixed();
  const subTotal = Number(parseInt(totalPrice) * numberOfItemsSelected).toFixed();

  const handleProductInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (value <= stock && value >= 1) dispatch(changeProduct({ id, value }));
  };

  const handleIncreaseProduct = () => {
    if ((numberOfItemsSelected || 0) < stock) dispatch(increaseProduct({ id }));
  };

  const handleDecreaseProduct = () => {
    if ((numberOfItemsSelected || 0) >= 1) dispatch(decreaseProduct({ id }));
  };

  const handleRemoveProduct = () => dispatch(removeFromCart({ id }));

  return (
    <>
      <tr key={_id} className="text-center text-sm">
        <td className="md:!hidden  border px-4 py-2">
          <div className="flex justify-between items-center">
            <span className="block text-lg font-semibold">{index + 1}</span>
            <button title="Remove Product from cart" onClick={handleRemoveProduct}>
              <CiCircleRemove className="h-8 w-8 text-red-400" />
            </button>
          </div>
        </td>

        <td className="border p-2">
          <NextImage src={`${process.env.NEXT_PUBLIC_BASE_URL}/product_${id}/image_1.jpg`} height={40} width={40} alt={title} className="object-cover mx-auto h-full" />
        </td>

        <td className="border md:px-4">
          <div className="text-left md:block productTableData">
            <div className="block md:hidden font-semibold">Product</div>
            <Link
              href={`/collections/${_id}?name=${title}`}
              className="whitespace-normal overflow-hidden line-clamp-2 capitalize font-medium text-blue-600 text-end md:text-start">
              {title.toLowerCase()}
            </Link>
          </div>
        </td>

        <td className="border md:px-2 md:text-center">
          <div className="md:block productTableData md:min-w-[60px]">
            <div className="block md:hidden font-semibold">Price</div>
            <div className="flex justify-end md:justify-center">
              <BsCurrencyRupee className="mt-[2px]" />
              <span>
                {totalPrice} / <sub className="text-gray-500 line-through">{price}</sub>{" "}
              </span>
            </div>
          </div>
        </td>

        <td className="border">
          <div className="md:block productTableData md:px-2">
            <div className="block md:hidden font-semibold">Quantity</div>
            <div className="flex items-center justify-end md:justify-center gap-3">
              <button
                disabled={(numberOfItemsSelected || 0) <= 1}
                onClick={handleDecreaseProduct}
                className="h-7 w-7 p-2 rounded-full bg-accent flex items-center justify-center disabled:opacity-50">
                <AiOutlineMinus />
              </button>

              <input type="number" value={numberOfItemsSelected || 1} onChange={handleProductInput} className="w-20 h-7 border border-gray-300 text-grey px-2" />

              <button
                disabled={(numberOfItemsSelected || 0) >= stock}
                onClick={handleIncreaseProduct}
                className="h-7 w-7 p-2 rounded-full bg-accent flex items-center justify-center disabled:opacity-50">
                <AiOutlinePlus />
              </button>
            </div>
          </div>
        </td>

        <td className="border min-w-[50px]">
          <div className="md:block productTableData">
            <div className="block md:hidden font-semibold">Sub Total</div>
            <div className="flex justify-end md:justify-center">
              <BsCurrencyRupee className="mt-[2px]" />
              <span>{subTotal}</span>
            </div>
          </div>
        </td>

        <td className="!hidden md:!table-cell border">
          <button title="Remove Product from cart" onClick={handleRemoveProduct}>
            <CiCircleRemove className="h-7 w-7 text-red-400" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
