import {
  createContext,
  useContext,
} from "react";
import type { ReactNode } from "react";
import type { Cliente } from "../types/cliente";
import { usePersistentState } from "../hooks/usePersistentState";

interface ClienteContextType {
  listaClientes: Cliente[];
  adicionarCliente: (novo: Cliente) => void;
}

const ClienteContext = createContext<ClienteContextType | undefined>(undefined);

interface ClienteProviderProps {
  children: ReactNode;
}

export function ClienteProvider({ children }: ClienteProviderProps) {
  const [listaClientes, setListaClientes] = usePersistentState<Cliente[]>(
    "clientes-lista",
    []
  );

  function adicionarCliente(novo: Cliente) {
    setListaClientes((anteriores) => [...anteriores, novo]);
  }

  return (
    <ClienteContext.Provider value={{ listaClientes, adicionarCliente }}>
      {children}
    </ClienteContext.Provider>
  );
}

export function useClientes() {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error("useClientes deve ser usado dentro de um ClienteProvider");
  }
  return context;
}
