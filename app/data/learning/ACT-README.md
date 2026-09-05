# Act, Level, and Problem Configuration Guide

This guide explains how to add or change learning acts, level-map nodes, level
content, rewards, and optional cooking features.

The learning system is data-driven. A normal level does **not** need its own
React Router route. All levels use the existing dynamic route:

```text
/level/:levelId
```

For example, the level ID `section-6-lvl-2` is opened at:

```text
/level/section-6-lvl-2
```

## Terminology

In the current project, an **act** and a **section** refer to the same
progression unit:

```text
Act 1 = section-1
Act 2 = section-2
```

Use `Act` for user-facing labels and `section-x` for IDs and persisted
progression keys.

A complete act consists of two connected data definitions:

1. The map definition in `app/data/learning/act-*.ts`.
2. The playable level definitions in `app/data/levels/section-*/`.

The same level ID must be present in both definitions.

## Important Files

| File | Responsibility |
| --- | --- |
| `app/data/learning/act-catalog.ts` | Registers acts and defines their display order. |
| `app/data/learning/act-*.ts` | Configures one act's lessons, map, decorations, rewards, and optional kitchen. |
| `app/data/levels/level-catalog.server.ts` | Registers all playable level catalogs and defines scored problem types. |
| `app/data/levels/section-*/section-*-catalog.server.ts` | Maps level IDs to their metadata and problem arrays. |
| `app/models/learning.ts` | Types for acts, map nodes, decorations, progression, and cooking. |
| `app/models/level.ts` | Public types for levels and problem renderers. |
| `app/components/levels/problem-renderer.tsx` | Runtime registry for problem UI components. |
| `app/features/levels/level-session.server.ts` | Removes private answers and validates submitted answers. |
| `supabase/setup/complete_level_and_award_xp.sql` | Authoritative backend list of levels, order, XP, and rewards. |

## ID Convention

Use these formats consistently:

```text
Act/section: section-6
Level:       section-6-lvl-1
Problem:     section-6-lvl-1-problem-1
Decoration:  unique-readable-name
```

Requirements:

- Act IDs must be unique.
- Level IDs must be unique across the entire application.
- Problem IDs must be unique within a level.
- A lesson's ID in `act-*.ts` must exactly match its ID in the level catalog.
- IDs are persisted in Supabase. Renaming a released ID is a data migration,
  not only a visual change.

## Canonical Ordering

Act order comes from the property order in `actCatalog`.

Lesson order comes from the order of the `actXLessons` array. It does not come
from the node coordinates or the level catalog.

The progression logic unlocks:

1. The first incomplete, available lesson in the current act.
2. The next act only after every available lesson in the previous act is
   completed.

Therefore, when changing lesson order, also update the backend prerequisite
order in `complete_level_and_award_xp.sql`.

## Creating an Act

Create a file such as:

```text
app/data/learning/act-six.ts
```

Basic example:

```ts
import type {
  ActCookingFeature,
  ActMapConfig,
  LessonNodeConfig,
} from "~/models/learning";

export const ACT_SIX_ID = "section-6";

// Array order is the canonical lesson order.
export const actSixLessons: LessonNodeConfig[] = [
  {
    id: "section-6-lvl-1",
    x: 220,
    y: 100,
    title: "Pelajaran Pertama",
    lessonLabel: "Lesson 1/2",
    xp: 10,
    available: true,
    icon: "/Levels/active.png",
    iconAlt: "Available lesson",
  },
  {
    id: "section-6-lvl-2",
    x: 140,
    y: 270,
    title: "Tantangan Akhir",
    lessonLabel: "Lesson 2/2",
    xp: 10,
    available: true,
    icon: "/Levels/trophy.png",
    iconAlt: "Final challenge with trophy icon",
  },
];

export const actSixMap: ActMapConfig = {
  width: 390,
  height: 370,
  path: "M220 100 C300 135 250 230 140 270",
  decorations: [],
};

export const actSixCooking: ActCookingFeature = {
  enabled: false,
};
```

### Lesson fields

