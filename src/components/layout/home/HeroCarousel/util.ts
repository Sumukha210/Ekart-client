import BagsImg from "@/assets/bags.jpg";
import JacketImg from "@/assets/jacket.jpg";
import WatchImg from "@/assets/watch.jpg";
import { StaticImageData } from "next/image";
import styled from "styled-components";

interface Data {
  category: string;
  title: string;
  description: string;
  image: StaticImageData;
}

export const data: Data[] = [
  {
    title: "Timeless Classics: Discover Wardrobe Staples that Never Go Out of Style",
    description:
      "Explore our collection of timeless wardrobe staples that will never go out of style. From classic shirts to versatile accessories, find the perfect pieces to elevate your everyday looks.",
    category: "mens-shirts",
    image: JacketImg,
  },
  {
    title: "Eternal Sophistication: Unveiling Timeless Bags for Effortless Style",
    description:
      "Discover our exquisite collection of timeless bags that exude sophistication and elevate your style effortlessly. From elegant totes to chic clutches, find the perfect accessory to complement any outfit.",
    category: "womens-bags",
    image: BagsImg,
  },
  {
    title: "Embrace Minimalism: Discover our Sleek and Modern Watches",
    description:
      "Embrace the beauty of minimalism with our sleek and modern watches. With clean lines and understated elegance, our watches are designed to enhance your everyday style.",
    category: "mens-watches",
    image: WatchImg,
  },
];

export const Slide = styled.div`
  &.active {
    display: block;
  }
`;
