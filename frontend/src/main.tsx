import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { OSProvider } from "./context/OSContext";
import { OrcamentoProvider } from "./context/OrcamentoContext";
import { ClienteProvider } from "./context/ClienteContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClienteProvider>
      <OSProvider>
        <OrcamentoProvider>
          <App />
        </OrcamentoProvider>
      </OSProvider>
    </ClienteProvider>
  </React.StrictMode>
);
