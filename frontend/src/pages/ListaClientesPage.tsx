import { useState } from "react";
import type { FormEvent } from "react";
import { useClientes } from "../context/ClienteContext";
import type { Cliente } from "../types/cliente";

export function ListaClientesPage() {
  const { listaClientes, adicionarCliente } = useClientes();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [cidade, setCidade] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro(null);

    if (!nome.trim()) {
      setErro("Informe o nome do cliente.");
      return;
    }

    const timestamp = Date.now();
    const cliente: Cliente = {
      id: `cli-${timestamp}`,
      nome: nome.trim(),
      tipoPessoa: "PF", // por padrão; depois pode permitir escolher
      telefone: telefone.trim() || undefined,
      cpfCnpj: cpfCnpj.trim() || undefined,
      cidade: cidade.trim() || undefined,
    };

    adicionarCliente(cliente);

    setNome("");
    setTelefone("");
    setCpfCnpj("");
    setCidade("");
  }

  const vazio = listaClientes.length === 0;

  return (
    <div>
      <h1>Clientes</h1>
      <p>Cadastre e visualize seus clientes.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "1rem",
          marginBottom: "1.5rem",
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
            Nome *
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
            Telefone
          </label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
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
            CPF/CNPJ
          </label>
          <input
            type="text"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(e.target.value)}
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
            Cidade
          </label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
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
          Salvar cliente
        </button>
      </form>

      {vazio ? (
        <p>Nenhum cliente cadastrado ainda.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "0.5rem",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Nome</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Telefone</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>
                CPF/CNPJ
              </th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Cidade</th>
            </tr>
          </thead>
          <tbody>
            {listaClientes.map((cli) => (
              <tr key={cli.id}>
                <td
                  style={{
                    padding: "0.5rem",
                    borderTop: "1px solid #333",
                  }}
                >
                  {cli.nome}
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    borderTop: "1px solid #333",
                  }}
                >
                  {cli.telefone ?? "-"}
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    borderTop: "1px solid #333",
                  }}
                >
                  {cli.cpfCnpj ?? "-"}
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    borderTop: "1px solid #333",
                  }}
                >
                  {cli.cidade ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
