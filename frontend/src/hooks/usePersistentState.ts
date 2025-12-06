import { useEffect, useState } from "react";

/**
 * Hook genérico para sincronizar um estado React com o localStorage.
 * - key: chave usada no localStorage
 * - initialValue: valor inicial caso não exista nada salvo
 */
export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return initialValue;
      return JSON.parse(stored) as T;
    } catch (error) {
      console.warn(
        `[usePersistentState] Falha ao ler chave "${key}" do localStorage:`,
        error
      );
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(
        `[usePersistentState] Falha ao salvar chave "${key}" no localStorage:`,
        error
      );
    }
  }, [key, value]);

  return [value, setValue] as const;
}
