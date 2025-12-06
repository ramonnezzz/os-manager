export type TipoLancamento = "receita" | "despesa";

export type OrigemLancamento = "OS" | "Orcamento" | "Manual";

export type FormaPagamento =
  | "PIX"
  | "Dinheiro"
  | "Cartão crédito"
  | "Cartão débito"
  | "Transferência"
  | "Boleto"
  | "Outro";

export interface LancamentoFinanceiro {
  id: string;
  tipo: TipoLancamento;
  origemTipo: OrigemLancamento;
  origemId?: string; // id da OS ou Orçamento, se tiver

  dataCompetencia: string; // quando o serviço/compra aconteceu
  dataVencimento?: string;
  dataPagamento?: string;

  valor: number;
  formaPagamento?: FormaPagamento;
  categoria?: string; // "Serviço", "Peças", "Combustível", etc.
  descricao?: string;
}