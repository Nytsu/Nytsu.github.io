import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import JustinApp from "./justin-app.tsx";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

createRoot(root).render(
  <StrictMode>
    <JustinApp />
  </StrictMode>,
);
