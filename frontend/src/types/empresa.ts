export interface Empresa {
  id: string;
  nomeFantasia: string;
  razaoSocial?: string;
  tipoPessoa: "PF" | "PJ";
  cpfCnpj: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  logoUrl?: string;
  chavePix?: string;
  observacoesPadraoDoc?: string; // ex: "Orçamento válido por 7 dias."
}