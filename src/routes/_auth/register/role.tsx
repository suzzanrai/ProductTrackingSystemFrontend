import { createFileRoute } from "@tanstack/react-router";
import { RegisterRolePage } from "@pages/register-role";

export const Route = createFileRoute("/_auth/register/role")({
  component: RegisterRolePage,
});