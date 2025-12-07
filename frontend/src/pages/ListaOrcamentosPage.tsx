import { useState } from "react";
import { Link } from "react-router-dom";
import { useOrcamentos } from "../context/OrcamentoContext";

export function ListaOrcamentosPage() {
  const { listaOrcamentos } = useOrcamentos();

  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<string>("Todos");

  const vazio = listaOrcamentos.length === 0;

  // status distintos com base nos dados existentes
  const statusDisponiveis = Array.from(
    new Set(listaOrcamentos.map((orc) => orc.status))
  );

  const listaFiltrada = listaOrcamentos
    .filter((orc) => {
      const texto = busca.trim().toLowerCase();

      const casaBusca =
        !texto ||
        orc.numero.toLowerCase().includes(texto) ||
        orc.cliente.nome.toLowerCase().includes(texto);

      const casaStatus =
        statusFiltro === "Todos" || orc.status === statusFiltro;

      return casaBusca && casaStatus;
    })
    .sort((a, b) => {
      const dataA = new Date(a.dataEmissao).getTime();
      const dataB = new Date(b.dataEmissao).getTime();
      return dataB - dataA; // mais recente primeiro
    });

  function getStatusStyles(status: string) {
    const lower = status.toLowerCase();

    if (lower.includes("aprov")) {
      return {
        backgroundColor: "#16331a",
        borderColor: "#2b8a3e",
        color: "#a2f2b2",
      };
    }

    if (lower.includes("emit")) {
      return {
        backgroundColor: "#1b2433",
        borderColor: "#4e8cff",
        color: "#c8ddff",
      };
    }

    if (lower.includes("recus") || lower.includes("reprov")) {
      return {
        backgroundColor: "#331616",
        borderColor: "#f25b5b",
        color: "#ffb3b3",
      };
    }

    if (lower.includes("venc")) {
      return {
        backgroundColor: "#332516",
        borderColor: "#f2a33b",
        color: "#ffd59a",
      };
    }

    return {
      backgroundColor: "#222222",
      borderColor: "#555555",
      color: "#dddddd",
    };
  }

  return (
    <div>
      <header>
        <h1>Orçamentos</h1>
        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {/* Busca */}
          <input
            type="search"
            placeholder="Buscar por número ou cliente"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "999px",
              border: "1px solid #333",
              backgroundColor: "#181818",
              color: "#f5f5f5",
            }}
          />

          {/* Filtro de status (chips) */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.85rem",
                opacity: 0.7,
              }}
            >
              Status:
            </span>

            <button
              type="button"
              onClick={() => setStatusFiltro("Todos")}
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                border:
                  statusFiltro === "Todos"
                    ? "1px solid #4e8cff"
                    : "1px solid #444",
                backgroundColor:
                  statusFiltro === "Todos" ? "#1b2130" : "transparent",
                color:
                  statusFiltro === "Todos" ? "#c8ddff" : "#f5f5f5",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              Todos
            </button>

            {statusDisponiveis.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFiltro(status)}
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "999px",
                  border:
                    statusFiltro === status
                      ? "1px solid #4e8cff"
                      : "1px solid #444",
                  backgroundColor:
                    statusFiltro === status ? "#1b2130" : "transparent",
                  color:
                    statusFiltro === status ? "#c8ddff" : "#f5f5f5",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Lista */}
      <section style={{ marginTop: "1rem" }}>
        {vazio ? (
          <p>Nenhum orçamento cadastrado ainda.</p>
        ) : listaFiltrada.length === 0 ? (
          <p>Nenhum orçamento encontrado com os filtros atuais.</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {listaFiltrada.map((orc) => {
              const statusStyles = getStatusStyles(orc.status);

              return (
                <li
                  key={orc.id}
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #333",
                    backgroundColor: "#181818",
                  }}
                >
                  <Link
                    to={`/orcamentos/${orc.id}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem 0.9rem",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.2rem",
                        minWidth: 0,
                      }}
                    >
                      {/* Número do orçamento */}
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {orc.numero}
                      </span>

                      {/* Cliente */}
                      <span
                        style={{
                          fontSize: "0.9rem",
                          opacity: 0.9,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {orc.cliente.nome}
                      </span>

                      {/* Data de emissão */}
                      <span
                        style={{
                          fontSize: "0.8rem",
                          opacity: 0.7,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {new Date(orc.dataEmissao).toLocaleDateString("pt-BR")}
                      </span>
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                        flexShrink: 0,
                      }}
                    >
                      {/* Total */}
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: "0.95rem",
                        }}
                      >
                        R$ {orc.total.toFixed(2)}
                      </span>

                      {/* Tag de status */}
                      <span
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.15rem 0.6rem",
                          borderRadius: "999px",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          textTransform: "capitalize",
                          ...statusStyles,
                        }}
                      >
                        {orc.status}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
