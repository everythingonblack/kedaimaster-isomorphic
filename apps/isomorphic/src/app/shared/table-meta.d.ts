import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends Record<string, any>> {
    handleDeleteRow: (row: TData) => void;
  }
}


declare module '@tanstack/react-table' {
  interface TableMeta<TData extends Record<string, any>> {
    handleMultipleDelete: (row: TData[]) => void;
  }
}