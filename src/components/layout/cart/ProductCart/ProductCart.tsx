import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import TableRow from "./TableRow";
import { Container } from "./styles";

interface ProductCartprops {}

const ProductCart: React.FC<ProductCartprops> = () => {
  const products = useSelector((state: RootState) => state.cart.products);

  return (
    <Container className="overflow-x-auto">
      <div className="table-responsive">
        <table className="w-full border-collapse">
          <thead className="hidden md:table-header-group">
            <tr className="text-center">
              <th className="font-semibold uppercase text-xs p-2 bg-light text-primary border">Image</th>
              <th className="font-semibold uppercase text-xs p-2 bg-light text-primary border">Product</th>
              <th className="font-semibold uppercase text-xs p-2 bg-light text-primary border">Price</th>
              <th className="font-semibold uppercase text-xs p-2 bg-light text-primary border">Quantity</th>
              <th className="font-semibold uppercase text-xs p-2 bg-light text-primary border">Subtotal</th>
              <th className="font-semibold uppercase text-xs p-2 bg-light text-primary border">Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <TableRow {...product} key={product._id} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ProductCart;
