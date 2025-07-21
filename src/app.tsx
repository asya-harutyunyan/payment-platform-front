import { RouterProvider } from "@tanstack/react-router";
import { PaymentPlatformModal } from "./components/organisms/payment-confirmation-modal";
import { useAuth } from "./context/auth.context";
import "./index.css";
import { router } from "./router";

export function App() {
  const auth = useAuth();
  return (
    <>
      <RouterProvider router={router} context={{ auth }} />
      <PaymentPlatformModal />
    </>
  );
}
