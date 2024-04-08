import {
  useCallback,
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  memo,
  useState,
  ChangeEvent
} from 'react';

import { useContextSelector } from 'use-context-selector';

import LayoutContext from '../../context';
import IconSearch from '../../Icons/Search';
import Portal from '../../Portal';
import cx from '../../utils/cx';

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
      onEnter &&
        onEnter(input.value, () => {
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
      <div className='uizz-layout-relative uizz-layout-box-border uizz-layout-hidden uizz-layout-h-10 uizz-layout-flex-1 uizz-layout-items-center uizz-layout-justify-between uizz-layout-gap-3 uizz-layout-px-2 uizz-layout-py-1 lg:uizz-layout-flex'>
        <IconSearch size={20} />
        <input
          ref={inputRef}
          className={cx(
            '[&:focus+div]:uizz-layout-outline-disabled uizz-layout-h-10 uizz-layout-flex-1 uizz-layout-border-none uizz-layout-bg-transparent uizz-layout-text-base uizz-layout-text-content-title focus-visible:uizz-layout-outline-none [&:focus+div]:uizz-layout-border-[var(--eduzz-theme-primary)] [&:hover+div]:uizz-layout-border-[var(--eduzz-theme-primary)]',
            {
              '[&+div]:!uizz-layout-border-red-500 [&:focus+div]:!uizz-layout-outline-red-200 [&:hover+div]:!uizz-layout-border-red-500':
                status === 'error',
              '[&+div]:!uizz-layout-border-yellow-500 [&:focus+div]:!uizz-layout-outline-yellow-200 [&:hover+div]:!uizz-layout-border-yellow-500':
                status === 'warning'
            }
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={disableShortcut ? undefined : onKeyDown}
        />
        <div className='uizz-layout-pointer-events-none uizz-layout-absolute uizz-layout-inset-0 uizz-layout-rounded uizz-layout-border uizz-layout-border-solid uizz-layout-border-neutral-300 uizz-layout-outline uizz-layout-outline-0 uizz-layout-outline-offset-0 uizz-layout-outline-[rgba(var(--eduzz-theme-primary-rgb),0.3)] uizz-layout-transition dark:uizz-layout-border-neutral-700' />
        {disableShortcut ? undefined : (
          <div className='uizz-layout-rounded uizz-layout-border uizz-layout-bg-gray-50 uizz-layout-px-2 uizz-layout-py-1 uizz-layout-text-xs dark:uizz-layout-bg-gray-950'>{`${
            isMacOS ? '⌘' : 'Ctrl'
          }+K`}</div>
        )}
      </div>
    </Portal>
  );
};

export default memo(TopbarSearch);
