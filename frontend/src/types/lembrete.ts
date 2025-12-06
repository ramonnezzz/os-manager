export type TipoLembrete =
  | "Visita"
  | "Retorno cliente"
  | "Cobrança"
  | "Entrega"
  | "Outro";

export type StatusLembrete = "Pendente" | "Concluído";

export interface Lembrete {
  id: string;
  dataHora: string; // ISO
  titulo: string;
  descricao?: string;
  tipo: TipoLembrete;
  status: StatusLembrete;
  clienteId?: string;
  osId?: string;
}