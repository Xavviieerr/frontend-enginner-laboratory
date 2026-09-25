import { Bodoni_Moda, Inter } from "next/font/google";

export const displayFont = Bodoni_Moda({
	variable: "--font-display",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const bodyFont = Inter({
	variable: "--font-body",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});
