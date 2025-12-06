import {
  createContext,
  useContext,
} from "react";
import type { ReactNode } from "react";
import type { Orcamento, StatusOrcamento } from "../types/orcamento";
import { usePersistentState } from "../hooks/usePersistentState";

interface OrcamentoContextType {
  listaOrcamentos: Orcamento[];
  adicionarOrcamento: (novo: Orcamento) => void;
  atualizarStatusOrcamento: (id: string, status: StatusOrcamento) => void;
}

const OrcamentoContext = createContext<OrcamentoContextType | undefined>(
  undefined
);

interface OrcamentoProviderProps {
  children: ReactNode;
}

export function OrcamentoProvider({ children }: OrcamentoProviderProps) {
  const [listaOrcamentos, setListaOrcamentos] = usePersistentState<Orcamento[]>(
    "orcamentos-lista",
    []
  );

  function adicionarOrcamento(novo: Orcamento) {
    setListaOrcamentos((anterior) => [...anterior, novo]);
  }

  function atualizarStatusOrcamento(id: string, status: StatusOrcamento) {
    setListaOrcamentos((anterior) =>
      anterior.map((orcamento) =>
        orcamento.id === id ? { ...orcamento, status } : orcamento
      )
    );
  }

  return (
    <OrcamentoContext.Provider
      value={{ listaOrcamentos, adicionarOrcamento, atualizarStatusOrcamento }}
    >
      {children}
    </OrcamentoContext.Provider>
  );
}

export function useOrcamentos() {
  const context = useContext(OrcamentoContext);
  if (!context) {
    throw new Error(
      "useOrcamentos deve ser usado dentro de um OrcamentoProvider"
    );
  }
  return context;
}
