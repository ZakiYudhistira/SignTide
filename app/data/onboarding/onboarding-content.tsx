import type { ComponentType } from "react";

import { OnboardingWelcomeContent } from "~/components/onboarding/onboarding-welcome-content";
import { OnboardingHelpContent } from "~/components/onboarding/onboarding-help-content";

export type OnboardingContentItem =
  | {
      id: string;
      type: "image";
      assetPath: string;
      alt: string;
    }
  | {
      id: string;
      type: "component";
      Component: ComponentType;
    };

export const ONBOARDING_CONTENT = [
  ...Array.from({ length: 17 }, (_, index) => {
    const imageNumber = index + 1;

    return {
      id: `image-${String(imageNumber).padStart(2, "0")}`,
      type: "image" as const,
      assetPath: `onboarding/${imageNumber}.png`,
      alt: `Cerita onboarding SignTide halaman ${imageNumber}`,
    };
  }),
  {
    id: "welcome-to-signtide",
    type: "component",
    Component: OnboardingWelcomeContent,
  },
  {
    id: "help-lani-cook",
    type: "component",
    Component: OnboardingHelpContent,
  }
] satisfies readonly OnboardingContentItem[];
