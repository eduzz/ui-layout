import { type ReactNode } from 'react';

import { cn } from '../utils/cn';

export interface CollapseProps {
  id?: string;
  visibled: boolean;
  children?: ReactNode;
}

const CollapseEffect = ({ children, visibled, id }: CollapseProps) => {
  return (
    <div id={id} className={cn('uizz:h-0 uizz:overflow-hidden uizz:truncate w-full', { 'uizz:h-auto!': visibled })}>
      {children}
    </div>
  );
};

export default CollapseEffect;
