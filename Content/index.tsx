import { type ReactNode } from 'react';

import { cn } from '../utils/cn';

export interface LayoutContentProps {
  children?: ReactNode;
  disablePadding?: boolean;
}

const LayoutContent = ({ children, disablePadding }: LayoutContentProps) => {
  return (
    <div
      className={cn(
        'eduzz-ui-layout-content uizz:box-border uizz:min-w-0 uizz:flex-1 uizz:bg-surface-subtle uizz:transition',
        {
          'uizz:p-4 uizz:md:p-8': !disablePadding
        }
      )}
    >
      {children}
    </div>
  );
};

export default LayoutContent;
