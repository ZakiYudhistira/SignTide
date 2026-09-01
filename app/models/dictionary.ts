export type DictionaryEntry = {
  id: string;
  label: string;
  imageUrl: string;
};

export type DictionarySection = {
  id: string;
  title: string;
  entries: DictionaryEntry[];
};
