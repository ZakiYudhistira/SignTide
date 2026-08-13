import type { ReactNode } from "react";

import { Navbar } from "~/components/navigation/navbar";

type NavLayoutProps = {
  children: ReactNode;
};

export function NavLayout({ children }: NavLayoutProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-background sm:min-h-screen sm:border-x sm:border-gray-3">
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-28">
        {children}
      </main>
      <Navbar />
    </div>
  );
}
