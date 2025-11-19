import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("common/pages/landing.tsx"),
  route("/dashboard", "features/organizations/pages/dashboard.tsx"),
  route("/agents", "features/agents/pages/agents-list.tsx"),
  route("/api/user-report", "features/users/api/user-report.ts"),
  route("/api/auth/*", "api/auth.ts"),
  route("/api/trpc/*", "api/trpc.ts"),
] satisfies RouteConfig;
