import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => <Outlet />,
  beforeLoad: async () => {
    // Redirect to the login page if the user is not authenticated
    // const isAuthenticated = await checkUserAuthentication(); // Replace with your authentication check logic
    // if (!isAuthenticated) {
    //   window.location.href = "/login"; // Redirect to the login page
    // }
  }
});