| Field | Meaning |
| --- | --- |
| `id` | Shared identifier used by the map, level catalog, progression JSON, and SQL function. |
| `x`, `y` | Center position of the node in the map's SVG coordinate system. |
| `title` | Title shown in the level popup. |
| `lessonLabel` | Display-only sequence label. Keep it consistent with the array order. |
| `xp` | XP displayed in the UI. Backend XP is separately defined in SQL. |
| `available` | Whether the lesson participates in normal unlocking and act completion. |
| `icon` | Icon shown while the level is active or locked. Completed nodes use the generated checkmark. |
| `iconAlt` | Accessible description of the icon. |
| `reward` | Optional map decoration and collectible awarded by this level. |

Setting `available: false` leaves the node locked and excludes it from the
requirements for completing the act. It is suitable for unfinished content.

## Configuring the Map

The map uses one coordinate system defined by `width` and `height`.
Lesson nodes, SVG paths, and decorations all use that coordinate system.

```ts
export const actSixMap: ActMapConfig = {
  width: 390,
  height: 500,
  path: "M220 100 C320 140 300 240 140 280",
  decorations: [
    {
      id: "mascot-decoration",
      x: 310,
      y: 220,
      width: 160,
      image: "/signtide_character.png",
      alt: "SignTide mascot",
      zIndex: 2,
    },
  ],
};
```

### SVG path syntax used by the maps

```text
M x y
```

Moves the path to the first lesson node.

```text
C control1X control1Y control2X control2Y endX endY
```

Draws a cubic curve to the next node. The final `endX endY` should normally
match the next lesson's `x` and `y`.

Example:

```text
M220 100 C320 130 280 230 140 270
```

The path begins at `(220, 100)` and ends at `(140, 270)`. The two control
points determine how sharply it curves.

Map guidelines:

- Keep every lesson node inside the `width` and `height` bounds.
- Make the SVG path pass through lesson centers in lesson-array order.
- Increase `height` when adding more vertical content.
- Give every decoration a unique ID and useful alt text.
- Decoration `width` is measured in map coordinate units.
- Use `zIndex` when a decoration must appear above or below another item.

## Registering an Act

Import the new act in `app/data/learning/act-catalog.ts` and append it in the
intended progression order:

```ts
import {
  ACT_SIX_ID,
  actSixCooking,
  actSixLessons,
  actSixMap,
} from "./act-six";

export const actCatalog = {
  // Existing acts...
  [ACT_SIX_ID]: {
    id: ACT_SIX_ID,
    label: "Act 6",
    title: "Judul Act!",
    titleColor: "#76bce9",
    nextSectionLabel: "Selesai",
    lessons: actSixLessons,
    map: actSixMap,
    cooking: actSixCooking,
  },
} satisfies Record<string, ActDefinition>;
```

Appending an act changes progression order. Inserting it in the middle makes
later acts depend on it.

## Creating the Section Level Catalog

Create:

```text
app/data/levels/section-6/section-6-catalog.server.ts
```

Example:

```ts
import type { ScoredLevelDefinition } from "../level-catalog.server";

import { level1Problems } from "./section-6-lvl-1.server";
import { level2Problems } from "./section-6-lvl-2.server";

export const section6LevelCatalog = {
  "section-6-lvl-1": {
    id: "section-6-lvl-1",
    title: "Pelajaran Pertama",
    description: "Deskripsi pelajaran pertama.",
    lives: 5,
    problems: level1Problems,
  },
  "section-6-lvl-2": {
    id: "section-6-lvl-2",
    title: "Tantangan Akhir",
    description: "Tantangan akhir Act 6.",
    lives: 5,
    problems: level2Problems,
  },
} satisfies Record<string, ScoredLevelDefinition>;
```

Then register the section in `app/data/levels/level-catalog.server.ts`:

```ts
import { section6LevelCatalog } from "./section-6/section-6-catalog.server";

export const levelCatalog = {
  // Existing catalogs...
  ...section6LevelCatalog,
} satisfies Record<string, ScoredLevelDefinition>;
```

Do not add a new route to `app/routes.ts`. The existing
`level/:levelId` route loads the level by its catalog identifier.

## Creating a Level's Problems

A level can contain any mixture of supported problem types:

```ts
export const level1Problems = defineProblems([
  imageProblem,
  textProblem,
  orderingProblem,
  matchingProblem,
]);
```

Problem array order is the order shown to the player. Every level must contain
at least one problem.

Keep scored definitions in `.server.ts` files. Correct answers are removed by
the server loader before the level is sent to the browser.

## Learning Assets

