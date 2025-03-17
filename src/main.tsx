import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@emotion/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { SnackbarProvider } from "notistack";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { App } from "./app";
import { firebaseConfig } from "./common/configs";
import { AuthProvider } from "./context/auth.context";
import i18n from "./i18n/i18n";
import { store } from "./store";
import theme from "./styles/theme";
dayjs.extend(utc);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
      registration.active?.postMessage({
        type: "INIT_FIREBASE_CONFIG",
        config: firebaseConfig,
      });
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
}
