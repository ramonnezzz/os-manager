import { type FormEvent, useState } from "react";
import { useEmpresa } from "../context/EmpresaContext";

export function ConfiguracoesEmpresaPage() {
  const { dados, atualizarDados } = useEmpresa();

  const [form, setForm] = useState({
    nomeFantasia: dados.nomeFantasia,
    documento: dados.documento,
    telefone: dados.telefone,
    endereco: dados.endereco,
    cidade: dados.cidade,
    email: dados.email,
    chavePix: dados.chavePix,
  });

  const [mensagem, setMensagem] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    atualizarDados(form);
    setMensagem("Configurações salvas com sucesso.");
    setTimeout(() => setMensagem(null), 3000);
  }

  return (
    <div>
      <h1>Configurações da Empresa</h1>

      {mensagem && (
        <div
          style={{
            marginTop: "0.75rem",
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
            backgroundColor: "#16331a",
            border: "1px solid #2b8a3e",
            color: "#a2f2b2",
            fontSize: "0.9rem",
          }}
        >
          {mensagem}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <CampoTexto
          label="Nome fantasia"
          value={form.nomeFantasia}
          onChange={(valor) =>
            setForm((f) => ({ ...f, nomeFantasia: valor }))
          }
          required
        />

        <CampoTexto
          label="CNPJ/CPF"
          value={form.documento}
          onChange={(valor) => setForm((f) => ({ ...f, documento: valor }))}
        />

        <CampoTexto
          label="Telefone"
          value={form.telefone}
          onChange={(valor) => setForm((f) => ({ ...f, telefone: valor }))}
        />

        <CampoTexto
          label="Endereço"
          value={form.endereco}
          onChange={(valor) => setForm((f) => ({ ...f, endereco: valor }))}
        />

        <CampoTexto
          label="Cidade"
          value={form.cidade}
          onChange={(valor) => setForm((f) => ({ ...f, cidade: valor }))}
        />

        <CampoTexto
          label="E-mail"
          type="email"
          value={form.email}
          onChange={(valor) => setForm((f) => ({ ...f, email: valor }))}
        />

        <CampoTexto
          label="Chave Pix (e-mail, CPF, CNPJ ou aleatória)"
          value={form.chavePix}
          onChange={(valor) => setForm((f) => ({ ...f, chavePix: valor }))}
        />

        <button
          type="submit"
          style={{
            marginTop: "0.5rem",
            padding: "0.6rem 0.9rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4e8cff",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Salvar configurações
        </button>
      </form>
    </div>
  );
}

interface CampoTextoProps {
  label: string;
  value: string;
  onChange: (valor: string) => void;
  type?: string;
  required?: boolean;
}

function CampoTexto({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: CampoTextoProps) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        fontSize: "0.9rem",
      }}
    >
      <span>{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "0.45rem 0.6rem",
          borderRadius: "6px",
          border: "1px solid #333",
          backgroundColor: "#181818",
          color: "#f5f5f5",
          fontSize: "0.9rem",
        }}
      />
    </label>
  );
}
