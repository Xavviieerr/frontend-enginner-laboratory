import type { Metadata } from "next";
import { Suspense } from "react";
import { PlaygroundPage } from "@/features/search-and-autocomplete";

export const metadata: Metadata = {
	title: "Search the Archive — Northstar",
	description:
		"An editorial index of considered objects from the Northstar archive.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PlaygroundPage />
    </Suspense>
  );
}
