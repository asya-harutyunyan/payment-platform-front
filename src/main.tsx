import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@emotion/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { SnackbarProvider } from "notistack";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { App } from "./app";
import { AuthProvider } from "./context/auth.context";
import i18n from "./i18n/i18n";
import { store } from "./store";
import theme from "./styles/theme";
dayjs.extend(utc);

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
