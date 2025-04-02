import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.tsx";
import { VehicleProvider } from "./context/VehicleContext/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VehicleProvider>
      <App />
    </VehicleProvider>
  </StrictMode>
);
