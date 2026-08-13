import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/public-layout.tsx", [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
  ]),
  layout("routes/protected-layout.tsx", [
    route("level", "routes/level.tsx"),
    route("profile", "routes/profile.tsx"),
  ]),
  layout("routes/protected-no-nav-layout.tsx", [
    route("profile/edit", "routes/edit-profile.tsx"),
  ]),
] satisfies RouteConfig;
