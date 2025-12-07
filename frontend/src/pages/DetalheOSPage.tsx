// src/pages/DetalheOSPage.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CSSProperties } from "react";
import { useOS } from "../context/OSContext";


export type StatusOS = "Aberta" | "Em andamento" | "Concluída" | "Cancelada";

export function DetalheOSPage() {
  const { id } = useParams<{ id: string }>();
  const { listaOS, atualizarOS } = useOS();
  const navigate = useNavigate();

  const osEncontrada = listaOS.find((item) => item.id === id) ?? null;

  const [emEdicao, setEmEdicao] = useState(false);

  const [dadosEdicao, setDadosEdicao] = useState<{
    status: StatusOS;
    observacoesGerais: string;
    defeitoRelatado: string;
    laudoTecnico: string;
    solucao: string;
  }>(() => ({
    status: (osEncontrada?.status as StatusOS) ?? "Aberta",
    observacoesGerais: osEncontrada?.observacoesGerais ?? "",
    defeitoRelatado: osEncontrada?.defeitoRelatado ?? "",
    laudoTecnico: osEncontrada?.laudoTecnico ?? "",
    solucao: osEncontrada?.solucao ?? "",
  }));

  if (!osEncontrada) {
    return (
      <div>
        <h1>Ordem de Serviço</h1>
        <p style={{ marginTop: "1rem" }}>OS não encontrada.</p>
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

  const os = osEncontrada;
  const data = new Date(os.dataAbertura).toLocaleDateString("pt-BR");

  function getStatusStyles(status: string): CSSProperties {
    const lower = status.toLowerCase();

    if (lower.includes("concl")) {
      return {
        backgroundColor: "#16331a",
        borderColor: "#2b8a3e",
        color: "#a2f2b2",
      };
    }

    if (lower.includes("pend") || lower.includes("abert") || lower.includes("andam")) {
      return {
        backgroundColor: "#332516",
        borderColor: "#f2a33b",
        color: "#ffd59a",
      };
    }

    if (lower.includes("cancel")) {
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

  const statusAtual = emEdicao ? dadosEdicao.status : (os.status as StatusOS);
  const statusStyles = getStatusStyles(statusAtual);

  function handleIniciarEdicao() {
    setDadosEdicao({
      status: (os.status as StatusOS) ?? "Aberta",
      observacoesGerais: os.observacoesGerais ?? "",
      defeitoRelatado: os.defeitoRelatado ?? "",
      laudoTecnico: os.laudoTecnico ?? "",
      solucao: os.solucao ?? "",
    });
    setEmEdicao(true);
  }

  function handleCancelarEdicao() {
    setEmEdicao(false);
  }

  function handleSalvar() {
    atualizarOS(os.id, {
      status: dadosEdicao.status,
      observacoesGerais: dadosEdicao.observacoesGerais || undefined,
      defeitoRelatado: dadosEdicao.defeitoRelatado || undefined,
      laudoTecnico: dadosEdicao.laudoTecnico || undefined,
      solucao: dadosEdicao.solucao || undefined,
    });

    setEmEdicao(false);
  }

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

            {emEdicao ? (
              <select
                value={dadosEdicao.status}
                onChange={(e) =>
                  setDadosEdicao((ant) => ({
                    ...ant,
                    status: e.target.value as StatusOS,
                  }))
                }
                style={{
                  marginTop: "0.25rem",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "999px",
                  border: "1px solid #555",
                  backgroundColor: "#111",
                  color: "#f5f5f5",
                  fontSize: "0.8rem",
                }}
              >
                <option value="Aberta">Aberta</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluída">Concluída</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            ) : (
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
                {statusAtual}
              </span>
            )}
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

      {/* Ações */}
      <section
        style={{
          marginTop: "0.75rem",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {emEdicao ? (
          <>
            <button
              type="button"
              onClick={handleSalvar}
              style={{
                flex: 1,
                padding: "0.55rem 0.9rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#4e8cff",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Salvar alterações
            </button>
            <button
              type="button"
              onClick={handleCancelarEdicao}
              style={{
                flex: 1,
                padding: "0.55rem 0.9rem",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "transparent",
                color: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleIniciarEdicao}
              style={{
                flex: 1,
                padding: "0.55rem 0.9rem",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "transparent",
                color: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              Editar OS
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
          </>
        )}
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
        <SecaoEditavel
          titulo="Observações Gerais"
          valor={dadosEdicao.observacoesGerais}
          emEdicao={emEdicao}
          placeholder="Nenhuma observação geral registrada."
          onChange={(texto) =>
            setDadosEdicao((ant) => ({
              ...ant,
              observacoesGerais: texto,
            }))
          }
        />
        <SecaoEditavel
          titulo="Defeito"
          valor={dadosEdicao.defeitoRelatado}
          emEdicao={emEdicao}
          placeholder="Nenhum defeito registrado."
          onChange={(texto) =>
            setDadosEdicao((ant) => ({
              ...ant,
              defeitoRelatado: texto,
            }))
          }
        />
        <SecaoEditavel
          titulo="Laudo"
          valor={dadosEdicao.laudoTecnico}
          emEdicao={emEdicao}
          placeholder="Nenhum laudo registrado."
          onChange={(texto) =>
            setDadosEdicao((ant) => ({
              ...ant,
              laudoTecnico: texto,
            }))
          }
        />
        <SecaoEditavel
          titulo="Solução"
          valor={dadosEdicao.solucao}
          emEdicao={emEdicao}
          placeholder="Nenhuma solução registrada."
          onChange={(texto) =>
            setDadosEdicao((ant) => ({
              ...ant,
              solucao: texto,
            }))
          }
        />
      </section>
    </div>
  );
}

interface SecaoEditavelProps {
  titulo: string;
  valor: string;
  placeholder: string;
  emEdicao: boolean;
  onChange: (texto: string) => void;
}

function SecaoEditavel({
  titulo,
  valor,
  placeholder,
  emEdicao,
  onChange,
}: SecaoEditavelProps) {
  const semConteudo = !valor;

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

      {emEdicao ? (
        <textarea
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={placeholder}
          style={{
            width: "100%",
            resize: "vertical",
            minHeight: "4rem",
            padding: "0.4rem 0.5rem",
            borderRadius: "6px",
            border: "1px solid #444",
            backgroundColor: "#111",
            color: "#f5f5f5",
            fontSize: "0.9rem",
          }}
        />
      ) : (
        <p
          style={{
            fontSize: "0.9rem",
            opacity: semConteudo ? 0.7 : 1,
            whiteSpace: "pre-wrap",
          }}
        >
          {semConteudo ? placeholder : valor}
        </p>
      )}
    </div>
  );
}
