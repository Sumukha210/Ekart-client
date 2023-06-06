import { secondaryFont } from "@/lib/fonts";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineShopping } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Logo, NavLink, SearchBar } from "./styles";

interface INavLinks {
  label: string;
  href: string;
}

export const navLinks: INavLinks[] = [
  { label: "Store", href: "/store" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { products } = useSelector((state: RootState) => state.cart);

  return (
    <nav className="fixed top-0 left-0 w-screen bg-white z-30">
      <div className="flex items-center justify-between w-11/12 mx-auto py-3">
        <div>
          <Logo
            href="/"
            className={`${secondaryFont.className} relative text-xl font-semibold tracking-widest after:bg-lime-400`}>
            Ekart.
          </Logo>
        </div>

        <ul className="flex items-center gap-8 font-semibold text-sm">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <NavLink
                className="after:bg-lime-400 relative text-gray-600 hover:text-black"
                href={href}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex gap-5 items-center">
          <div className="relative">
            <Link href="/cart">
              <AiOutlineShopping className="h-7 w-7 cursor-pointer  text-gray-500" />
            </Link>
            {products.length ? (
              <span className="bg-red-500 rounded-full h-[6px] w-[6px] absolute -top-[2px] -right-1"></span>
            ) : null}
          </div>

          <SearchBar className="relative h-9 bg-gray-200 overflow-hidden rounded-lg w-64">
            <input
              type="text"
              className="pl-8 text-sm bg-transparent w-full rounded-lg"
              placeholder="Search product"
            />
            <AiOutlineSearch className="icon h-4 w-4" />
          </SearchBar>

          <Link
            href="/login"
            className="border-2 rounded-full bg-lime-400 inline-block text-sm font-semibold tracking-wide px-6 py-[6px]">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
