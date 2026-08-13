import { useNavigation } from "react-router";

export function LoadingScreen({ show = false }: { show?: boolean }) {
  const navigation = useNavigation();

  if (!show && navigation.state === "idle") return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center bg-background"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <img
        src="/signtide_logo.png"
        alt="SignTide"
        className="w-44 max-w-[45vw] object-contain"
      />
      <p className="mt-8 text-3xl font-bold tracking-wide text-gray-2">
        Loading<span className="animate-pulse">...</span>
      </p>
    </div>
  );
}
