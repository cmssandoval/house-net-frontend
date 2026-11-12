import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme } from '@/contexts/ThemeContext.ts';

const THEME_STORAGE_KEY = 'house-net-theme';

const getInitialTheme = (): Theme => {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  const theme = storedTheme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  return theme;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
