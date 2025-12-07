import { Link, Route, Routes, useLocation } from "react-router-dom";
import type { CSSProperties } from "react";

import { HomePage } from "./pages/HomePage";
import { NovaOSPage } from "./pages/NovaOSPage";
import { NovoOrcamentoPage } from "./pages/NovoOrcamentoPage";
import { ListaOSPage } from "./pages/ListaOSPage";
import { ListaOrcamentosPage } from "./pages/ListaOrcamentosPage";
import { ListaClientesPage } from "./pages/ListaClientesPage";
import { DetalheOSPage } from "./pages/DetalheOSPage";
import { DetalheOrcamentoPage } from "./pages/DetalheOrcamentoPage";
import { DocumentoOrcamentoPage } from "./pages/DocumentoOrcamentoPage";
import { DocumentoOSPage } from "./pages/DocumentoOSPage";
import { ConfiguracoesEmpresaPage } from "./pages/ConfiguracoesEmpresaPage";

function App() {
  const location = useLocation();

  const isDocumentoRoute = location.pathname.includes("/documento");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111",
        color: "#f5f5f5",
      }}
    >
      {!isDocumentoRoute && (
        <header
          className="app-shell-nav"
          style={{
            padding: "0.75rem 1rem",
            borderBottom: "1px solid #333",
            backgroundColor: "#050505",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              fontSize: "0.9rem",
            }}
          >
            <Link style={linkStyle} to="/">
              Home
            </Link>
            <Link style={linkStyle} to="/nova-os">
              Nova OS
            </Link>
            <Link style={linkStyle} to="/novo-orcamento">
              Novo Orçamento
            </Link>
            <Link style={linkStyle} to="/os">
              Listar OS
            </Link>
            <Link style={linkStyle} to="/orcamentos">
              Listar Orçamentos
            </Link>
            <Link style={linkStyle} to="/clientes">
              Clientes
            </Link>
            <Link style={linkStyle} to="/configuracoes">
              Configurações
            </Link>
          </nav>
        </header>
      )}

      <main
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: isDocumentoRoute ? "0" : "1rem",
        }}
      >
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* OS */}
          <Route path="/nova-os" element={<NovaOSPage />} />
          <Route path="/os" element={<ListaOSPage />} />
          <Route path="/os/:id" element={<DetalheOSPage />} />
          <Route path="/os/:id/documento" element={<DocumentoOSPage />} />

          {/* Orçamentos */}
          <Route path="/novo-orcamento" element={<NovoOrcamentoPage />} />
          <Route path="/orcamentos" element={<ListaOrcamentosPage />} />
          <Route path="/orcamentos/:id" element={<DetalheOrcamentoPage />} />
          <Route
            path="/orcamentos/:id/documento"
            element={<DocumentoOrcamentoPage />}
          />

          {/* Clientes */}
          <Route path="/clientes" element={<ListaClientesPage />} />

          {/* Configurações da Empresa */}
          <Route path="/configuracoes" element={<ConfiguracoesEmpresaPage />} />
        </Routes>
      </main>
    </div>
  );
}

const linkStyle: CSSProperties = {
  color: "#4e8cff",
  textDecoration: "none",
};

export default App;
