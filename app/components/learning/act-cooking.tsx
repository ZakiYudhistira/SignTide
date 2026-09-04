import { Link } from "react-router";

import type { ActCookingConfig } from "~/models/learning";

type ActCookingProps = {
  config: ActCookingConfig;
};

export function ActCooking({ config }: ActCookingProps) {
  return (
    <div className="mx-5 mb-5">
      <Link
        to={`/dapur/${config.sectionId}`}
        className="welcoming-button inline-flex items-center justify-center"
      >
        Dapur
      </Link>
    </div>
  );
}