### Supabase Storage

Use `learningAssetUrl()` for assets in the public `learning_asset` bucket:

```ts
import { learningAssetUrl } from "~/utils/learning-asset.server";

const image = learningAssetUrl("kata/Tas.png");
```

This produces a public Storage URL using `VITE_SUPABASE_URL). Folder and
filename capitalization must exactly match the bucket object.

Because this utility reads a server environment variable, use it only from
server modules such as `*.server.ts`.

### Local public assets

Files in `public/` use root-relative paths:

```ts
const mascot = "/signtide_character.png";
const bread = "/quest/bread.png";
```

Do not include `public` in the URL.

## Supported Problem Types

The problem type is configured per problem, not per level. A single level may
mix all the types below.

### 1. Image multiple choice

The player reads a prompt and selects one image.

```ts
import type { ScoredImageMultipleProblem } from "../level-catalog.server";

const problem: ScoredImageMultipleProblem = {
  id: "section-6-lvl-1-problem-1",
  type: "image-multiple",
  prompt: "Pilih gambar untuk huruf A.",
  choices: [
    {
      id: "a",
      label: "",
      visual: {
        kind: "image",
        src: learningAssetUrl("alphabet/SIBI_A.png"),
        alt: "Isyarat tangan untuk huruf A",
      },
    },
    {
      id: "b",
      label: "",
      visual: {
        kind: "image",
        src: learningAssetUrl("alphabet/SIBI_B.png"),
        alt: "Isyarat tangan untuk huruf B",
      },
    },
  ],
  correctChoiceId: "a",
};
```

For alphabet problems, prefer the existing `imageMultipleProblem()` helper in
`app/data/levels/section-1/problem-helpers.server.ts`.

### 2. Text multiple choice

The player selects one text answer.

```ts
import type { ScoredMultipleChoiceProblem } from "../level-catalog.server";

const problem: ScoredMultipleChoiceProblem = {
  id: "section-6-lvl-1-problem-2",
  type: "multiple-choice",
  prompt: "Apa arti isyarat tersebut?",
  choices: [
    { id: "makan", label: "Makan" },
    { id: "minum", label: "Minum" },
    { id: "tidur", label: "Tidur" },
    { id: "belajar", label: "Belajar" },
  ],
  correctChoiceId: "makan",
};
```

`correctChoiceId` must match one choice `id`, not its visible label.

### 3. Image prompt with text choices

The player sees one image and selects one text answer.

```ts
import type {
  ScoredImagePromptMultipleChoiceProblem,
} from "../level-catalog.server";

const problem: ScoredImagePromptMultipleChoiceProblem = {
  id: "section-6-lvl-1-problem-3",
  type: "image-prompt-multiple-choice",
  prompt: "Kata apakah ini?",
  promptVisual: {
    kind: "image",
    src: learningAssetUrl("kata/Tas.png"),
    alt: "Isyarat untuk kata Tas",
  },
  choices: [
    { id: "tas", label: "Tas" },
    { id: "buku", label: "Buku" },
    { id: "meja", label: "Meja" },
    { id: "kursi", label: "Kursi" },
  ],
  correctChoiceId: "tas",
};
```

For alphabet problems, `imagePromptProblem()` can generate this configuration.

### 4. Sign images to ordered words

The player translates an ordered sequence of sign images by arranging words.

```ts
import type { ScoredSignToWordOrderProblem } from "../level-catalog.server";

const problem: ScoredSignToWordOrderProblem = {
  id: "section-6-lvl-1-problem-4",
  type: "sign-to-word-order",
  eyebrow: "SUSUN KALIMAT",
  prompt: "Susun terjemahan dari isyarat berikut!",
  mascot: {
    image: "/signtide_character.png",
    alt: "Maskot SignTide memberi petunjuk",
  },
  imageOrder: [
    {
      kind: "image",
      src: learningAssetUrl("kata/Aku.png"),
      alt: "Isyarat untuk kata Aku",
    },
    {
      kind: "image",
      src: learningAssetUrl("kata/TidakPaham.png"),
      alt: "Isyarat untuk kata Tidak Paham",
    },
  ],
  wordChoices: ["Paham", "Aku", "Tidak"],
  answer: ["Aku", "Tidak", "Paham"],
};
```

Rules:

- `imageOrder` must contain at least one visual.
- `wordChoices` must contain at least one word.
- `answer` is compared literally and in order.
- `answer` and `wordChoices` must contain the same words and quantities.
- Repeated words are supported, but they must be repeated in both arrays.
- Matching is case-sensitive.

### 5. Draw-a-line matching

The player connects each image to one labeled answer.

```ts
import type { ScoredLineMatchProblem } from "../level-catalog.server";

