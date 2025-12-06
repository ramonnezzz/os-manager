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
  numero: string; // ex: "OS-2025-0001"
  cliente: Cliente;

  dataAbertura: string;
  dataPrevistaConclusao?: string;
  dataConclusao?: string;

  status: StatusOS;

  equipamento?: string;
  serieOuEtiqueta?: string;
  senhaAcesso?: string;

  defeitoRelatado?: string;
  diagnosticoTecnico?: string;
  servicoExecutado?: string;

  observacoes?: string;

  valorMaoDeObra?: number;
  valorProdutos?: number;
  desconto?: number;
  total: number;

  itens: OSItem[];
}