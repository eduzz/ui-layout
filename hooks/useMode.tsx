import { useCallback, useEffect, useMemo, useState } from 'react';

import Cookies from 'universal-cookie';

export type PossibleModes = 'dark' | 'light';

type UseModeOptions = {
  mode?: PossibleModes;
  acceptModeBySearchParam?: boolean;
  persistMode?: boolean;
  onModeChange?: (newMode: PossibleModes) => void;
};

export default function useMode({ mode, acceptModeBySearchParam, persistMode, onModeChange }: UseModeOptions) {
  const cookies = useMemo(() => {
    const domain = window.location.hostname.split('.').slice(-2).join('.'); // console.eduzz.com => .eduzz.com
    return new Cookies(null, { domain });
  }, []);

  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>(() => {
    const getSearchParamsMode = (searchParamsAllowed?: boolean) => {
      if (!searchParamsAllowed) {
        return undefined;
      }

      const currentUrl = new URL(window.location.href);
      const searchParamsMode = currentUrl.searchParams.get('eduzzMode') as PossibleModes | undefined;
      return searchParamsMode;
    };

    const searchParamsMode = getSearchParamsMode(acceptModeBySearchParam);

    if (searchParamsMode) {
      return searchParamsMode;
    }

    const storageMode = cookies.get('eduzz-theme') as PossibleModes | undefined;

    if (!storageMode) {
      return mode || 'light';
    }

    return storageMode;
  });

  const toggleMode = useCallback(() => {
    setCurrentMode(current => {
      return current === 'dark' ? 'light' : 'dark';
    });

    return () => setCurrentMode(mode || 'light');
  }, [mode]);

  const applyModeChange = useCallback(
    (desiredTheme: PossibleModes) => {
      if (!document?.body) {
        return;
      }

      document.body.setAttribute('data-eduzz-theme', desiredTheme);

      if (persistMode) {
        cookies.set('eduzz-theme', desiredTheme);
      }
    },
    [persistMode, cookies]
  );

  useEffect(() => {
    applyModeChange(currentMode);

    if (onModeChange) {
      onModeChange(currentMode);
    }
  }, [applyModeChange, currentMode, onModeChange]);

  return [currentMode, toggleMode] as const;
}
