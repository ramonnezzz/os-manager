import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { OSProvider } from "./context/OSContext";
import { OrcamentoProvider } from "./context/OrcamentoContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OSProvider>
      <OrcamentoProvider>
        <App />
      </OrcamentoProvider>
    </OSProvider>
  </React.StrictMode>
);
