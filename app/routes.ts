import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/public-layout.tsx", [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
  ]),
  layout("routes/protected-layout.tsx", [
    route("level", "routes/level.tsx"),
    route("dictionary", "routes/dictionary.tsx"),
    route("profile", "routes/profile.tsx"),
    route("leaderboard", "routes/leaderboard.tsx"),
  ]),
  layout("routes/protected-no-nav-layout.tsx", [
    route("profile/edit", "routes/edit-profile.tsx"),
  ]),
  layout("routes/protected-level-layout.tsx", [
    route("level/:levelId", "routes/level-section-1-lvl-1.tsx"),
  ]),
] satisfies RouteConfig;
