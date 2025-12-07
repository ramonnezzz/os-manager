// src/components/PixQrCodeOS.tsx
import { PixCanvas } from "react-qrcode-pix";

type PixQrCodeOSProps = {
  /** Número da OS (ex: 0003-25) */
  numeroOS: string;
  /** Valor total da OS em reais (ex: 260) */
  total: number;
};

export function PixQrCodeOS({ numeroOS, total }: PixQrCodeOSProps) {
  // Garante número com no máximo 2 casas decimais
  const amount = Number(total.toFixed(2));

  // Se não tiver valor (> 0), nem mostra o QRCode
  if (!amount || amount <= 0) {
    return null;
  }

  const codigoPagamento = `OS-${numeroOS}`.slice(0, 25); // limite de 25 chars

  return (
    <section
      style={{
        marginTop: "2rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid #ddd",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "0.5rem" }}>Pagamento via Pix</h3>

      <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
        Aponte a câmera do seu banco para o QR Code abaixo{" "}
        para pagar o valor desta Ordem de Serviço.
      </p>

      <div style={{ display: "inline-block" }}>
        <PixCanvas
          // *** DADOS FIXOS DA SUA CONTA ***
          // sua chave PIX CNPJ/CPF/aleatória SEM pontos ou traços
          pixkey="71182204180"
          // nome do recebedor exatamente como no banco (sem caracteres esquisitos)
          merchant="SAVIO RAMON LIMA NOGUEIRA"
          // cidade do recebedor (ideal em caixa alta e sem acentos)
          city="PALMAS"
          // opcional, pode por o CEP da empresa
          cep="77000000"
          // valor da OS
          amount={amount}
          // identificador interno da cobrança (aparece na descrição em alguns bancos)
          code={codigoPagamento}
          // opcional: se quiser ver o payload gerado
          onLoad={(payload) => {
            console.log("Payload PIX gerado para OS:", numeroOS, payload);
          }}
        />
      </div>

      <p style={{ fontSize: "0.85rem", marginTop: "0.75rem", color: "#555" }}>
        Valor: <strong>R$ {amount.toFixed(2)}</strong> — OS: {numeroOS}
      </p>
    </section>
  );
}
