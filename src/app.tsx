import { createRouter, RouterProvider } from "@tanstack/react-router";
import { PaymentPlatformModal } from "./components/organisms/payment-confirmation-modal";
import { useAuth } from "./context/auth.context";
import "./index.css";
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
  return (
    <>
      <RouterProvider router={router} context={{ auth }} />
      <PaymentPlatformModal />
    </>
  );
}
