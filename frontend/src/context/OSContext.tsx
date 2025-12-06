import {
  createContext,
  useContext,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { OrdemServico } from "../types/ordemServico";
import type { StatusOS } from "../types/ordemServico";

interface OSContextType {
  listaOS: OrdemServico[];
  adicionarOS: (novaOS: OrdemServico) => void;
  atualizarStatusOS: (id: string, status: StatusOS) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

interface OSProviderProps {
  children: ReactNode;
}

export function OSProvider({ children }: OSProviderProps) {
  const [listaOS, setListaOS] = useState<OrdemServico[]>([]);

  function adicionarOS(novaOS: OrdemServico) {
    setListaOS((anterior) => [...anterior, novaOS]);
  }

  function atualizarStatusOS(id: string, status: StatusOS) {
    setListaOS((anterior) =>
      anterior.map((os) =>
        os.id === id ? { ...os, status } : os
      )
    );
  }

  return (
    <OSContext.Provider
      value={{ listaOS, adicionarOS, atualizarStatusOS }}
    >
      {children}
    </OSContext.Provider>
  );
}

/**
 * Hook de conveniência para consumir o contexto de OS.
 * Garante que só seja usado dentro do OSProvider.
 */
export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error(
      "useOS deve ser usado dentro de um OSProvider"
    );
  }
  return context;
}