import { useEffect } from 'react';

import { cx } from '@emotion/css';
import { useContextSelector } from 'use-context-selector';

import LayoutContext from '../../context';
import Portal from '../../Portal';

export type UserMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const UserMenu = ({ children, ...rest }: UserMenuProps) => {
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
      <div className={cx('ui-eduzz-layout-topbar-user-menu', opened && '--opened')} {...rest}>
        {children}
      </div>
    </Portal>
  );
};

export default UserMenu;
