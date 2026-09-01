import { useCallback, useState } from "react";

import type {
  DictionaryEntry,
  DictionarySection as DictionarySectionData,
} from "~/models/dictionary";

import { DictionaryEntryPopup } from "./dictionary-entry-popup";
import { DictionarySection } from "./dictionary-section";

const sectionColors = ["blue", "sky", "yellow"] as const;

export function DictionaryPage({ sections }: { sections: DictionarySectionData[] }) {
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const closePopup = useCallback(() => setSelectedEntry(null), []);

  return (
    <div className="min-h-full bg-background px-5 pb-32 pt-8">
      <header className="text-center">
        <h1 className="text-heading text-navy-1">Ayo Belajar SIBI!</h1>
        <p className="mt-2 text-title text-ocean">Panduan Menghafal Materi SignTide!</p>
      </header>

      {sections.map((section, index) => (
        <DictionarySection
          key={section.id}
          section={section}
          color={sectionColors[index % sectionColors.length]}
          onSelectEntry={setSelectedEntry}
        />
      ))}

      {selectedEntry && (
        <DictionaryEntryPopup entry={selectedEntry} onClose={closePopup} />
      )}
    </div>
  );
}
