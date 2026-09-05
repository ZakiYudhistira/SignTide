import { NavLink, useLocation } from "react-router";

const navigationItems = [
  { label: "Profil", to: "/profile", image: "/navbar/Home.png", tutorialTarget: undefined },
  { label: "Belajar", to: "/level", image: "/navbar/Leaderboard.png", tutorialTarget: "nav-belajar" },
  { label: "Kamus", to: "/dictionary", image: "/navbar/Dictionary.png", tutorialTarget: "nav-kamus" },
  { label: "Peringkat", to: "/leaderboard", image: "/navbar/Level.png", tutorialTarget: "nav-peringkat" },
] as const;

export function Navbar() {
  const { pathname } = useLocation();
  const selectedIndex = Math.max(
    0,
    navigationItems.findIndex(
      (item) => pathname === item.to || pathname.startsWith(`${item.to}/`),
    ),
  );

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 border-t-2 border-gray-2 bg-background px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_14px_rgb(14_36_71_/_0.08)]"
      aria-label="Navigasi utama"
    >
      <ul className="relative mx-auto grid max-w-md grid-cols-4 gap-1">
        <li
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-0 rounded-2xl bg-light-blue transition-transform duration-300 ease-out"
          style={{
            width: "calc((100% - 0.75rem) / 4)",
            transform: `translateX(calc(${selectedIndex * 100}% + ${selectedIndex * 0.25}rem))`,
          }}
        />
        {navigationItems.map((item) => (
          <li key={item.label} data-tutorial-target={item.tutorialTarget}>
            <NavLink
              to={item.to}
              end={item.label === "Profil"}
              className={({ isActive }) =>
                `relative z-10 flex min-h-20 flex-col items-center justify-end gap-1 rounded-2xl px-1 py-1 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean ${
                  isActive ? "text-ocean" : "text-gray-1 hover:bg-gray-3"
                }`
              }
            >
              <img
                className="size-14 object-contain sm:size-16"
                src={item.image}
                alt=""
                aria-hidden="true"
              />
              <span className="text-label leading-none">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
