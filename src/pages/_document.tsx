import { primaryFont } from "@/lib/fonts";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={primaryFont.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
