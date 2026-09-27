import Image, { type StaticImageData } from "next/image";

type HeroImageProps = {
	src: StaticImageData;
	alt: string;
	className?: string;
};

export default function HeroImage({
	src,
	alt,
	className = "",
}: HeroImageProps) {
	return (
		<div className={`group relative overflow-hidden ${className}`}>
			<Image
				src={src}
				alt={alt}
				fill
				className="object-cover transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-105"
				sizes="(max-width: 768px) 50vw, 25vw"
			/>
		</div>
	);
}
