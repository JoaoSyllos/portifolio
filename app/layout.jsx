import { Manrope } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import NeedleField from "@/components/NeedleField";
import SmoothScroller from "@/components/SmoothScroller";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portifolio",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={manrope.variable} suppressHydrationWarning>
        <NeedleField />
        <CursorGlow />
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
