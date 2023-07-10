import { DM_Serif_Display, Sora } from "next/font/google";

export const primaryFont = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const secondaryFont = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
