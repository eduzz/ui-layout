import { useEffect, useState } from 'react';

interface ScriptState {
  state: 'idle' | 'loading' | 'ready' | 'error';
}

const useExternalScript = (url: string | null): ScriptState['state'] => {
  const [state, setState] = useState<ScriptState['state']>(url ? 'loading' : 'idle');

  useEffect(() => {
    if (!url) {
      setState('idle');
      return;
    }

    let script = document.querySelector(`script[src="${url}"]`) as HTMLScriptElement;

    const handleScript = (e: Event): void => {
      setState(e.type === 'load' ? 'ready' : 'error');
    };

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/javascript';
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
    }

    script.addEventListener('load', handleScript);
    script.addEventListener('error', handleScript);

    return () => {
      script.removeEventListener('load', handleScript);
      script.removeEventListener('error', handleScript);
    };
  }, [url]);

  return state;
};

export default useExternalScript;
