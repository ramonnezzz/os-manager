import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        padding: "0.75rem 1rem",
        borderBottom: "1px solid #333",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/nova-os">Nova OS</Link>
      <Link to="/novo-orcamento">Novo Orçamento</Link>
      <Link to="/os">Listar OS</Link>
      <Link to="/orcamentos">Listar Orçamentos</Link>
      <Link to="/clientes">Clientes</Link> {/* novo link */}
    </nav>
  );
}
