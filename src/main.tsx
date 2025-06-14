import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "../src/components/App/App.tsx";
import "modern-normalize/modern-normalize.css";

import "modern-normalize/modern-normalize.css";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* The rest of your application */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);