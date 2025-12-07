import { Link, useParams, useNavigate } from "react-router-dom";
import { useOS } from "../context/OSContext";

export function DetalheOSPage() {
  const { id } = useParams<{ id: string }>();
  const { listaOS } = useOS();
  const navigate = useNavigate();

  const os = listaOS.find((item) => item.id === id);

  if (!os) {
    return (
      <div>
        <h1>Ordem de Serviço</h1>
        <p style={{ marginTop: "1rem" }}>
          OS não encontrada.
        </p>
        <button
          type="button"
          onClick={() => navigate("/os")}
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

  const data = new Date(os.dataAbertura).toLocaleDateString("pt-BR");

  function getStatusStyles(status: string): React.CSSProperties {
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

  const statusStyles = getStatusStyles(os.status);

  return (
    <div>
      {/* Cabeçalho com voltar e número */}
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

      <h1 style={{ marginBottom: "0.25rem" }}>{os.numero}</h1>

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
              R$ {os.total.toFixed(2)}
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                opacity: 0.85,
                marginTop: "0.15rem",
              }}
            >
              {os.cliente.nome}
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
              {os.status}
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: "0.5rem",
            fontSize: "0.85rem",
            opacity: 0.9,
          }}
        >
          <strong>Equipamento:</strong> {os.equipamento}
        </div>
      </section>

      {/* Ações simples (placeholder) */}
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

      {/* Seções de texto */}
      <section
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <DetalheSecao
          titulo="Observações Gerais"
          texto={
            os.observacoesGerais ??
            "Nenhuma observação geral registrada."
          }
        />
        <DetalheSecao
          titulo="Defeito"
          texto={
            os.defeitoRelatado ??
            "Nenhum defeito registrado."
          }
        />
        <DetalheSecao
          titulo="Laudo"
          texto={
            os.laudoTecnico ??
            "Nenhum laudo registrado."
          }
        />
        <DetalheSecao
          titulo="Solução"
          texto={
            os.solucao ?? "Nenhuma solução registrada."
          }
        />
      </section>
    </div>
  );
}

interface DetalheSecaoProps {
  titulo: string;
  texto: string;
}

function DetalheSecao({ titulo, texto }: DetalheSecaoProps) {
  const semConteudo =
    texto.startsWith("Nenhum") || texto.startsWith("Nenhuma");

  return (
    <div
      style={{
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
        {titulo}
      </h2>
      <p
        style={{
          fontSize: "0.9rem",
          opacity: semConteudo ? 0.7 : 1,
          whiteSpace: "pre-wrap",
        }}
      >
        {texto}
      </p>
    </div>
  );
}