const problem: ScoredLineMatchProblem = {
  id: "section-6-lvl-1-problem-5",
  type: "line-match",
  prompt: "Hubungkan gambar dengan jawaban yang benar!",
  images: [
    {
      id: "picture-a",
      visual: {
        kind: "image",
        src: learningAssetUrl("alphabet/SIBI_A.png"),
        alt: "Isyarat untuk huruf A",
      },
    },
    {
      id: "picture-b",
      visual: {
        kind: "image",
        src: learningAssetUrl("alphabet/SIBI_B.png"),
        alt: "Isyarat untuk huruf B",
      },
    },
  ],
  // Deliberately use a different display order from the images.
  answers: [
    { id: "answer-b", label: "B" },
    { id: "answer-a", label: "A" },
  ],
  answer: [
    { imageId: "picture-a", answerId: "answer-a" },
    { imageId: "picture-b", answerId: "answer-b" },
  ],
};
```

Rules:

- Image IDs and answer IDs must be unique.
- `images`, `answers`, and `answer` must have equal lengths.
- Every image and every answer must occur exactly once in `answer`.
- `answer` stores IDs, while `label` is only the displayed answer text.
- Shuffle the `answers` display order so correct matches are not automatically
  horizontal.

The server validates advanced ordering and line-matching configurations when
the level catalog is loaded. Invalid definitions include the level ID, problem
ID, and reason in the server error.

## Visual Variants

`ChoiceVisual` supports images and emoji:

```ts
const imageVisual = {
  kind: "image" as const,
  src: learningAssetUrl("kata/Tas.png"),
  alt: "Isyarat untuk kata Tas",
};

const emojiVisual = {
  kind: "emoji" as const,
  value: "🎒",
  alt: "Tas",
};
```

Always provide useful `alt` text. It is used by screen readers and can also
appear in validation feedback.

## Adding a Reward to a Level

Rewards are intentionally verified in multiple layers. Configure all three:

### 1. Map lesson reward

In `app/data/learning/act-*.ts`:

```ts
reward: {
  name: "bread",
  image: "/quest/bread.png",
  alt: "Bread reward",
  offsetX: 50,
  offsetY: 36,
  width: 72,
},
```

This controls the map image and the reward shown on the level summary.

### 2. Server level reward

In the section level catalog:

```ts
reward: { name: "bread" },
```

This is the trusted value sent to the completion RPC. Do not derive it from
browser-submitted data.

### 3. Supabase completion catalog

In `supabase/setup/complete_level_and_award_xp.sql`, set the same reward name
for the same level:

```sql
('section-6', 'section-6-lvl-1', 10, 'bread', 'section-5', 'section-5-lvl-4')
```

The SQL function rejects a reward that does not match its internal catalog.

If introducing a completely new reward name, also extend `RewardItemName` in
`app/models/level.ts`.

Rewards are idempotent: completing the same level again does not append the
same item or award its XP again.

## Configuring Cooking

Cooking is optional for every act.

### Disabled

```ts
export const actSixCooking: ActCookingFeature = {
  enabled: false,
};
```

No kitchen is rendered for that act, and no `section-6` key is required in
the `masak` JSON.

### Enabled

Define a cooking config and prize:

```ts
import type { ActCookingConfig, ActPrize } from "~/models/learning";

export const actSixCooking: ActCookingConfig = {
  sectionId: ACT_SIX_ID,
  title: "Dapur",
  requiredItems: ["bread", "veggies"],
  kitchenImage: "/quest/kompor.png",
  kitchenImageAlt: "Kompor dan panci",
  ingredientAnimation: {
    targetXPercent: 50,
    targetYPercent: 13,
    entryDistancePx: 155,
    entryYOffsetPx: -45,
    ingredientSizePx: 80,
    staggerSeconds: 0.5,
  },
};

