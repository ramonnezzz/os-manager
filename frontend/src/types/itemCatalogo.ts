export type TipoItemCatalogo = "produto" | "servico";

export interface ItemCatalogo {
  id: string;
  tipo: TipoItemCatalogo;
  nome: string;
  descricao?: string;
  precoBase: number;     // valor padrão, em reais
  unidade: string;       // ex: "peça", "hora", "serviço"
  codigoBarras?: string;
  ativo: boolean;
}