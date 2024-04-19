import { HTMLAttributes, ReactNode, MouseEventHandler, useEffect } from 'react';

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
        'uizz-layout-invisible uizz-layout-fixed uizz-layout-inset-0 uizz-layout-z-[106] uizz-layout-h-screen uizz-layout-w-screen uizz-layout-bg-content-negative/[0.32] uizz-layout-opacity-0 uizz-layout-backdrop-blur uizz-layout-transition',
        {
          '!uizz-layout-visible uizz-layout-opacity-100': visible,
          '!uizz-layout-z-[104]': underTopbar
        }
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Overlay;
