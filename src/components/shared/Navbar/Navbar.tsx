import { secondaryFont } from "@/lib/fonts";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
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
  return (
    <nav>
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
          <SearchBar className="relative h-8">
            <input
              type="text"
              className="border border-zinc-400 rounded-full pl-8 text-sm"
              placeholder="Search product"
            />
            <AiOutlineSearch className="icon h-4 w-4" />
          </SearchBar>

          <div className="relative">
            <AiOutlineShopping className="h-5 cursor-pointer w-5 text-gray-500" />
            <span className="bg-red-500 rounded-full h-[6px] w-[6px] absolute -top-[2px] -right-1"></span>
          </div>

          <div>
            <AiOutlineUser className="h-5 w-5 text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
