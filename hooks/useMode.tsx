import { useCallback, useEffect, useState } from 'react';

import { getLocalStorageInstance } from '../utils/localStorage';

export default function useMode(mode?: 'dark' | 'light', onModeChange?: (newMode: 'light' | 'dark') => void) {
  const localStorageInstance = getLocalStorageInstance();

  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>(() => {
    const storagedMode = localStorageInstance?.getItem('eduzz-ui-mode') as 'dark' | 'light' | undefined;

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

  const applyModeChange = useCallback((desiredTheme: 'light' | 'dark') => {
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
