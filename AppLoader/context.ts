import { createContext, useContext } from 'react';

export type AppLoaderContextValue = {
  show(): void;
  error(error: any, tryAgain: () => void): void;
  hide(): void;
};

export const AppLoaderContext = createContext<AppLoaderContextValue>({
  show: () => null,
  error: () => null,
  hide: () => null
});

export function useAppLoader() {
  return useContext(AppLoaderContext);
}

export default AppLoaderContext;
