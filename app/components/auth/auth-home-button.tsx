import { useNavigate } from "react-router";

export function AuthHomeButton() {
  const navigate = useNavigate();

  return (
    <button
      className="-ml-2 inline-flex size-11 items-center justify-center rounded-full text-navy-1 transition-colors hover:bg-gray-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
      type="button"
      aria-label="Home"
      onClick={() => navigate("/")}
    >
      <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true">
        <path
          d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
