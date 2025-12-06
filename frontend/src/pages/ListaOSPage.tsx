import { useOS } from "../context/OSContext";

export function ListaOSPage() {
  const { listaOS } = useOS();

  const semOS = listaOS.length === 0;

  return (
    <div>
      <h1>Ordens de Serviço</h1>

      {semOS ? (
        <p>Nenhuma OS cadastrada ainda.</p>
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
              <th style={{ textAlign: "left", padding: "0.5rem" }}>
                Número
              </th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>
                Cliente
              </th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>
                Status
              </th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>
                Data de abertura
              </th>
              <th style={{ textAlign: "right", padding: "0.5rem" }}>
                Total (R$)
              </th>
            </tr>
          </thead>
          <tbody>
            {listaOS.map((os) => (
              <tr key={os.id}>
                <td style={{ padding: "0.5rem", borderTop: "1px solid #333" }}>
                  {os.numero}
                </td>
                <td style={{ padding: "0.5rem", borderTop: "1px solid #333" }}>
                  {os.cliente.nome}
                </td>
                <td style={{ padding: "0.5rem", borderTop: "1px solid #333" }}>
                  {os.status}
                </td>
                <td style={{ padding: "0.5rem", borderTop: "1px solid #333" }}>
                  {new Date(os.dataAbertura).toLocaleDateString("pt-BR")}
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    borderTop: "1px solid #333",
                    textAlign: "right",
                  }}
                >
                  {os.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}