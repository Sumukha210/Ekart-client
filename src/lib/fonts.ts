import { Montserrat, Playfair_Display_SC } from "next/font/google";

export const primaryFont = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const secondaryFont = Playfair_Display_SC({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});
