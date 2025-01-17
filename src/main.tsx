import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@emotion/react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { App } from "./app";
import { AuthProvider } from "./context/auth.context";
import { store } from "./store/reducers/store";
import theme from "./styles/theme";
import i18n from "./i18n/i18n";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
}
