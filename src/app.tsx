import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./context/auth.context";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
