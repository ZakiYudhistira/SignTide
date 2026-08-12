import { useId, useState } from "react";

type AuthFieldProps = {
  label: string;
  name: string;
  type?: "email" | "password";
  autoComplete: string;
};

export function AuthField({
  label,
  name,
  type = "email",
  autoComplete,
}: AuthFieldProps) {
  const inputId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label className="text-title text-navy-1" htmlFor={inputId}>
        {label}
      </label>
      <div className="relative mt-3">
        <input
          id={inputId}
          className="h-16 w-full rounded-3xl border-2 border-navy-2 bg-white px-5 pr-16 text-body text-navy-1 outline-none transition-shadow placeholder:text-gray-1 focus:border-ocean focus:ring-2 focus:ring-light-blue"
          name={name}
          type={isPassword ? (isPasswordVisible ? "text" : "password") : type}
          autoComplete={autoComplete}
          required
        />
        {isPassword && (
          <button
            className="absolute inset-y-0 right-4 flex items-center justify-center px-2 text-navy-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            type="button"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
          >
            <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
              <path
                d="M3 12s3.25-5 9-5 9 5 9 5-3.25 5-9 5-9-5-9-5Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
