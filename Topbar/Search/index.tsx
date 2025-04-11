import {
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  memo,
  useState,
  type ChangeEvent
} from 'react';

import { useContextSelector } from 'use-context-selector';

import LayoutContext from '../../context';
import IconSearch from '../../Icons/Search';
import Portal from '../../Portal';
import { cn } from '../../utils/cn';

export interface TopbarSearchProps {
  status?: '' | 'warning' | 'error';
  placeholder?: string;
  disableEscape?: boolean;
  disableShortcut?: boolean;
  onEnter?: (value: string, clear: () => void) => void;
}

const isMacOS = typeof window !== 'undefined' ? navigator.userAgent.toLowerCase().includes('mac os') : false;

const TopbarSearch = ({
  disableShortcut,
  disableEscape,
  onEnter,
  status,
  placeholder = 'Pesquisar'
}: TopbarSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>();
  const container = useContextSelector(LayoutContext, context => context.topbar.centerPortal);

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLInputElement>) => {
      const input = event.currentTarget;

      if (!disableEscape && event.key === 'Escape') {
        setValue('');
        input.blur();
        return;
      }

      if (event.key !== 'Enter') return;

      onEnter?.(input.value, () => {
        setValue('');
        input.blur();
      });
    },
    [disableEscape, onEnter]
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.target !== document.body || !inputRef.current) return;

      const metaKey = isMacOS ? e.metaKey : e.ctrlKey;
      if (e.key.toLowerCase() !== 'k' || !metaKey) return;

      e.preventDefault();
      e.stopPropagation();

      inputRef.current.focus();
    };

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  if (!container) return null;

  return (
    <Portal target={container}>
      <div className='uizz:relative uizz:box-border uizz:hidden uizz:h-10 uizz:flex-1 uizz:items-center uizz:justify-between uizz:gap-3 uizz:px-2 uizz:py-1 uizz:lg:flex'>
        <IconSearch size={20} />
        <input
          ref={inputRef}
          className={cn(
            'uizz:[&:focus+div]:outline-disabled uizz:h-10 uizz:flex-1 uizz:border-none uizz:bg-transparent uizz:text-base uizz:text-content-title uizz:focus-visible:outline-hidden uizz:[&:focus+div]:border-(--eduzz-theme-primary) uizz:[&:hover+div]:border-(--eduzz-theme-primary)',
            {
              'uizz:[&+div]:border-red-500! uizz:[&:focus+div]:outline-red-200! uizz:[&:hover+div]:border-red-500!':
                status === 'error',
              'uizz:[&+div]:border-yellow-500! uizz:[&:focus+div]:outline-yellow-200! uizz:[&:hover+div]:border-yellow-500!':
                status === 'warning'
            }
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={disableShortcut ? undefined : onKeyDown}
        />
        <div className='uizz:pointer-events-none uizz:absolute uizz:inset-0 uizz:rounded uizz:border uizz:border-solid uizz:border-neutral-300 uizz:outline uizz:outline-0 uizz:outline-offset-0 uizz:outline-[rgba(var(--eduzz-theme-primary-rgb),0.3)] uizz:transition uizz:dark:border-neutral-700' />
        {disableShortcut ? undefined : (
          <div className='uizz:rounded uizz:border uizz:bg-gray-50 uizz:px-2 uizz:py-1 uizz:text-xs uizz:dark:bg-gray-950'>{`${
            isMacOS ? '⌘' : 'Ctrl'
          }+K`}</div>
        )}
      </div>
    </Portal>
  );
};

export default memo(TopbarSearch);
