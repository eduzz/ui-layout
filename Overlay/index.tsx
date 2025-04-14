import { type HTMLAttributes, type ReactNode, type MouseEventHandler, useEffect } from 'react';

import useScrollBlock from '../hooks/useScrollBlock';
import { cn } from '../utils/cn';

export type OverlayColor = 'light' | 'dark' | 'auto';

export type OverlayProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  visible: boolean;
  underTopbar?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const Overlay = ({ visible, children, underTopbar, className, ...rest }: OverlayProps) => {
  const { disableScroll, enableScroll } = useScrollBlock();

  useEffect(() => {
    if (visible) {
      disableScroll();
    }

    return () => {
      enableScroll();
    };
  }, [enableScroll, disableScroll, visible]);

  return (
    <div
      aria-hidden='true'
      tabIndex={-1}
      className={cn(
        className,
        'uizz:invisible uizz:fixed uizz:inset-0 uizz:z-106 uizz:h-screen uizz:w-screen uizz:bg-content-negative/[0.32] uizz:opacity-0 uizz:backdrop-blur uizz:transition',
        {
          'uizz:visible! uizz:opacity-100': visible,
          'uizz:z-104!': underTopbar
        }
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Overlay;
