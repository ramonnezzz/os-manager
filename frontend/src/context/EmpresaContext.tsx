import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface EmpresaDados {
  nomeFantasia: string;
  documento: string;
  telefone: string;
  endereco: string;
  cidade: string;
  email: string;
}

interface EmpresaContextValue {
  dados: EmpresaDados;
  atualizarDados: (parcial: Partial<EmpresaDados>) => void;
}

const STORAGE_KEY = "os-manager:empresa";

const DEFAULT_DADOS: EmpresaDados = {
  nomeFantasia: "S. Ramon Serviços em Tecnologia da Informação",
  documento: "",
  telefone: "",
  endereco: "",
  cidade: "",
  email: "",
};

const EmpresaContext = createContext<EmpresaContextValue | undefined>(
  undefined
);

export function EmpresaProvider({ children }: { children: ReactNode }) {
  const [dados, setDados] = useState<EmpresaDados>(() => {
    if (typeof window === "undefined") return DEFAULT_DADOS;
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (!salvo) return DEFAULT_DADOS;
    try {
      const parsed = JSON.parse(salvo) as Partial<EmpresaDados>;
      return {
        ...DEFAULT_DADOS,
        ...parsed,
      };
    } catch {
      return DEFAULT_DADOS;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
  }, [dados]);

  function atualizarDados(parcial: Partial<EmpresaDados>) {
    setDados((atual) => ({
      ...atual,
      ...parcial,
    }));
  }

  return (
    <EmpresaContext.Provider value={{ dados, atualizarDados }}>
      {children}
    </EmpresaContext.Provider>
  );
}

export function useEmpresa() {
  const ctx = useContext(EmpresaContext);
  if (!ctx) {
    throw new Error("useEmpresa deve ser usado dentro de EmpresaProvider");
  }
  return ctx;
}
