import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { updateLoadingConfig } from "./shared/hooks/useLoadingConfig.ts";

updateLoadingConfig({
  useRouteSkeleton: true,
  useLazyLoading: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
