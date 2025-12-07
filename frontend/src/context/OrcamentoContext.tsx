import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Orcamento } from "../types/orcamento";

interface OrcamentoContextValue {
  listaOrcamentos: Orcamento[];
  adicionarOrcamento: (orcamento: Orcamento) => void;
  atualizarStatusOrcamento: (id: string, status: string) => void;
}

const OrcamentoContext = createContext<OrcamentoContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "os-manager:orcamentos";

export function OrcamentoProvider({ children }: { children: ReactNode }) {
  const [listaOrcamentos, setListaOrcamentos] = useState<Orcamento[]>(() => {
    if (typeof window === "undefined") return [];
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (!salvo) return [];
    try {
      return JSON.parse(salvo) as Orcamento[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listaOrcamentos));
  }, [listaOrcamentos]);

  function adicionarOrcamento(orcamento: Orcamento) {
    setListaOrcamentos((anteriores) => [...anteriores, orcamento]);
  }

  function atualizarStatusOrcamento(id: string, status: string) {
    setListaOrcamentos((anteriores) =>
      anteriores.map((orc) =>
        orc.id === id ? { ...orc, status } : orc
      )
    );
  }

  return (
    <OrcamentoContext.Provider
      value={{
        listaOrcamentos,
        adicionarOrcamento,
        atualizarStatusOrcamento,
      }}
    >
      {children}
    </OrcamentoContext.Provider>
  );
}

export function useOrcamentos() {
  const ctx = useContext(OrcamentoContext);
  if (!ctx) {
    throw new Error(
      "useOrcamentos deve ser usado dentro de OrcamentoProvider"
    );
  }
  return ctx;
}
