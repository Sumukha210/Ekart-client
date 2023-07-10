import LinkButton from "@/elements/LinkButton";
import { secondaryFont } from "@/lib/fonts";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch, AiOutlineShopping } from "react-icons/ai";
import { useSelector } from "react-redux";
import SearchScreen from "./SearchScreen";
import { Ul } from "./styles";

interface INavLinks {
  label: string;
  href: string;
}

export const navLinks: INavLinks[] = [
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Wishlist", href: "/wishlist" },
];

const Navbar = () => {
  const { products } = useSelector((state: RootState) => state.cart);
  const [openMenu, setOpenMenu] = useState(false);
  const [showSearchScreen, setShowSearchScreen] = useState(false);

  const handleShowSearchScreen = () => setShowSearchScreen(true);

  return (
    <>
      <nav className="sticky top-0 left-0 w-full z-30 bg-white shadow-md shadow-light">
        <div className="w-11/12 mx-auto  h-14 flex items-center justify-between">
          <Link href="/" className={`${secondaryFont.className} relative text-2xl tracking-widest`}>
            Ekart.
          </Link>

          <Ul className={`flex items-center gap-8 font-medium text-lg md:text-sm h-full ${openMenu ? "active" : ""}`}>
            {navLinks.map(({ label, href }) => (
              <li key={label} onClick={() => setOpenMenu(false)}>
                <Link className="text-dark transition hover:text-primary block" href={href}>
                  {label}
                </Link>
              </li>
            ))}

            <li className="sm:hidden">
              <Link className="text-dark transition hover:text-primary block" href={"/login"}>
                Login
              </Link>
            </li>
          </Ul>

          <div className="flex items-center gap-5">
            <AiOutlineSearch title="Search" className="h-6 w-6 cursor-pointer mt-1 text-dark transition hover:text-primary" onClick={handleShowSearchScreen} />

            <div className="relative mr-1">
              <Link href="/cart">
                <AiOutlineShopping className="h-6 w-6 cursor-pointer text-dark  transition hover:text-primary" title="Cart" />
              </Link>
              {products.length ? <span className="bg-red-500 rounded-full h-[6px] w-[6px] absolute -top-[2px] -right-1"></span> : null}
            </div>

            <LinkButton className="hidden sm:inline-block" href="/login">
              Login
            </LinkButton>

            <div className="md:hidden">
              {openMenu ? (
                <AiOutlineClose onClick={() => setOpenMenu(false)} className="h-6 w-6 cursor-pointer text-dark  transition hover:text-primary" title="close menu" />
              ) : (
                <AiOutlineMenu onClick={() => setOpenMenu(true)} className="h-6 w-6 cursor-pointer text-dark  transition hover:text-primary" title="open menu" />
              )}
            </div>
          </div>
        </div>
      </nav>

      <SearchScreen show={showSearchScreen} handleClose={() => setShowSearchScreen(false)} />
    </>
  );
};
export default Navbar;
