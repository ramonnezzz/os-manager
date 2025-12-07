import type { Cliente } from "./cliente";
import type { ItemCatalogo } from "./itemCatalogo";

export type StatusOS =
  | "Aberta"
  | "Em andamento"
  | "Aguardando peça"
  | "Concluída"
  | "Cancelada";

export interface OSItem {
  id: string;
  ordemServicoId: string;
  itemCatalogoId?: string;
  itemCatalogo?: ItemCatalogo;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  total: number;
}

export interface OrdemServico {
  id: string;
  numero: string;
  cliente: Cliente;
  dataAbertura: string;
  status: StatusOS;
  equipamento: string;
  defeitoRelatado?: string;

  /** Campo de texto livre com contexto geral da OS */
  observacoesGerais?: string;

  /** Campo para laudo técnico resumido */
  laudoTecnico?: string;

  /** Campo para solução aplicada */
  solucao?: string;

  valorMaoDeObra: number;
  valorProdutos: number;
  desconto: number;
  total: number;
  itens: OSItem[];
}