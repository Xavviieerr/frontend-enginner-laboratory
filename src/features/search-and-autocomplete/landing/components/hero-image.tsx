import Image, { type StaticImageData } from "next/image";

type HeroImageProps = {
	src: StaticImageData;
	alt: string;
	className?: string;
	eager?: boolean;
	highPriority?: boolean;
	sizes?: string;
};

export default function HeroImage({
	src,
	alt,
	className = "",
	eager = false,
	highPriority = false,
	sizes = "(min-width: 768px) 24vw, 48vw",
}: HeroImageProps) {
	return (
		<div
			className={`group relative overflow-hidden bg-[var(--color-surface)] ${className}`}
		>
			<Image
				src={src}
				alt={alt}
				fill
				sizes={sizes}
				loading={eager ? "eager" : "lazy"}
				fetchPriority={highPriority ? "high" : "auto"}
				className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
			/>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 ring-1 ring-black/5 ring-inset"
			/>
		</div>
	);
}
