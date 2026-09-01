import type { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
  lockViewport?: boolean;
};

export function AppLayout({
  children,
  showHeader = true,
  lockViewport = false,
}: AppLayoutProps) {
  return (
    <div
      className={`mx-auto flex w-full max-w-[480px] flex-col overflow-hidden bg-background sm:border-x sm:border-gray-3 ${
        lockViewport ? "h-dvh" : "min-h-dvh sm:min-h-screen"
      }`}
    >
      {showHeader && (
        <header
          className="flex min-h-14 shrink-0 items-center justify-center px-6 py-8"
          aria-label="SignTide"
        >
          <span className="font-bubblelemon text-title text-ocean">
            SignTide
          </span>
        </header>
      )}

      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
