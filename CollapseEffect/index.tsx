import { ReactNode } from 'react';

import { cn } from '../utils/cn';

export interface CollapseProps {
  id?: string;
  visibled: boolean;
  children?: ReactNode;
}

const CollapseEffect = ({ children, visibled, id }: CollapseProps) => {
  return (
    <div id={id} className={cn('uizz-layout-h-0 uizz-layout-overflow-hidden', { '!uizz-layout-h-auto': visibled })}>
      {children}
    </div>
  );
};

export default CollapseEffect;
