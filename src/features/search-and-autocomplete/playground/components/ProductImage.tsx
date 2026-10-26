"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  loading?: "eager" | "lazy";
  compact?: boolean;
};

export default function ProductImage({
  src,
  alt,
  sizes,
  className = "",
  loading = "lazy",
  compact = false,
}: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = src;

  if (!imageSrc || failedSrc === imageSrc) {
    return (
      <span
        className={
          compact
            ? "absolute inset-0 flex items-center justify-center text-[var(--color-text-secondary)]"
            : "absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]"
        }
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className={compact ? "h-4 w-4 opacity-55" : "h-6 w-6 opacity-55"}
        >
          <rect x="3.5" y="4.5" width="17" height="15" rx="1" />
          <circle cx="9" cy="10" r="1.5" />
          <path d="m5 17 4.5-4.5 3 3L16 12l3 3" />
        </svg>
        <span className={compact ? "sr-only" : undefined}>
          Image unavailable
        </span>
      </span>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes={sizes}
      loading={loading}
      draggable={false}
      onError={() => {
        setFailedSrc(imageSrc);
      }}
      className={className}
    />
  );
}
