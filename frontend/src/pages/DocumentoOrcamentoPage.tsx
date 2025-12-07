// src/pages/DocumentoOrcamentoPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useOrcamentos } from "../context/OrcamentoContext";
import { useEmpresa } from "../context/EmpresaContext";

export function DocumentoOrcamentoPage() {
  const { id } = useParams<{ id: string }>();
  const { listaOrcamentos } = useOrcamentos();
  const { dados: empresa } = useEmpresa();
  const navigate = useNavigate();

  const orcamento = listaOrcamentos.find((orc) => orc.id === id);

  if (!orcamento) {
    return (
      <div style={{ padding: "1rem" }}>
        <h1>Documento de Orçamento</h1>
        <p style={{ marginTop: "1rem" }}>Orçamento não encontrado.</p>
        <button
          type="button"
          onClick={() => navigate("/orcamentos")}
          style={{
            marginTop: "0.75rem",
            padding: "0.5rem 0.9rem",
            borderRadius: "6px",
            border: "1px solid #444",
            backgroundColor: "#f2f2f2",
            color: "#111",
            cursor: "pointer",
          }}
        >
          Voltar para lista
        </button>
      </div>
    );
  }

  const data = new Date(orcamento.dataEmissao).toLocaleDateString("pt-BR");

  function handlePrint() {
    window.print();
  }

  return (
    <div
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        backgroundColor: "#111",
        color: "#111",
        minHeight: "100vh",
        padding: "1.5rem 1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#fff",
          padding: "1.5rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.08)",
        }}
      >
        {/* barra de ações */}
        <div
          className="no-print"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            gap: "0.5rem",
          }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#fafafa",
              cursor: "pointer",
            }}
          >
            ← Voltar
          </button>

          <button
            type="button"
            onClick={handlePrint}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "4px",
              border: "1px solid #1976d2",
              backgroundColor: "#2196f3",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Imprimir
          </button>
        </div>

        {/* CABEÇALHO DO DOCUMENTO */}
        <header
          style={{
            borderBottom: "2px solid #ddd",
            paddingBottom: "0.75rem",
            marginBottom: "0.75rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.2rem",
                margin: 0,
              }}
            >
              {empresa.nomeFantasia}
            </h1>
            <p
              style={{
                margin: "0.25rem 0 0",
                fontSize: "0.85rem",
              }}
            >
              {empresa.documento && <>CNPJ/CPF: {empresa.documento} <br /></>}
              {empresa.telefone && <>Telefone: {empresa.telefone} <br /></>}
              {empresa.endereco && <>Endereço: {empresa.endereco} <br /></>}
              {empresa.cidade && <>Cidade: {empresa.cidade}</>}
            </p>
          </div>

          <div
            style={{
              textAlign: "right",
              fontSize: "0.9rem",
            }}
          >
            <div>
              <strong>Orçamento:</strong> {orcamento.numero}
            </div>
            <div>
              <strong>Data:</strong> {data}
            </div>
            <div>
              <strong>Validade:</strong> {orcamento.validadeDias} dia(s)
            </div>
          </div>
        </header>

        {/* DADOS DO CLIENTE */}
        <section
          style={{
            marginBottom: "0.75rem",
            fontSize: "0.9rem",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              marginBottom: "0.25rem",
            }}
          >
            Dados do Cliente
          </h2>

          <p style={{ margin: 0 }}>
            <strong>Nome:</strong> {orcamento.cliente.nome}
            <br />
            {"cpfCnpj" in orcamento.cliente &&
              orcamento.cliente.cpfCnpj && (
                <>
                  <strong>CPF/CNPJ:</strong> {orcamento.cliente.cpfCnpj}
                  <br />
                </>
              )}
            {"telefone" in orcamento.cliente &&
              orcamento.cliente.telefone && (
                <>
                  <strong>Telefone:</strong> {orcamento.cliente.telefone}
                  <br />
                </>
              )}
            {"cidade" in orcamento.cliente && orcamento.cliente.cidade && (
              <>
                <strong>Cidade:</strong> {orcamento.cliente.cidade}
              </>
            )}
          </p>
        </section>

        {/* ITENS */}
        <section
          style={{
            marginTop: "0.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              marginBottom: "0.4rem",
            }}
          >
            Itens do Orçamento
          </h2>

          {orcamento.itens.length === 0 ? (
            <p
              style={{
                fontSize: "0.9rem",
                marginTop: "0.25rem",
              }}
            >
              Nenhum item informado.
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.9rem",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.4rem",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Descrição
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.4rem",
                      borderBottom: "1px solid #ddd",
                      width: "60px",
                    }}
                  >
                    Qtd.
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.4rem",
                      borderBottom: "1px solid #ddd",
                      width: "100px",
                    }}
                  >
                    V. Unitário
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.4rem",
                      borderBottom: "1px solid #ddd",
                      width: "100px",
                    }}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orcamento.itens.map((item) => (
                  <tr key={item.id}>
                    <td
                      style={{
                        padding: "0.4rem",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {item.descricao}
                    </td>
                    <td
                      style={{
                        padding: "0.4rem",
                        borderBottom: "1px solid #eee",
                        textAlign: "right",
                      }}
                    >
                      {item.quantidade}
                    </td>
                    <td
                      style={{
                        padding: "0.4rem",
                        borderBottom: "1px solid #eee",
                        textAlign: "right",
                      }}
                    >
                      R$ {item.valorUnitario.toFixed(2)}
                    </td>
                    <td
                      style={{
                        padding: "0.4rem",
                        borderBottom: "1px solid #eee",
                        textAlign: "right",
                      }}
                    >
                      R$ {item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div
            style={{
              marginTop: "0.6rem",
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "0.95rem",
            }}
          >
            <div>
              <strong>Total do orçamento: </strong>
              R$ {orcamento.total.toFixed(2)}
            </div>
          </div>
        </section>

        {/* OBSERVAÇÕES */}
        <section
          style={{
            marginTop: "1rem",
            fontSize: "0.9rem",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              marginBottom: "0.25rem",
            }}
          >
            Observações
          </h2>
          <p
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {orcamento.observacoes || "Nenhuma observação adicional."}
          </p>
        </section>

        {/* ASSINATURAS */}
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
                margin: "0 auto",
                width: "70%",
                paddingTop: "0.25rem",
              }}
            >
              Assinatura do Cliente
            </div>
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
                margin: "0 auto",
                width: "70%",
                paddingTop: "0.25rem",
              }}
            >
              Assinatura do Responsável Técnico
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
