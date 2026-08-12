import type { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-background sm:min-h-screen sm:border-x sm:border-gray-3">
      <header
        className="flex min-h-14 shrink-0 items-center justify-center px-6 py-4"
        aria-label="SignTide"
      >
        <span className="font-bubblelemon text-title text-ocean">
          SignTide
        </span>
      </header>

      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
