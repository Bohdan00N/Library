import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { PersistGate } from "redux-persist/integration/react"; // Импорт PersistGate
import ErrorBoundary from "./utils/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* Оборачиваем в PersistGate */}
        <Router>
          <CookiesProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </CookiesProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
