'use client';

import { ThemeProvider } from '../components/ThemeContext';

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}