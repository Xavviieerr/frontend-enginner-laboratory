import {
	InlineCode,
	Section,
	Subsection,
} from "../components/journal-primitives";
import {
	limitations,
	manualChecks,
	testFiles,
} from "../journal-content";

const checks = [
	"pnpm typecheck",
	"pnpm lint",
	"pnpm test",
	"pnpm build",
];

export default function QualitySection() {
	return (
		<Section
			id="quality"
			number="06"
			label="Testing & quality"
			title={
				<>
					Evidence, not
					<span className="italic"> adjectives.</span>
				</>
			}
			intro="The project has a small automated core, a set of browser checks, and a deliberately short list of things that are still not covered."
		>
			<Subsection title="Automated checks">
				<p>
					The repository uses Node&apos;s built-in test runner against the pure
					utility modules. There are 16 tests across three files. They do not
					render components or touch the network.
				</p>

				<div className="mt-5 border-y border-[var(--color-border)]">
					{testFiles.map((file) => (
						<div
							key={file.file}
							className="grid gap-2 border-b border-[var(--color-border)] py-4 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-5"
						>
							<div>
								<code className="text-[11px] leading-5 text-[var(--color-text-primary)]">
									{file.file}
								</code>
								<p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
									{file.cases} tests
								</p>
							</div>
							<p className="text-sm leading-6 text-[var(--color-text-secondary)]">
								{file.coverage}
							</p>
						</div>
					))}
				</div>

				<div className="mt-5 flex flex-wrap gap-2">
					{checks.map((command) => (
						<code
							key={command}
							className="border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-[10px] leading-5 text-[var(--color-text-secondary)]"
						>
							{command}
						</code>
					))}
				</div>

				<p className="mt-4 text-xs leading-5 text-[var(--color-text-secondary)]">
					On the final pass, all four commands completed successfully. The
					test runner reported 16 passing tests, and the production build
					prerendered the root, search landing, archive, journal, and
					not-found routes as static pages.
				</p>
			</Subsection>

			<Subsection title="What I checked in the browser">
				<p>
					These were run against the local development server with the browser.
					The slow and failed-request checks were simulated by temporarily
					wrapping <InlineCode>fetch</InlineCode> in the page; they are not claims
					about a throttled or offline network.
				</p>

				<ol className="mt-5 border-y border-[var(--color-border)]">
					{manualChecks.map((check) => (
						<li
							key={check.scenario}
							className="border-b border-[var(--color-border)] py-4 last:border-b-0"
						>
							<p className="text-sm font-medium text-[var(--color-text-primary)]">
								{check.scenario}
							</p>
							<p className="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
								<span className="text-[var(--color-accent)]">Method.</span>{" "}
								{check.method}
							</p>
							<p className="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
								<span className="text-[var(--color-accent)]">Observed.</span>{" "}
								{check.observed}
							</p>
						</li>
					))}
				</ol>
			</Subsection>

			<Subsection title="Accessibility, performance, security">
				<p>
					The accessible structure is deliberate: a skip link, a labelled
					combobox with active-descendant navigation, a native dialog with focus
					restoration, semantic counts and status regions, visible focus rings,
					and reduced-motion handling. The palette uses the same tokens across the
					landing and archive, so the contrast story is consistent rather than
					page-specific. On the production build, Lighthouse scored the journal
					100 for Accessibility, Best Practices, and SEO. The performance
					category was not part of that run.
				</p>

				<p>
					The performance work is visible in the code: debouncing, aborting,
					caching, five-image pages, responsive image sizes through{" "}
					<InlineCode>next/image</InlineCode>, and eager loading only for the
					first cards. I did not run a performance benchmark or record field
					metrics, so I am not claiming a measured improvement.
				</p>

				<p>
					On security, results are rendered through React&apos;s normal escaping
					path; there is no{" "}
					<InlineCode>dangerouslySetInnerHTML</InlineCode>. Remote images are
					limited to <InlineCode>cdn.dummyjson.com</InlineCode> in the Next
					config. The public API is called from the client with no credentials. A
					production integration would need a server boundary for auth, rate
					limiting, response validation, and logs.
				</p>

				<p>
					There is no error telemetry or observability layer. The UI shows a
					generic search error and keeps technical details out of the surface;
					that is a reasonable user-facing default, but it is not enough for
					production diagnosis.
				</p>
			</Subsection>

			<Subsection title="What is still not covered">
				<ul className="space-y-2">
					{limitations.map((limitation) => (
						<li key={limitation} className="flex gap-3">
							<span
								aria-hidden="true"
								className="mt-2 h-1 w-1 shrink-0 bg-[var(--color-accent)]"
							/>
							<span>{limitation}</span>
						</li>
					))}
				</ul>
			</Subsection>
		</Section>
	);
}
