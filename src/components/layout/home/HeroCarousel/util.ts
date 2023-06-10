import BagsImg from "@/assets/bags.jpg";
import JacketImg from "@/assets/jacket.jpg";
import WatchImg from "@/assets/watch.jpg";
import { StaticImageData } from "next/image";
import styled from "styled-components";

interface Data {
  title: string;
  category: string;
  image: StaticImageData;
}

export const data: Data[] = [
  {
    title: "Timeless Classics: Discover Wardrobe Staples that Never Go Out of Style",
    category: "mens-shirts",
    image: JacketImg,
  },
  {
    title: "Eternal Sophistication: Unveiling Timeless Bags for Effortless Style",
    category: "womens-bags",
    image: BagsImg,
  },
  {
    title: "Embrace Minimalism: Discover our Sleek and Modern Watches",
    category: "mens-watches",
    image: WatchImg,
  },
];

export const Slide = styled.div`
  &.active {
    display: block;
  }
`;
