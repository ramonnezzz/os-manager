import { useParams } from "react-router-dom";
import { useOS } from "../context/OSContext";
import { useEmpresa } from "../context/EmpresaContext";

export function DocumentoOSPage() {
  const { id } = useParams<{ id: string }>();
  const { listaOS } = useOS();
  const { dados: empresa } = useEmpresa();

  const os = listaOS.find((item) => item.id === id) ?? null;

  if (!os) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111",
          color: "#f5f5f5",
        }}
      >
        <p>OS não encontrada.</p>
      </div>
    );
  }

  const data = new Date(os.dataAbertura).toLocaleDateString("pt-BR");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "1.5rem 0",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: "2rem",
          boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Cabeçalho do documento */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            borderBottom: "2px solid #000",
            paddingBottom: "0.75rem",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.4rem",
                margin: 0,
              }}
            >
              Ordem de Serviço
            </h1>
            <p
              style={{
                margin: "0.25rem 0 0",
                fontSize: "0.9rem",
              }}
            >
              {empresa.nomeFantasia}
              {empresa.documento && ` · ${empresa.documento}`}
            </p>
            {(empresa.telefone || empresa.endereco || empresa.cidade) && (
              <p
                style={{
                  margin: "0.15rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                {empresa.telefone && <>Tel: {empresa.telefone} </>}
                {empresa.endereco && <>· {empresa.endereco} </>}
                {empresa.cidade && <>· {empresa.cidade}</>}
              </p>
            )}
          </div>

          <div
            style={{
              textAlign: "right",
              fontSize: "0.9rem",
            }}
          >
            <div>
              <strong>Nº:</strong> {os.numero}
            </div>
            <div>
              <strong>Data:</strong> {data}
            </div>
            <div>
              <strong>Status:</strong> {os.status}
            </div>
          </div>
        </header>

        {/* Dados do cliente / equipamento */}
        <section
          style={{
            marginBottom: "1.25rem",
            fontSize: "0.9rem",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              margin: "0 0 0.5rem",
            }}
          >
            Dados do Cliente
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <div>
                <strong>Cliente:</strong> {os.cliente.nome}
              </div>
              {"telefone" in os.cliente && os.cliente.telefone && (
                <div>
                  <strong>Telefone:</strong> {os.cliente.telefone}
                </div>
              )}
            </div>

            <div style={{ textAlign: "right" }}>
              <div>
                <strong>Equipamento:</strong> {os.equipamento}
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section
          style={{
            marginBottom: "1.25rem",
            fontSize: "0.9rem",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              margin: "0 0 0.5rem",
            }}
          >
            Valores
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid #000",
              padding: "0.5rem 0.75rem",
              borderRadius: "4px",
            }}
          >
            <span>
              <strong>Total da OS:</strong>
            </span>
            <span>
              <strong>R$ {os.total.toFixed(2)}</strong>
            </span>
          </div>
        </section>

        {/* Campos de texto */}
        <section
          style={{
            fontSize: "0.9rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.9rem",
          }}
        >
          <BlocoTexto
            titulo="Observações Gerais"
            conteudo={os.observacoesGerais}
          />
          <BlocoTexto
            titulo="Defeito Relatado"
            conteudo={os.defeitoRelatado}
          />
          <BlocoTexto titulo="Laudo Técnico" conteudo={os.laudoTecnico} />
          <BlocoTexto titulo="Solução" conteudo={os.solucao} />
        </section>

        {/* Assinaturas */}
        <section
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
            fontSize: "0.9rem",
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            <div
              style={{
                borderTop: "1px solid #000",
                marginBottom: "0.25rem",
              }}
            />
            <div>Assinatura do Técnico</div>
          </div>

          <div
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            <div
              style={{
                borderTop: "1px solid #000",
                marginBottom: "0.25rem",
              }}
            />
            <div>Assinatura do Cliente</div>
          </div>
        </section>
      </div>
    </div>
  );
}

interface BlocoTextoProps {
  titulo: string;
  conteudo?: string;
}

function BlocoTexto({ titulo, conteudo }: BlocoTextoProps) {
  const vazio = !conteudo;

  return (
    <div>
      <h3
        style={{
          fontSize: "0.95rem",
          margin: "0 0 0.25rem",
        }}
      >
        {titulo}
      </h3>
      <div
        style={{
          minHeight: "3rem",
          border: "1px solid #000",
          borderRadius: "4px",
          padding: "0.5rem 0.6rem",
          whiteSpace: "pre-wrap",
        }}
      >
        {vazio ? <span style={{ opacity: 0.6 }}>—</span> : conteudo}
      </div>
    </div>
  );
}
