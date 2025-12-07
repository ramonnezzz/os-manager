import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Buffer } from "buffer";
import "./index.css";

import { EmpresaProvider } from "./context/EmpresaContext";
import { ClienteProvider } from "./context/ClienteContext";
import { OSProvider } from "./context/OSContext";
import { OrcamentoProvider } from "./context/OrcamentoContext";

// @ts-expect-erro
window.Buffer = window.Buffer ?? Buffer;


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <EmpresaProvider>
        <ClienteProvider>
          <OSProvider>
            <OrcamentoProvider>
              <App />
            </OrcamentoProvider>
          </OSProvider>
        </ClienteProvider>
      </EmpresaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
