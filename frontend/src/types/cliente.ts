export interface Cliente {
  id: string;
  nome: string;
  tipoPessoa: "PF" | "PJ";
  cpfCnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  observacoes?: string;
}