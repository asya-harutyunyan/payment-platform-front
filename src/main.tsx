import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { App } from "./app";
import { AuthProvider } from "./context/auth.context";
import { store } from "./store/reducers/store";
import theme from "./styles/theme";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}
