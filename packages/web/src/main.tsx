import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./main.css";
import { App } from "./App.tsx";

async function enableMocking() {
  const { worker } = await import("./mocks/worker.ts");

  return worker.start({
    onUnhandledRequest(req, print) {
      if (req.url.startsWith("/api/")) {
        print.warning();
      }

      return;
    },
  });
}

const queryClient = new QueryClient();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.StrictMode>
  );
});
