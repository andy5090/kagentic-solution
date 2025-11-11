import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("common/pages/landing.tsx"),
  route("/dashboard", "features/organizations/pages/dashboard.tsx"),
  route("/agents", "features/agents/pages/agents-list.tsx"),
  route("/api/auth/*", "features/auth/auth-handler.tsx"),
] satisfies RouteConfig;
