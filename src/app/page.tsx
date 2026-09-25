"use client";

import Card from "@/features/home/components/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<div className="">
			<Card />
			<button onClick={() => router.push("/search-and-autocomplete")}>
				Go to search and autocomplete
			</button>
		</div>
	);
}
