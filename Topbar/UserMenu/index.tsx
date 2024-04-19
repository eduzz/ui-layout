import { useEffect } from 'react';

import { useContextSelector } from 'use-context-selector';

import LayoutContext from '../../context';
import Portal from '../../Portal';
import { cn } from '../../utils/cn';
import './style.css';

export type UserMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const UserMenu = ({ children, className, ...rest }: UserMenuProps) => {
  const opened = useContextSelector(LayoutContext, context => context.userMenu.opened);
  const register = useContextSelector(LayoutContext, context => context.userMenu.register);
  const container = useContextSelector(LayoutContext, context => context.userMenu.containerPortal);

  useEffect(() => {
    const unregister = register();
    return () => unregister();
  }, [register]);

  if (!container) return null;

  return (
    <Portal target={container}>
      <div {...rest} className={cn(className, 'eduzz-ui-layout-topbar-user-menu', opened && '--opened')}>
        {children}
      </div>
    </Portal>
  );
};

export default UserMenu;
