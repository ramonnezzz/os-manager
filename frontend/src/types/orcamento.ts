import type { Cliente } from "./cliente";
import type { ItemCatalogo } from "./itemCatalogo";

export type StatusOrcamento =
  | "Emitido"
  | "Aprovado"
  | "Rejeitado"
  | "ConvertidoEmOS";

export interface OrcamentoItem {
  id: string;
  orcamentoId: string;
  itemCatalogoId?: string;     // pode vir de ItemCatalogo...
  itemCatalogo?: ItemCatalogo; // ...pra uso em tela
  descricao: string;           // como aparece no PDF
  quantidade: number;
  valorUnitario: number;
  desconto?: number;           // valor absoluto
  total: number;
}

export interface Orcamento {
  id: string;
  numero: string;        // ex: "2025-0001"
  cliente: Cliente;
  dataEmissao: string;   // ISO: new Date().toISOString()
  validadeDias: number;
  status: StatusOrcamento;
  observacoes?: string;
  itens: OrcamentoItem[];
  total: number;
  osId?: string;         // se virou OS
}