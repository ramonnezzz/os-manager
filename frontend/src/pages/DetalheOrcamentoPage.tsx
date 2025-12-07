import { useNavigate, useParams } from "react-router-dom";
import { useOrcamentos } from "../context/OrcamentoContext";

export function DetalheOrcamentoPage() {
  const { id } = useParams<{ id: string }>();
  const { listaOrcamentos } = useOrcamentos();
  const navigate = useNavigate();

  const orcamento = listaOrcamentos.find((orc) => orc.id === id);

  if (!orcamento) {
    return (
      <div>
        <h1>Orçamento</h1>
        <p style={{ marginTop: "1rem" }}>Orçamento não encontrado.</p>
        <button
          type="button"
          onClick={() => navigate("/orcamentos")}
          style={{
            marginTop: "0.75rem",
            padding: "0.5rem 0.9rem",
            borderRadius: "6px",
            border: "1px solid #444",
            backgroundColor: "transparent",
            color: "#f5f5f5",
            cursor: "pointer",
          }}
        >
          Voltar para lista
        </button>
      </div>
    );
  }

  const data = new Date(orcamento.dataEmissao).toLocaleDateString("pt-BR");

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

  const statusStyles = getStatusStyles(orcamento.status);

  return (
    <div>
      {/* Cabeçalho com voltar */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{
          border: "none",
          background: "transparent",
          color: "#f5f5f5",
          marginBottom: "0.5rem",
          cursor: "pointer",
        }}
      >
        ← Voltar
      </button>

      <h1 style={{ marginBottom: "0.25rem" }}>{orcamento.numero}</h1>

      {/* Resumo principal */}
      <section
        style={{
          marginTop: "0.5rem",
          padding: "0.9rem 1rem",
          borderRadius: "10px",
          border: "1px solid #333",
          backgroundColor: "#181818",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              R$ {orcamento.total.toFixed(2)}
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                opacity: 0.85,
                marginTop: "0.15rem",
              }}
            >
              {orcamento.cliente.nome}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: "0.85rem",
                opacity: 0.8,
              }}
            >
              {data}
            </div>
            <span
              style={{
                marginTop: "0.25rem",
                display: "inline-block",
                fontSize: "0.75rem",
                padding: "0.15rem 0.6rem",
                borderRadius: "999px",
                borderWidth: "1px",
                borderStyle: "solid",
                textTransform: "capitalize",
                ...statusStyles,
              }}
            >
              {orcamento.status}
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: "0.25rem",
            fontSize: "0.8rem",
            opacity: 0.8,
          }}
        >
          Validade: {orcamento.validadeDias} dia(s)
        </div>
      </section>

      {/* Ações (placeholder) */}
      <section
        style={{
          marginTop: "0.75rem",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <button
          type="button"
          disabled
          style={{
            flex: 1,
            padding: "0.55rem 0.9rem",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#222",
            color: "#888",
            cursor: "not-allowed",
          }}
        >
          Editar (em breve)
        </button>
        <button
          type="button"
          disabled
          style={{
            flex: 1,
            padding: "0.55rem 0.9rem",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#222",
            color: "#888",
            cursor: "not-allowed",
          }}
        >
          Documentos (em breve)
        </button>
      </section>

      {/* Itens */}
      <section
        style={{
          marginTop: "1rem",
          borderRadius: "10px",
          border: "1px solid #333",
          backgroundColor: "#181818",
          padding: "0.75rem 1rem",
        }}
      >
        <h2
          style={{
            fontSize: "0.95rem",
            marginBottom: "0.5rem",
          }}
        >
          Itens
        </h2>

        {orcamento.itens.length === 0 ? (
          <p
            style={{
              fontSize: "0.9rem",
              opacity: 0.8,
            }}
          >
            Nenhum item registrado neste orçamento.
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            {orcamento.itens.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  fontSize: "0.9rem",
                }}
              >
                <div
                  style={{
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.descricao}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      opacity: 0.75,
                    }}
                  >
                    {item.quantidade} × R$ {item.valorUnitario.toFixed(2)}
                  </div>
                </div>

                <div
                  style={{
                    flexShrink: 0,
                    fontWeight: 600,
                  }}
                >
                  R$ {item.total.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div
          style={{
            marginTop: "0.75rem",
            borderTop: "1px solid #333",
            paddingTop: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 600,
          }}
        >
          <span>Total do orçamento</span>
          <span>R$ {orcamento.total.toFixed(2)}</span>
        </div>
      </section>

      {/* Observações */}
      <section
        style={{
          marginTop: "0.75rem",
          borderRadius: "10px",
          border: "1px solid #333",
          backgroundColor: "#181818",
          padding: "0.75rem 1rem",
        }}
      >
        <h2
          style={{
            fontSize: "0.95rem",
            marginBottom: "0.35rem",
          }}
        >
          Observações
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            opacity: orcamento.observacoes ? 1 : 0.7,
            whiteSpace: "pre-wrap",
          }}
        >
          {orcamento.observacoes || "Nenhuma observação registrada."}
        </p>
      </section>
    </div>
  );
}
