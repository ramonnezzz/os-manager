import { useOrcamentos } from "../context/OrcamentoContext";

export function ListaOrcamentosPage() {
  const { listaOrcamentos } = useOrcamentos();

  const vazio = listaOrcamentos.length === 0;

  return (
    <div>
      <h1>Orçamentos</h1>

      {vazio ? (
        <p>Nenhum orçamento cadastrado ainda.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Número</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Cliente</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Status</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>
                Data emissão
              </th>
              <th style={{ textAlign: "right", padding: "0.5rem" }}>
                Total (R$)
              </th>
            </tr>
          </thead>
          <tbody>
            {listaOrcamentos.map((orc) => (
              <tr key={orc.id}>
                <td
                  style={{
                    padding: "0.5rem",
                    borderTop: "1px solid #333",
                  }}
                >
                  {orc.numero}
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    borderTop: "1px solid #333",
                  }}
                >
                  {orc.cliente.nome}
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    borderTop: "1px solid #333",
                  }}
                >
                  {orc.status}
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    borderTop: "1px solid #333",
                  }}
                >
                  {new Date(orc.dataEmissao).toLocaleDateString("pt-BR")}
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    borderTop: "1px solid #333",
                    textAlign: "right",
                  }}
                >
                  {orc.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}