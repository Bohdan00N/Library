"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
require("./index.css");
var App_1 = require("./App");
var react_redux_1 = require("react-redux");
var store_1 = require("./app/store");
var react_router_dom_1 = require("react-router-dom");
var react_cookie_1 = require("react-cookie");
var react_2 = require("redux-persist/integration/react"); // Импорт PersistGate
var ErrorBoundary_1 = require("./utils/ErrorBoundary");
var root = client_1.default.createRoot(document.getElementById("root"));
root.render(<react_1.default.StrictMode>
    <react_redux_1.Provider store={store_1.store}>
      <react_2.PersistGate loading={null} persistor={store_1.persistor}>
        {/* Оборачиваем в PersistGate */}
        <react_router_dom_1.BrowserRouter>
          <react_cookie_1.CookiesProvider>
            <ErrorBoundary_1.default>
              <App_1.default />
            </ErrorBoundary_1.default>
          </react_cookie_1.CookiesProvider>
        </react_router_dom_1.BrowserRouter>
      </react_2.PersistGate>
    </react_redux_1.Provider>
  </react_1.default.StrictMode>);
