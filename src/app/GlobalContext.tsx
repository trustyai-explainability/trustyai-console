import React from 'react';
import { noop } from '@app/utils';

type GlobalContextProps = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

const GlobalContext = React.createContext<GlobalContextProps>({
  theme: 'auto',
  setTheme: noop,
});

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = React.useState('auto');

  return <GlobalContext.Provider value={{ theme, setTheme }}>{children}</GlobalContext.Provider>;
};
