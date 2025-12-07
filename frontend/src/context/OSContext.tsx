import {
  createContext,
  useContext,
} from "react";
import type { ReactNode } from "react";
import type { OrdemServico, StatusOS } from "../types/ordemServico";
import { usePersistentState } from "../hooks/usePersistentState";

interface OSContextType {
  listaOS: OrdemServico[];
  adicionarOS: (novaOS: OrdemServico) => void;
  atualizarStatusOS: (id: string, status: StatusOS) => void;
  atualizarOS: (id: string, dados: Partial<OrdemServico>) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

interface OSProviderProps {
  children: ReactNode;
}

export function OSProvider({ children }: OSProviderProps) {
  const [listaOS, setListaOS] = usePersistentState<OrdemServico[]>(
    "os-lista",
    []
  );

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

  function atualizarOS(id: string, dados: Partial<OrdemServico>) {
  setListaOS((anteriores) =>
    anteriores.map((os) =>
      os.id === id ? { ...os, ...dados } : os
    )
  );
}

  return (
    <OSContext.Provider
      value={{
        listaOS,
        adicionarOS,
        atualizarStatusOS,
        atualizarOS,
      }}
    >
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error("useOS deve ser usado dentro de um OSProvider");
  }
  return context;
}