import { DictionaryPage } from "~/components/dictionary/dictionary-page";

import type { Route } from "./+types/dictionary";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kamus | SignTide" },
    { name: "description", content: "SignTide dictionary" },
  ];
}

export default function Dictionary() {
  return <DictionaryPage />;
}
