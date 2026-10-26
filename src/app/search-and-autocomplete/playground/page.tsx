import { Suspense } from "react";
import { PlaygroundPage } from "@/features/search-and-autocomplete";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PlaygroundPage />
    </Suspense>
  );
}
