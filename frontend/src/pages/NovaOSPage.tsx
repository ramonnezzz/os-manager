import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useOS } from "../context/OSContext";
import { useClientes } from "../context/ClienteContext";
import type { OrdemServico } from "../types/ordemServico";

export function NovaOSPage() {
  const { adicionarOS } = useOS();
  const { listaClientes } = useClientes();
  const navigate = useNavigate();

  const [clienteIdSelecionado, setClienteIdSelecionado] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [defeitoRelatado, setDefeitoRelatado] = useState("");
  const [valorMaoDeObra, setValorMaoDeObra] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const semClientes = listaClientes.length === 0;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro(null);

    if (semClientes) {
      setErro("Cadastre ao menos um cliente antes de criar uma OS.");
      return;
    }

    if (!clienteIdSelecionado) {
      setErro("Selecione um cliente.");
      return;
    }

    if (!equipamento.trim()) {
      setErro("Informe o equipamento.");
      return;
    }

    const cliente = listaClientes.find(
      (cli) => cli.id === clienteIdSelecionado
    );

    if (!cliente) {
      setErro("Cliente selecionado não encontrado.");
      return;
    }

    const valorMaoDeObraNumero = Number(
      (valorMaoDeObra || "0").replace(",", ".")
    );

    const timestamp = Date.now();
    const ano = new Date().getFullYear();
    const osId = `os-${timestamp}`;

    const novaOS: OrdemServico = {
      id: osId,
      numero: `OS-${ano}-${timestamp}`,
      cliente, // usa o cliente cadastrado
      dataAbertura: new Date().toISOString(),
      status: "Aberta",
      equipamento: equipamento.trim(),
      defeitoRelatado: defeitoRelatado.trim() || undefined,
      valorMaoDeObra: valorMaoDeObraNumero,
      valorProdutos: 0,
      desconto: 0,
      total: valorMaoDeObraNumero,
      itens: [],
    };

    adicionarOS(novaOS);

    // limpa o formulário
    setClienteIdSelecionado("");
    setEquipamento("");
    setDefeitoRelatado("");
    setValorMaoDeObra("");

    // manda pra listagem de OS
    navigate("/os");
  }

  if (semClientes) {
    return (
      <div>
        <h1>Nova Ordem de Serviço</h1>
        <p style={{ marginTop: "1rem" }}>
          Você ainda não possui clientes cadastrados.
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          Vá até a página{" "}
          <Link to="/clientes" style={{ color: "#4e8cff" }}>
            Clientes
          </Link>{" "}
          para cadastrar ao menos um cliente antes de criar uma OS.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Nova Ordem de Serviço</h1>
      <p>Selecione um cliente cadastrado e preencha os dados da OS.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          maxWidth: "480px",
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

        {/* Seleção de cliente */}
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

        {/* Equipamento */}
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Equipamento *
          </label>
          <input
            type="text"
            value={equipamento}
            onChange={(e) => setEquipamento(e.target.value)}
            required
            placeholder="Ex.: Notebook Dell Inspiron 5558"
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "4px",
              border: "1px solid #333",
              backgroundColor: "#181818",
              color: "#f5f5f5",
            }}
          />
        </div>

        {/* Defeito relatado */}
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Defeito relatado
          </label>
          <textarea
            value={defeitoRelatado}
            onChange={(e) => setDefeitoRelatado(e.target.value)}
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

        {/* Valor da mão de obra */}
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Valor da mão de obra (R$)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={valorMaoDeObra}
            onChange={(e) => setValorMaoDeObra(e.target.value)}
            placeholder="Ex.: 150,00"
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "4px",
              border: "1px solid #333",
              backgroundColor: "#181818",
              color: "#f5f5f5",
            }}
          />
        </div>

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
          Salvar OS
        </button>
      </form>
    </div>
  );
}
