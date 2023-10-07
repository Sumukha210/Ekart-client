import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IProductData } from "./types";

interface ProductListItemprops {
  data: IProductData;
  handleCloseMenu: () => void;
}

const ProductListItem: React.FC<ProductListItemprops> = ({ data, handleCloseMenu }) => {
  const router = useRouter();

  return (
    <>
      <li
        onClick={() => {
          router.push(`/collections/${data?._id}?name=${encodeURIComponent(data?.title)}`);
          handleCloseMenu();
        }}
        key={data._id}
        className="text-sm duration-300 hover:bg-zinc-200 py-4 px-5 flex items-center gap-x-6 cursor-pointer">
        <figure>
          <NextImage
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/product_${data?.id}/image_1.jpg`}
            height={40}
            width={40}
            className="object-contain h-full"
            alt={data.title}
          />
        </figure>

        <div>
          <h3
            dangerouslySetInnerHTML={{
              __html: `${data?.title} from <a href="/collections/brand/${data?.brand}" class="text-blue-500 font-semibold" target="_blank">${data.brand}</a> `,
            }}></h3>
          <Link target="_blank" href={`/collections?category=${data?.category}`} rel="" className="text-xs  text-blue-500 font-semibold mt-1 tracking-wider">
            {data?.category}
          </Link>
        </div>
      </li>
    </>
  );
};

export default ProductListItem;
