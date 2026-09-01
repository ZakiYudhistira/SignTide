import type { DictionarySection as DictionarySectionData } from "~/models/dictionary";

import { DictionaryCell, type DictionaryCellColor } from "./dictionary-cell";

type DictionarySectionProps = {
  section: DictionarySectionData;
  color: DictionaryCellColor;
  onSelectEntry: (entry: DictionarySectionData["entries"][number]) => void;
};

export function DictionarySection({ section, color, onSelectEntry }: DictionarySectionProps) {
  return (
    <section className="mt-8 border-t-4 border-[#ffd278] pt-3">
      <h2 className="mb-4 text-body-large text-navy-1">{section.title}</h2>
      <div className="grid grid-cols-5 gap-x-4 gap-y-6">
        {section.entries.map((entry) => (
          <DictionaryCell
            key={entry.id}
            label={entry.label}
            color={color}
            onClick={() => onSelectEntry(entry)}
          />
        ))}
      </div>
    </section>
  );
}
