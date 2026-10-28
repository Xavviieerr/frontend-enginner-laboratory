import ArchitectureSection from "./sections/architecture-section";
import BriefSection from "./sections/brief-section";
import DirectionSection from "./sections/direction-section";
import HardPartsSection from "./sections/hard-parts-section";
import InteractionSection from "./sections/interaction-section";
import JournalOpening from "./sections/journal-opening";
import QualitySection from "./sections/quality-section";
import ReflectionSection from "./sections/reflection-section";

export default function JournalArticle() {
	return (
		<article
			id="journal-article"
			aria-labelledby="journal-title"
			className="min-w-0 scroll-mt-8 lg:col-span-8 lg:col-start-5"
		>
			<JournalOpening />
			<BriefSection />
			<DirectionSection />
			<InteractionSection />
			<ArchitectureSection />
			<HardPartsSection />
			<QualitySection />
			<ReflectionSection />
		</article>
	);
}
