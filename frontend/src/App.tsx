import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { NovaOSPage } from "./pages/NovaOSPage";
import { NovoOrcamentoPage } from "./pages/NovoOrcamentoPage";
import { ListaOSPage } from "./pages/ListaOSPage";
import { ListaOrcamentosPage } from "./pages/ListaOrcamentosPage";
import { ListaClientesPage } from "./pages/ListaClientesPage";
import { DetalheOSPage } from "./pages/DetalheOSPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nova-os" element={<NovaOSPage />} />
          <Route path="/novo-orcamento" element={<NovoOrcamentoPage />} />
          <Route path="/os" element={<ListaOSPage />} />
          <Route path="/os/:id" element={<DetalheOSPage />} /> {/* nova rota */}
          <Route path="/orcamentos" element={<ListaOrcamentosPage />} />
          <Route path="/clientes" element={<ListaClientesPage />} />
        </Routes>

      </main>
    </BrowserRouter>
  );
}

export default App;
