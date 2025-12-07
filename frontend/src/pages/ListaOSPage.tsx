import { useState } from "react";
import { useOS } from "../context/OSContext";
import { Link } from "react-router-dom";

export function ListaOSPage() {
  const { listaOS } = useOS();

  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<string>("Todos");

  const vazio = listaOS.length === 0;

  // gera lista de status distintos com base nos dados existentes
  const statusDisponiveis = Array.from(
    new Set(listaOS.map((os) => os.status))
  );

  const listaFiltrada = listaOS
    .filter((os) => {
      const texto = busca.trim().toLowerCase();

      const casaBusca =
        !texto ||
        os.numero.toLowerCase().includes(texto) ||
        os.cliente.nome.toLowerCase().includes(texto);

      const casaStatus =
        statusFiltro === "Todos" || os.status === statusFiltro;

      return casaBusca && casaStatus;
    })
    .sort((a, b) => {
      const dataA = new Date(a.dataAbertura).getTime();
      const dataB = new Date(b.dataAbertura).getTime();
      return dataB - dataA; // mais recente primeiro
    });

  function getStatusStyles(status: string): React.CSSProperties {
    // estilização simples por texto; dá pra melhorar depois
    if (status.toLowerCase().includes("concl")) {
      return {
        backgroundColor: "#16331a",
        borderColor: "#2b8a3e",
        color: "#a2f2b2",
      };
    }

    if (
      status.toLowerCase().includes("pend") ||
      status.toLowerCase().includes("abert")
    ) {
      return {
        backgroundColor: "#332516",
        borderColor: "#f2a33b",
        color: "#ffd59a",
      };
    }

    if (status.toLowerCase().includes("cancel")) {
      return {
        backgroundColor: "#331616",
        borderColor: "#f25b5b",
        color: "#ffb3b3",
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
        <h1>Ordens de Serviço</h1>
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

          {/* Filtro de status (chips simples) */}
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
          <p>Nenhuma OS cadastrada ainda.</p>
        ) : listaFiltrada.length === 0 ? (
          <p>Nenhuma OS encontrada com os filtros atuais.</p>
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
            {listaFiltrada.map((os) => {
              const statusStyles = getStatusStyles(os.status);

              return (
                <li
                  key={os.id}
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #333",
                    backgroundColor: "#181818",
                  }}
                >
                  <Link
                    to={`/os/${os.id}`}
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
                      {/* Número da OS */}
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {os.numero}
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
                        {os.cliente.nome}
                      </span>

                      {/* Data + equipamento */}
                      <span
                        style={{
                          fontSize: "0.8rem",
                          opacity: 0.7,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {new Date(os.dataAbertura).toLocaleDateString(
                          "pt-BR"
                        )}{" "}
                        · {os.equipamento}
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
                        R$ {os.total.toFixed(2)}
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
                        {os.status}
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
