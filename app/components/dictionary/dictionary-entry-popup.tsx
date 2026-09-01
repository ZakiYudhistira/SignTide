import { useEffect } from "react";

import type { DictionaryEntry } from "~/models/dictionary";

type DictionaryEntryPopupProps = {
  entry: DictionaryEntry;
  onClose: () => void;
};

export function DictionaryEntryPopup({ entry, onClose }: DictionaryEntryPopupProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-1/45 p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="w-full max-w-sm rounded-[2rem] border-4 border-ocean bg-white p-6 text-center shadow-[0_10px_0_#1d87cb]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dictionary-entry-label"
      >
        <div className="mx-auto flex aspect-square w-full max-w-64 items-center justify-center rounded-3xl bg-light-blue p-5">
          <img
            src={entry.imageUrl}
            alt={`Isyarat SIBI ${entry.label}`}
            className="size-full object-contain"
          />
        </div>
        <h2 id="dictionary-entry-label" className="mt-5 text-heading text-navy-1">
          {entry.label}
        </h2>
        <button type="button" className="welcoming-button mt-6" onClick={onClose}>
          Tutup
        </button>
      </section>
    </div>
  );
}
