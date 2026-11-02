import { createFileRoute } from "@tanstack/react-router";
import { RegisterDetailsPage } from "@pages/register-details";

export const Route = createFileRoute("/_auth/register/details")({
  component: RegisterDetailsPage,
});