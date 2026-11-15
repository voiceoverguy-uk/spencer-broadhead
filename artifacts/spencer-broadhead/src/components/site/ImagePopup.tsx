import type { ReactElement } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type ImagePopupProps = {
  src: string;
  title: string;
  alt: string;
  children: ReactElement;
  readable?: boolean;
};

/** Radix provides modal focus containment, Escape, dismissal and focus return. */
export function ImagePopup({ src, title, alt, children, readable = false }: ImagePopupProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="image-popup-backdrop" data-testid="image-popup-backdrop" />
        <Dialog.Content className="image-popup" aria-describedby={undefined} data-testid="image-popup">
          <div className="image-popup-header">
            <Dialog.Title className="text-lg font-semibold" data-testid="text-image-popup-title">{title}</Dialog.Title>
            <Dialog.Close className="image-popup-close" data-testid="button-close-image-popup">
              <X className="h-5 w-5" aria-hidden="true" /> Close
            </Dialog.Close>
          </div>
          <div
            className="image-popup-body"
            tabIndex={readable ? 0 : undefined}
            role={readable ? "region" : undefined}
            aria-label={readable ? "Newspaper cutting — scroll to read the full article" : undefined}
            data-testid="image-popup-body"
          >
            <img
              src={src}
              alt={alt}
              className={readable ? "image-popup-image image-popup-readable" : "image-popup-image"}
              data-testid="img-image-popup"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
