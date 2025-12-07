// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// Providers dos contextos
import { OSProvider } from "./context/OSContext";
import { OrcamentoProvider } from "./context/OrcamentoContext";
import { ClienteProvider } from "./context/ClienteContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClienteProvider>
        <OSProvider>
          <OrcamentoProvider>
            <App />
          </OrcamentoProvider>
        </OSProvider>
      </ClienteProvider>
    </BrowserRouter>
  </React.StrictMode>
);
