'use client';

// import hideRechartsConsoleError from '@core/utils/recharts-console-error';
import { ThemeProvider as NextThemeProvider } from '@/utils/@core/utils/next-themes';
export { useTheme } from '@core/utils/next-themes';

// hideRechartsConsoleError();

export function ThemeProvider({
  children,
  defaultTheme,
}: React.PropsWithChildren<{
  defaultTheme: string;
}>) {
  return (
    <NextThemeProvider enableSystem={false} defaultTheme={defaultTheme}>
      {children}
    </NextThemeProvider>
  );
}
