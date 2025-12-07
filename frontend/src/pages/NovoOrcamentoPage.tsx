import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useOrcamentos } from "../context/OrcamentoContext";
import { useClientes } from "../context/ClienteContext";
import type { Orcamento, OrcamentoItem } from "../types/orcamento";

interface ItemForm {
  descricao: string;
  quantidade: string;     // string no form
  valorUnitario: string;  // convertemos no submit
}

export function NovoOrcamentoPage() {
  const { adicionarOrcamento } = useOrcamentos();
  const { listaClientes } = useClientes();
  const navigate = useNavigate();

  const [clienteIdSelecionado, setClienteIdSelecionado] = useState("");
  const [validadeDias, setValidadeDias] = useState("7");
  const [observacoes, setObservacoes] = useState("");
  const [itens, setItens] = useState<ItemForm[]>([
    { descricao: "", quantidade: "1", valorUnitario: "" },
  ]);

  const [erro, setErro] = useState<string | null>(null);

  const semClientes = listaClientes.length === 0;

  function atualizarItem(index: number, campo: keyof ItemForm, valor: string) {
    setItens((anteriores) =>
      anteriores.map((item, i) =>
        i === index ? { ...item, [campo]: valor } : item
      )
    );
  }

  function adicionarLinhaItem() {
    setItens((anteriores) => [
      ...anteriores,
      { descricao: "", quantidade: "1", valorUnitario: "" },
    ]);
  }

  function removerLinhaItem(index: number) {
    setItens((anteriores) => anteriores.filter((_, i) => i !== index));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro(null);

    if (semClientes) {
      setErro("Cadastre ao menos um cliente antes de criar um orçamento.");
      return;
    }

    if (!clienteIdSelecionado) {
      setErro("Selecione um cliente.");
      return;
    }

    const cliente = listaClientes.find(
      (cli) => cli.id === clienteIdSelecionado
    );

    if (!cliente) {
      setErro("Cliente selecionado não encontrado.");
      return;
    }

    const itensValidos = itens.filter(
      (item) => item.descricao.trim() && Number(item.quantidade) > 0
    );

    if (itensValidos.length === 0) {
      setErro("Adicione ao menos um item com descrição e quantidade.");
      return;
    }

    const timestamp = Date.now();
    const ano = new Date().getFullYear();
    const orcamentoId = `orc-${timestamp}`;

    const validadeNumero = Number(validadeDias || "0") || 0;

    const itensOrcamento: OrcamentoItem[] = itensValidos.map((item, index) => {
      const quantidadeNum = Number(item.quantidade.replace(",", ".")) || 0;
      const valorUnitarioNum = Number(
        item.valorUnitario.replace(",", ".") || "0"
      );
      const total = quantidadeNum * valorUnitarioNum;

      return {
        id: `${orcamentoId}-item-${index}`,
        orcamentoId,
        descricao: item.descricao.trim(),
        quantidade: quantidadeNum,
        valorUnitario: valorUnitarioNum,
        total,
      };
    });

    const totalOrcamento = itensOrcamento.reduce(
      (acc, item) => acc + item.total,
      0
    );

    const novoOrcamento: Orcamento = {
      id: orcamentoId,
      numero: `ORC-${ano}-${timestamp}`,
      cliente, // usa cliente cadastrado
      dataEmissao: new Date().toISOString(),
      validadeDias: validadeNumero || 7,
      status: "Emitido",
      observacoes: observacoes.trim() || undefined,
      itens: itensOrcamento,
      total: totalOrcamento,
    };

    adicionarOrcamento(novoOrcamento);

    // limpa form
    setClienteIdSelecionado("");
    setValidadeDias("7");
    setObservacoes("");
    setItens([{ descricao: "", quantidade: "1", valorUnitario: "" }]);

    // vai pra listagem de orçamentos
    navigate("/orcamentos");
  }

  // cálculo em tempo real para mostrar o total
  const totalVisual = itens.reduce((acc, item) => {
    const quantidadeNum = Number(item.quantidade.replace(",", ".")) || 0;
    const valorUnitarioNum =
      Number(item.valorUnitario.replace(",", ".")) || 0;
    return acc + quantidadeNum * valorUnitarioNum;
  }, 0);

  if (semClientes) {
    return (
      <div>
        <h1>Novo Orçamento</h1>
        <p style={{ marginTop: "1rem" }}>
          Você ainda não possui clientes cadastrados.
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          Vá até a página{" "}
          <Link to="/clientes" style={{ color: "#4e8cff" }}>
            Clientes
          </Link>{" "}
          para cadastrar ao menos um cliente antes de criar um orçamento.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Novo Orçamento</h1>
      <p>Selecione um cliente cadastrado e adicione os itens do orçamento.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "640px",
        }}
      >
        {erro && (
          <div
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "4px",
              backgroundColor: "#331111",
              color: "#ffb3b3",
              fontSize: "0.9rem",
            }}
          >
            {erro}
          </div>
        )}

        {/* Cliente + validade */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Cliente *
            </label>
            <select
              value={clienteIdSelecionado}
              onChange={(e) => setClienteIdSelecionado(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid #333",
                backgroundColor: "#181818",
                color: "#f5f5f5",
              }}
            >
              <option value="">Selecione um cliente</option>
              {listaClientes.map((cli) => (
                <option key={cli.id} value={cli.id}>
                  {cli.nome} {cli.cidade ? `- ${cli.cidade}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Validade do orçamento (dias)
            </label>
            <input
              type="number"
              min="0"
              value={validadeDias}
              onChange={(e) => setValidadeDias(e.target.value)}
              style={{
                width: "100%",
                maxWidth: "160px",
                padding: "0.5rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid #333",
                backgroundColor: "#181818",
                color: "#f5f5f5",
              }}
            />
          </div>
        </section>

        {/* Itens do orçamento */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <h2 style={{ fontSize: "1.1rem" }}>Itens</h2>

          {itens.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr auto",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="Descrição"
                value={item.descricao}
                onChange={(e) =>
                  atualizarItem(index, "descricao", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #333",
                  backgroundColor: "#181818",
                  color: "#f5f5f5",
                }}
              />

              <input
                type="number"
                min="0"
                step="1"
                placeholder="Qtd."
                value={item.quantidade}
                onChange={(e) =>
                  atualizarItem(index, "quantidade", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #333",
                  backgroundColor: "#181818",
                  color: "#f5f5f5",
                }}
              />

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Valor unitário"
                value={item.valorUnitario}
                onChange={(e) =>
                  atualizarItem(index, "valorUnitario", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #333",
                  backgroundColor: "#181818",
                  color: "#f5f5f5",
                }}
              />

              <button
                type="button"
                onClick={() => removerLinhaItem(index)}
                disabled={itens.length === 1}
                style={{
                  padding: "0.4rem 0.6rem",
                  borderRadius: "4px",
                  border: "1px solid #444",
                  backgroundColor: "#221111",
                  color: "#ffb3b3",
                  cursor: itens.length === 1 ? "not-allowed" : "pointer",
                }}
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={adicionarLinhaItem}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 0.75rem",
              borderRadius: "4px",
              border: "1px solid #4e8cff",
              backgroundColor: "transparent",
              color: "#4e8cff",
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            + Adicionar item
          </button>
        </section>

        {/* Observações e total */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Observações
            </label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid #333",
                backgroundColor: "#181818",
                color: "#f5f5f5",
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "0.5rem",
            }}
          >
            <strong>Total:</strong>
            <span>R$ {totalVisual.toFixed(2)}</span>
          </div>
        </section>

        <button
          type="submit"
          style={{
            marginTop: "0.5rem",
            padding: "0.6rem 1rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#4e8cff",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            alignSelf: "flex-start",
          }}
        >
          Salvar orçamento
        </button>
      </form>
    </div>
  );
}