export const actSixPrize: ActPrize = {
  name: "toast",
  title: "Roti Panggang!",
  image: "/quest/toast.png",
  alt: "Roti panggang yang selesai dimasak",
};
```

Register it in `act-catalog.ts`:

```ts
cooking: {
  enabled: true,
  config: actSixCooking,
  prize: actSixPrize,
},
```

`requiredItems` can contain rewards collected from other acts. Cooking does
not affect level progression. It checks the user's `items` array and stores:

```json
{
  "section-6": true
}
```

in `public.progress.masak`.

## Supabase Completion Catalog

Adding or reordering levels requires updating:

```text
supabase/setup/complete_level_and_award_xp.sql
```

Each row contains:

```text
section ID
level ID
XP awarded
reward item or null
previous section ID
previous level ID
```

Example sequence:

```sql
('section-6', 'section-6-lvl-1', 10, null, 'section-5', 'section-5-lvl-4'),
('section-6', 'section-6-lvl-2', 10, null, 'section-6', 'section-6-lvl-1')
```

The first level of a new act points to the last available level of the previous
act. Every later level points to the immediately preceding level in its own
act.

Important:

- The lesson's UI `xp` and SQL `level_xp` should match.
- Reward names in the act file, level catalog, and SQL must match.
- Editing the SQL file does not change Supabase automatically. Run the updated
  SQL in the Supabase SQL editor or apply it through your migration workflow.
- Client-side ordering protects navigation, while the SQL prerequisite protects
  direct or forged RPC calls.

## Adding a New Problem Type

Adding a new problem type requires changes outside the data folder:

1. Add its public problem type to `app/models/level.ts`.
2. Add its scored/server type to `app/data/levels/level-catalog.server.ts`.
3. Create a UI renderer in `app/components/levels/`.
4. Register it in `app/components/levels/problem-renderer.tsx`.
5. Add grading and answer stripping to
   `app/features/levels/level-session.server.ts`.
6. Add answer-completeness handling to
   `app/components/levels/level-page.tsx` when the answer is not a single
   choice ID.
7. Add server-side configuration validation when malformed content could make
   the problem impossible.

Once a type is registered, levels can use it only through data configuration.

## New Act Checklist

- [ ] Create `app/data/learning/act-x.ts`.
- [ ] Use a unique `section-x` ID.
- [ ] Define lessons in canonical play order.
- [ ] Give every lesson a matching level ID.
- [ ] Position every lesson on the map.
- [ ] Make the SVG path pass through the nodes in order.
- [ ] Add optional decorations.
- [ ] Explicitly enable or disable cooking.
- [ ] Register the act in `act-catalog.ts`.
- [ ] Create `app/data/levels/section-x/`.
- [ ] Create at least one scored problem per level.
- [ ] Create and register the section level catalog.
- [ ] Keep answer fields in server-only files.
- [ ] Configure rewards in the map, level catalog, and SQL.
- [ ] Add every level to `complete_level_and_award_xp.sql`.
- [ ] Verify SQL prerequisite order across the act boundary.
- [ ] Run `pnpm run typecheck`.
- [ ] Run `pnpm run build`.
- [ ] Test the first level, sequential unlocking, final level, reward, replay,
      and optional cooking flow with an authenticated user.

## Common Failure Modes

### Level redirects back to the map

Check that:

- The act is unlocked.
- The level is the first incomplete available lesson.
- Its ID appears in both the act lessons and level catalog.
- Previous levels are stored as `true` in `progression`.

### Level returns 404

The ID is missing from either the act's `lessons` array or the server level
catalog.

### Completing a level returns an internal server error

Common causes:

- The level is missing from `complete_level_and_award_xp.sql`.
- The SQL reward differs from the level catalog reward.
- The SQL prerequisite points to the wrong previous level.
- The authenticated user has no matching profile row.
- Supabase RLS or RPC permissions are incomplete.
- `progress.items` contains a JSON value that is not an array.

### Asset does not appear

Check:

- Exact bucket folder and filename capitalization.
- The asset is in the public `learning_asset` bucket.
- `VITE_SUPABASE_URL` exists in the server environment.
- Local assets begin with `/` and do not include `public/`.

### A problem can never be completed

Check:

- `correctChoiceId` matches a choice ID.
- Ordered-word answers contain the same words as `wordChoices`.
- Line-match pairs reference existing image and answer IDs.
- Problem IDs are unique.
