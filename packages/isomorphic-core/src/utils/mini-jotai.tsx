import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useReducer,
  useEffect,
} from 'react';

// Tipe Atom
export type Atom<T> = {
  key: string;
  default: T;
};

// Store context
const AtomStoreContext = createContext<Map<string, any> | null>(null);

// Buat atom baru
export function atom<T>(key: string, defaultValue: T): Atom<T> {
  return { key, default: defaultValue };
}

// Provider context
export function AtomProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => new Map<string, any>());
  return (
    <AtomStoreContext.Provider value={store}>
      {children}
    </AtomStoreContext.Provider>
  );
}

// Alias Provider
export const Provider = AtomProvider;

// useAtom = [value, setValue]
export function useAtom<T>(
  atom: Atom<T>
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const store = useContext(AtomStoreContext);
  if (!store) throw new Error('useAtom must be used inside <Provider>');

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!store.has(atom.key)) {
      store.set(atom.key, atom.default);
    }
  }, [atom.key, atom.default, store]);

  const value = store.get(atom.key) as T;

  const setValue = useCallback(
    (newVal: React.SetStateAction<T>) => {
      const currentVal = store.get(atom.key) as T;
      const nextVal =
        typeof newVal === 'function'
          ? (newVal as (prev: T) => T)(currentVal)
          : newVal;
      if (nextVal !== currentVal) {
        store.set(atom.key, nextVal);
        forceUpdate();
      }
    },
    [atom.key, store]
  );

  return [value, setValue];
}

// ✅ useAtomValue: hanya baca nilai atom
export function useAtomValue<T>(atom: Atom<T>): T {
  const [value] = useAtom(atom);
  return value;
}

// ✅ useSetAtom: hanya setter atom
export function useSetAtom<T>(
  atom: Atom<T>
): React.Dispatch<React.SetStateAction<T>> {
  const [, setValue] = useAtom(atom);
  return setValue;
}
