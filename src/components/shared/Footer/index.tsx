import Link from "next/link";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { CgTwitter } from "react-icons/cg";
import { CiFacebook } from "react-icons/ci";
import SectionContainer from "../modules/SectionContainer";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#1C1D1D] text-white mt-20">
        <SectionContainer className="mt-0 pt-12">
          <div className="mx-auto">
            <div className="flex items-center justify-center text-center space-x-8 flex-wrap text-sm font-medium text-gray-300">
              <Link href="/">Home</Link>
              <Link href="/store">Store</Link>
              <Link href="/about">About</Link>
              <Link href="/wishlist">Wishlist</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/register">Register</Link>
              <Link href="/login">Login</Link>
            </div>

            <div className="mt-6 flex space-x-6 items-center justify-center text-gray-400">
              <CiFacebook className="h-8 w-8 cursor-pointer" title="Facebook" />
              <BsInstagram className="h-6 w-6 cursor-pointer" title="Instagram" />
              <CgTwitter className="h-7 w-7 cursor-pointer" title="Twitter" />
              <AiOutlineWhatsApp className="h-7 w-7 cursor-pointer" title="WhatsApp" />
            </div>

            <hr className="mt-6 mb-4" />

            <div className="text-gray-300 text-sm text-center pb-6">&copy; {new Date().getFullYear()} Ekart. All rights reserved.</div>
          </div>
        </SectionContainer>
      </footer>
    </>
  );
};

export default Footer;
