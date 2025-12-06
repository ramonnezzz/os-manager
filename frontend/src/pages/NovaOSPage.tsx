// src/pages/NovaOSPage.tsx
import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOS } from "../context/OSContext";
import type { Cliente } from "../types/cliente";
import type { OrdemServico } from "../types/ordemServico";

export function NovaOSPage() {
  const { adicionarOS } = useOS();
  const navigate = useNavigate();

  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [defeitoRelatado, setDefeitoRelatado] = useState("");
  const [valorMaoDeObra, setValorMaoDeObra] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro(null);

    if (!nomeCliente.trim()) {
      setErro("Informe o nome do cliente.");
      return;
    }

    if (!equipamento.trim()) {
      setErro("Informe o equipamento.");
      return;
    }

    const valorMaoDeObraNumero = Number(
      (valorMaoDeObra || "0").replace(",", ".")
    );

    const timestamp = Date.now();
    const ano = new Date().getFullYear();

    const clienteId = `cli-${timestamp}`;
    const osId = `os-${timestamp}`;

    const cliente: Cliente = {
      id: clienteId,
      nome: nomeCliente.trim(),
      tipoPessoa: "PF",
      telefone: telefoneCliente.trim() || undefined,
    };

    const novaOS: OrdemServico = {
      id: osId,
      numero: `OS-${ano}-${timestamp}`,
      cliente,
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
    setNomeCliente("");
    setTelefoneCliente("");
    setEquipamento("");
    setDefeitoRelatado("");
    setValorMaoDeObra("");

    // manda pra listagem de OS
    navigate("/os");
  }

  return (
    <div>
      <h1>Nova Ordem de Serviço</h1>
      <p>Cadastre uma nova OS preenchendo os dados abaixo.</p>

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

        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Nome do cliente *
          </label>
          <input
            type="text"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            required
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

        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Telefone do cliente
          </label>
          <input
            type="tel"
            value={telefoneCliente}
            onChange={(e) => setTelefoneCliente(e.target.value)}
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
