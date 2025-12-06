import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { OSProvider } from "./context/OSContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OSProvider>
      <App />
    </OSProvider>
  </React.StrictMode>
);
