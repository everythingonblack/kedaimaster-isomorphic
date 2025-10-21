'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Provider as JotaiRootProvider } from '@core/utils/mini-jotai';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Theme;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  resolvedTheme: 'light',
  setTheme: () => {},
});

// ThemeProvider untuk menggantikan NextThemeProvider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme: theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook untuk pakai theme
export function useTheme() {
  return useContext(ThemeContext);
}

// Jotai Provider tetap sama
export function JotaiProvider({ children }: { children: React.ReactNode }) {
  return <JotaiRootProvider>{children}</JotaiRootProvider>;
}
