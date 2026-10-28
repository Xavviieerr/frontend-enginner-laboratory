import AboutPage from "./components/about-page";
import Footer from "./components/footer";
import HeroPage from "./components/hero-page";

export default function SearchPage() {
	return (
		<main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
			<div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
				<HeroPage />
				<AboutPage />
			</div>
			<Footer />
		</main>
	);
}
