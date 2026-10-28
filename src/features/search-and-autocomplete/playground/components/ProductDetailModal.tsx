"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "../types/search";
import { formatCategoryLabel, formatPrice } from "../utils/formatProduct";
import ProductImage from "./ProductImage";
import styles from "./ProductDetailModal.module.css";

type ProductDetailModalProps = {
  product: Product;
  onClose: () => void;
};

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const productImages = product.images.filter(Boolean);
  const galleryImages =
    productImages.length > 0
      ? productImages
      : product.thumbnail
        ? [product.thumbnail]
        : [];
  const [activeImage, setActiveImage] = useState(galleryImages[0] ?? "");
  const categoryLabel = formatCategoryLabel(product.category);
  const stockLabel =
    product.stock !== undefined ? `${product.stock} available` : null;
  const availability = product.availabilityStatus
    ? stockLabel
      ? `${product.availabilityStatus} · ${stockLabel}`
      : product.availabilityStatus
    : (stockLabel ?? "Availability on request");

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    closeButtonRef.current?.focus();

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;

      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus();
      } else {
        document.getElementById("collection-search")?.focus();
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="product-dialog-title"
      aria-describedby="product-dialog-description"
      aria-modal="true"
      className={styles.dialog}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="relative mx-auto flex h-[100dvh] w-full flex-col overflow-hidden bg-[var(--color-background)] shadow-[0_40px_120px_rgba(23,22,21,0.35)] sm:h-[min(92dvh,900px)] sm:w-[min(94vw,1320px)] sm:border sm:border-[var(--color-border)] lg:grid lg:grid-cols-[1.08fr_0.92fr]">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] transition-colors duration-300 hover:border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] motion-reduce:transition-none"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="h-4 w-4"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="relative flex min-h-[42vh] flex-col overflow-hidden bg-[var(--color-surface)] lg:min-h-0">
          <span className="absolute left-5 top-5 z-10 text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
            No. {String(product.id).padStart(3, "0")}
          </span>

          <div className="relative flex-1">
            <ProductImage
              key={activeImage || "empty"}
              src={activeImage}
              alt={product.title}
              sizes="(max-width: 1023px) 100vw, 54vw"
              loading="eager"
              className="object-contain p-8 mix-blend-multiply sm:p-14 lg:p-16"
            />
          </div>

          {galleryImages.length > 1 && (
            <div
              role="group"
              aria-label="Product images"
              className="relative z-10 flex gap-2 overflow-x-auto px-5 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {galleryImages.slice(0, 6).map((image, index) => {
                const isActive = image === activeImage;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => {
                      setActiveImage(image);
                    }}
                    aria-label={`View image ${index + 1} of ${Math.min(galleryImages.length, 6)}`}
                    aria-pressed={isActive}
                    className={`relative h-12 w-12 shrink-0 overflow-hidden border transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] motion-reduce:transition-none ${
                      isActive
                        ? "border-[var(--color-accent)] opacity-100"
                        : "border-[var(--color-border-strong)] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <ProductImage
                      src={image}
                      alt=""
                      sizes="48px"
                      compact
                      className="object-contain p-1 mix-blend-multiply"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="flex items-center justify-between gap-4 pr-12">
            <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              {product.brand ?? "Northstar archive"}
            </p>
            <p className="text-right text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              {categoryLabel}
            </p>
          </div>

          <h2
            id="product-dialog-title"
            className="mt-7 font-display text-[clamp(2.3rem,4.2vw,4.25rem)] leading-[0.95] tracking-[-0.045em] text-[var(--color-text-primary)]"
          >
            {product.title}
          </h2>

          <div className="mt-6 flex items-end justify-between gap-6 border-b border-[var(--color-border)] pb-5">
            <p className="font-display text-2xl tracking-[-0.02em] text-[var(--color-text-primary)]">
              {formatPrice(product.price)}
            </p>

            <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              <span aria-hidden="true" className="text-[var(--color-accent)]">
                ★
              </span>
              {product.rating.toFixed(2)} / 5
            </p>
          </div>

          <p
            id="product-dialog-description"
            className="mt-6 text-sm leading-7 text-[var(--color-text-secondary)]"
          >
            {product.description}
          </p>

          {product.tags && product.tags.length > 0 && (
            <ul
              aria-label="Object tags"
              className="mt-5 flex flex-wrap gap-2"
            >
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-[var(--color-text-secondary)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-[var(--color-border)] pt-6 text-xs">
            <div>
              <dt className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                Availability
              </dt>
              <dd className="mt-1.5 leading-5 text-[var(--color-text-primary)]">
                {availability}
              </dd>
            </div>

            {product.sku && (
              <div>
                <dt className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Reference
                </dt>
                <dd className="mt-1.5 break-words leading-5 text-[var(--color-text-primary)]">
                  {product.sku}
                </dd>
              </div>
            )}

            {product.shippingInformation && (
              <div>
                <dt className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Shipping
                </dt>
                <dd className="mt-1.5 leading-5 text-[var(--color-text-primary)]">
                  {product.shippingInformation}
                </dd>
              </div>
            )}

            {product.warrantyInformation && (
              <div>
                <dt className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Warranty
                </dt>
                <dd className="mt-1.5 leading-5 text-[var(--color-text-primary)]">
                  {product.warrantyInformation}
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-auto pt-10">
            <button
              type="button"
              onClick={onClose}
              className="group inline-flex items-center gap-2 border-b border-[var(--color-text-primary)] pb-1 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-primary)] transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)] motion-reduce:transition-none"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
              >
                ←
              </span>
              Return to collection
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
