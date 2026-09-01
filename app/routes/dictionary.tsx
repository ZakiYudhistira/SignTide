import { DictionaryPage } from "~/components/dictionary/dictionary-page";
import { getDictionarySections } from "~/features/dictionary/dictionary.server";

import type { Route } from "./+types/dictionary";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kamus | SignTide" },
    { name: "description", content: "SignTide dictionary" },
  ];
}

export function loader() {
  return { sections: getDictionarySections() };
}

export default function Dictionary({ loaderData }: Route.ComponentProps) {
  return <DictionaryPage sections={loaderData.sections} />;
}
