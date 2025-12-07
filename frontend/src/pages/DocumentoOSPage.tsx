// src/pages/DocumentoOSPage.tsx
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOS } from "../context/OSContext";
import { useEmpresa } from "../context/EmpresaContext";
import { PixQrCodeOS } from "../components/PixQrCodeOS";

export function DocumentoOSPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { listaOS } = useOS();
  const { dados: empresa } = useEmpresa();

  const os = listaOS.find((item) => item.id === id) ?? null;

  useEffect(() => {
    // rola pro topo ao abrir o documento
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function handleVoltar() {
    navigate(-1);
  }

  function handleImprimir() {
    window.print();
  }

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
        <p>Ordem de Serviço não encontrada.</p>
      </div>
    );
  }

  const dataAbertura = new Date(os.dataAbertura).toLocaleDateString("pt-BR");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111",
        display: "flex",
        justifyContent: "center",
        padding: "1.5rem 0",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: "1.5rem 1.75rem 2.5rem",
          boxShadow: "0 0 12px rgba(0, 0, 0, 0.6)",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Barra de ações – esconder via CSS @media print (.print-hide) */}
        <div
          className="print-hide"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <button
            type="button"
            onClick={handleVoltar}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "6px",
              border: "1px solid #ddd",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            ← Voltar
          </button>

          <button
            type="button"
            onClick={handleImprimir}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "6px",
              border: "1px solid #0d6efd",
              backgroundColor: "#0d6efd",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Imprimir
          </button>
        </div>

        {/* Cabeçalho do documento */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            paddingBottom: "0.75rem",
            borderBottom: "2px solid #000",
            marginBottom: "1.25rem",
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
                margin: "0.3rem 0 0",
                fontSize: "0.9rem",
              }}
            >
              {empresa.nomeFantasia || "S. Ramon Serviços em Tecnologia da Informação"}
            </p>
            {(empresa.documento ||
              empresa.telefone ||
              empresa.endereco ||
              empresa.cidade) && (
              <p
                style={{
                  margin: "0.15rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                {empresa.documento && <>Doc: {empresa.documento} · </>}
                {empresa.telefone && <>Tel: {empresa.telefone} · </>}
                {empresa.endereco && <>{empresa.endereco} · </>}
                {empresa.cidade && <>{empresa.cidade}</>}
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
              <strong>OS:</strong> {os.numero}
            </div>
            <div>
              <strong>Data:</strong> {dataAbertura}
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
              margin: "0 0 0.4rem",
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
                <strong>Nome:</strong> {os.cliente?.nome ?? "-"}
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

        {/* Valores / resumo financeiro */}
        <section
          style={{
            marginBottom: "1.25rem",
            fontSize: "0.9rem",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              margin: "0 0 0.4rem",
            }}
          >
            Valores
          </h2>

          <div
            style={{
              border: "1px solid #000",
              borderRadius: "4px",
              padding: "0.5rem 0.75rem",
              display: "flex",
              justifyContent: "space-between",
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

        {/* QRCode PIX para pagamento da OS */}
        <PixQrCodeOS numeroOS={os.numero} total={os.total} />

        {/* Campos de texto / laudos */}
        <section
          style={{
            marginTop: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            fontSize: "0.9rem",
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
          <BlocoTexto
            titulo="Laudo Técnico"
            conteudo={os.laudoTecnico}
          />
          <BlocoTexto titulo="Solução" conteudo={os.solucao} />
        </section>

        {/* Assinaturas */}
        <section
          style={{
            marginTop: "2.25rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
            fontSize: "0.9rem",
          }}
        >
          <div style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                borderTop: "1px solid #000",
                marginBottom: "0.25rem",
              }}
            />
            <div>Assinatura do Técnico</div>
          </div>

          <div style={{ flex: 1, textAlign: "center" }}>
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
  const vazio = !conteudo || conteudo.trim().length === 0;

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
        {vazio ? <span style={{ opacity: 0.5 }}>—</span> : conteudo}
      </div>
    </div>
  );
}
