import React from "react";
import ReactDOM from "react-dom/client";

import "./main.css";
import { App } from "./App.tsx";
import { makeServer } from "./mocks/server.ts";

if (!import.meta.env.PROD) {
  makeServer();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
