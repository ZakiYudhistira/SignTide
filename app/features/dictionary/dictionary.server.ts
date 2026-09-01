import dictionaryData from "~/data/dictionary.json";
import type { DictionarySection } from "~/models/dictionary";
import { learningAssetUrl } from "~/utils/learning-asset.server";

type DictionarySource = Record<string, Record<string, string>>;

export function getDictionarySections(): DictionarySection[] {
  return Object.entries(dictionaryData as DictionarySource).map(
    ([sectionTitle, entries], sectionIndex) => ({
      id: `dictionary-section-${sectionIndex}`,
      title: sectionTitle,
      entries: Object.entries(entries).map(([label, imagePath], entryIndex) => ({
        id: `dictionary-entry-${sectionIndex}-${entryIndex}`,
        label,
        imageUrl: learningAssetUrl(imagePath),
      })),
    }),
  );
}
