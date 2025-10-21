import React, { createContext, useContext, useState, useCallback, useReducer, useEffect } from 'react';

// Type untuk atom
export type Atom<T> = {
  key: string;
  default: T;
};

// Store context
const AtomStoreContext = createContext<Map<string, any> | null>(null);

// Fungsi buat bikin atom
export function atom<T>(key: string, defaultValue: T): Atom<T> {
  return { key, default: defaultValue };
}

// Provider, export dengan nama Provider supaya import sesuai
export function AtomProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => new Map<string, any>());
  return (
    <AtomStoreContext.Provider value={store}>
      {children}
    </AtomStoreContext.Provider>
  );
}

// export dengan alias 'Provider' supaya bisa import { Provider } from ...
export const Provider = AtomProvider;

// useAtom hook
export function useAtom<T>(atom: Atom<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const store = useContext(AtomStoreContext);
  if (!store) throw new Error('useAtom must be used inside <Provider>');

  // Force update untuk re-render saat atom berubah
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // Inisialisasi nilai atom sekali saja
  useEffect(() => {
    if (!store.has(atom.key)) {
      store.set(atom.key, atom.default);
    }
  }, [atom.key, atom.default, store]);

  const value = store.get(atom.key) as T;

  const setValue = useCallback(
    (newVal: React.SetStateAction<T>) => {
      const currentVal = store.get(atom.key) as T;
      const nextVal = typeof newVal === 'function' ? (newVal as (prev: T) => T)(currentVal) : newVal;
      if (nextVal !== currentVal) {
        store.set(atom.key, nextVal);
        forceUpdate(); // re-render component yang pakai useAtom ini
      }
    },
    [atom.key, store]
  );

  return [value, setValue];
}
