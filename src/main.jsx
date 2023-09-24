import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import RouteHandler from "./routes/RouteHandler";
import { Provider } from "react-redux";
import { _store } from "./store/_store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={_store}>
        <RouteHandler />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
