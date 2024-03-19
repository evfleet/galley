import React from "react";
import ReactDOM from "react-dom/client";
import { createServer } from "miragejs";

import "./main.css";
import App from "./App.tsx";

createServer({
  routes() {
    this.namespace = "api";
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
