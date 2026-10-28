import type { Metadata } from "next";
import { JournalPage } from "@/features/search-and-autocomplete";

export const metadata: Metadata = {
	title: "The Search, Considered — Northstar Engineering Journal",
	description:
		"A case study in product thinking, editorial interface design, and asynchronous frontend behaviour behind the Northstar search archive.",
};

export default function Page() {
	return <JournalPage />;
}
