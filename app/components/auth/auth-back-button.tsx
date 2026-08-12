import { useNavigate } from "react-router";

export function AuthBackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="-ml-2 inline-flex size-11 items-center justify-center rounded-full text-navy-1 transition-colors hover:bg-gray-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
      type="button"
      aria-label="Back"
      onClick={() => navigate(-1)}
    >
      <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true">
        <path
          d="m15 18-6-6 6-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    </button>
  );
}
