import JacketImg from "@/assets/jacket.jpg";
import SunglassImg from "@/assets/sunglass-blue.jpg";
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
    title:
      "Timeless Classics: Discover Wardrobe Staples that Never Go Out of Style",
    category: "clothing",
    image: JacketImg,
  },
  {
    title:
      "Urban Sophistication: Discover our Modern and Edgy Sunglass Collection",
    category: "sunglass",
    image: SunglassImg,
  },
  {
    title: "Embrace Minimalism: Discover our Sleek and Modern Watches",
    category: "watches",
    image: WatchImg,
  },
];

export const Slide = styled.div`
  &.active {
    display: block;
  }
`;
