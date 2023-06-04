import { secondaryFont } from "@/lib/fonts";
import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import { SearchBar } from "./styles";

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
  return (
    <nav>
      <div className="flex items-center justify-between w-11/12 mx-auto py-2">
        <div>
          <Link
            href="/"
            className={`${secondaryFont.className} text-3xl font-semibold `}>
            Ekart
          </Link>
        </div>

        <ul className="flex items-center gap-6 font-medium text-sm">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-5 items-center">
          <SearchBar className="relative h-8">
            <input
              type="text"
              className="border border-gray-400 rounded-full pl-8 text-sm"
              placeholder="Search product"
            />
            <AiOutlineSearch className="icon h-5 w-5" />
          </SearchBar>

          <div className="relative">
            <AiOutlineShopping className="h-5 w-5 text-gray-500" />
            <span className="bg-red-500 rounded-full h-[6px] w-[6px] absolute -top-[2px] -right-1"></span>
          </div>

          <div>
            <AiOutlineUser className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
