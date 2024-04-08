import { useCallback, useEffect, useState } from 'react';

import { getLocalStorageInstance } from '../utils/localStorage';

export type PossibleModes = 'dark' | 'light';

export default function useMode(
  mode?: PossibleModes,
  acceptModeBySearchParam?: boolean,
  onModeChange?: (newMode: PossibleModes) => void
) {
  const localStorageInstance = getLocalStorageInstance();

  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>(() => {
    const getSearchParamsMode = (searchParamsAllowed?: boolean) => {
      if (!searchParamsAllowed) {
        return undefined;
      }

      const currentUrl = new URL(window.location.href);
      const searchParamsMode = currentUrl.searchParams.get('eduzzLayoutMode') as PossibleModes | undefined;
      return searchParamsMode;
    };

    const searchParamsMode = getSearchParamsMode(acceptModeBySearchParam);

    if (searchParamsMode) {
      return searchParamsMode;
    }

    const storagedMode = localStorageInstance?.getItem('eduzz-ui-mode') as PossibleModes | undefined;

    if (!storagedMode) {
      return mode || 'light';
    }

    return storagedMode;
  });

  const toggleMode = useCallback(() => {
    setCurrentMode(current => {
      return current === 'dark' ? 'light' : 'dark';
    });

    return () => setCurrentMode(mode || 'light');
  }, []);

  const applyModeChange = useCallback((desiredTheme: PossibleModes) => {
    if (!document?.body) {
      return;
    }

    document.body.setAttribute('data-eduzz-theme', desiredTheme);
    localStorageInstance?.setItem('eduzz-ui-mode', desiredTheme);
  }, []);

  useEffect(() => {
    applyModeChange(currentMode);

    if (onModeChange) {
      onModeChange(currentMode);
    }
  }, [currentMode]);

  return [currentMode, toggleMode] as const;
}
