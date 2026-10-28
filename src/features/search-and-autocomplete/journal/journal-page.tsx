import JournalArticle from "./journal-article";
import JournalFooter from "./components/journal-footer";
import JournalMasthead from "./components/journal-masthead";
import TableOfContents from "./components/table-of-contents";

export default function SearchJournal() {
	return (
		<main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] selection:bg-[var(--color-accent)] selection:text-[var(--color-accent-foreground)]">
			<a
				href="#journal-article"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--color-text-primary)] focus:px-4 focus:py-2 focus:text-[9px] focus:uppercase focus:tracking-[0.18em] focus:text-[var(--color-background)]"
			>
				Skip to the journal
			</a>

			<div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
				<JournalMasthead />

				<div className="grid grid-cols-1 gap-10 border-b border-[var(--color-border)] py-10 lg:grid-cols-12 lg:gap-8 lg:py-14">
					<TableOfContents />
					<JournalArticle />
				</div>
			</div>

			<JournalFooter />
		</main>
	);
}
