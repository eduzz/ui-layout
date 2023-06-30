import { HTMLAttributes, ReactNode, useState, useCallback, useMemo } from 'react';

import Content from '../Content';
import LayoutContext, { LayoutContextType } from '../context';
import useBoolean from '../hooks/useBoolean';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import cx from '../utils/cx';
import { hexToRgbVar } from '../utils/hextToRgb';
import nestedComponent from '../utils/nestedComponent';

export type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: ReactNode;

  primaryColor?: `#${string}`;
  secondaryColor?: `#${string}`;
};

const Layout = ({ className, children, primaryColor, secondaryColor, ...rest }: LayoutProps) => {
  const [hasTopbar, setHasTopbar] = useState(false);
  const [hasSidebar, setHasSidebar] = useState(false);
  const [hasUserMenu, setHasUserMenu] = useState(false);
  const [topbarCenterContainer, setTopbarCenterContainer] = useState<HTMLDivElement | null>(null);
  const [userMenuContainer, setUserMenuContainer] = useState<HTMLDivElement | null>(null);

  const [userMenuOpened, toogleUserMenuOpened, trueUserMenuOpened, falseUserMenuOpened] = useBoolean(false);
  const [sidebarOpened, toogleSidebarOpened, trueSidebarOpened, falseSidebarOpened] = useBoolean(false);

  const registerTopbar = useCallback(() => {
    setHasTopbar(true);
    return () => setHasTopbar(false);
  }, []);

  const registerSidebar = useCallback(() => {
    setHasSidebar(true);
    return () => setHasSidebar(false);
  }, []);

  const registerTopbarCenterContainer = useCallback((div: HTMLDivElement) => {
    setTopbarCenterContainer(div);
  }, []);

  const registerUserMenu = useCallback(() => {
    setHasUserMenu(true);
    return () => setHasUserMenu(false);
  }, []);

  const registerUserMenuContainer = useCallback((div: HTMLDivElement) => {
    setUserMenuContainer(div);
  }, []);

  const contextValue = useMemo<LayoutContextType>(
    () => ({
      topbar: {
        exists: hasTopbar,
        centerPortal: topbarCenterContainer,
        register: registerTopbar,
        registerCenterPortal: registerTopbarCenterContainer
      },
      sidebar: {
        exists: hasSidebar,
        opened: sidebarOpened,
        register: registerSidebar,
        toogleOpened: toogleSidebarOpened,
        trueOpened: trueSidebarOpened,
        falseOpened: falseSidebarOpened
      },
      userMenu: {
        opened: userMenuOpened,
        containerPortal: userMenuContainer,
        exists: hasUserMenu,
        register: registerUserMenu,
        registerContainerPortal: registerUserMenuContainer,
        toogleOpened: toogleUserMenuOpened,
        trueOpened: trueUserMenuOpened,
        falseOpened: falseUserMenuOpened
      }
    }),
    [
      falseSidebarOpened,
      falseUserMenuOpened,
      hasSidebar,
      hasTopbar,
      hasUserMenu,
      registerSidebar,
      registerTopbar,
      registerTopbarCenterContainer,
      registerUserMenu,
      registerUserMenuContainer,
      sidebarOpened,
      toogleSidebarOpened,
      toogleUserMenuOpened,
      topbarCenterContainer,
      trueSidebarOpened,
      trueUserMenuOpened,
      userMenuContainer,
      userMenuOpened
    ]
  );

  const cssVars = useMemo(
    () => `
      :root {
        --eduzz-theme-primary: ${primaryColor ?? '#0d2772'};
        --eduzz-theme-primary-rgb: ${hexToRgbVar(primaryColor) ?? '13, 38, 115'};
        --eduzz-theme-secondary: ${secondaryColor ?? '#ffbc00'};
        --eduzz-theme-secondary-rgb: ${hexToRgbVar(secondaryColor) ?? '255, 188, 0'};
      }
    `,
    [primaryColor, secondaryColor]
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      <style>{cssVars}</style>

      <div
        className={cx('eduzz-ui-tw-flex eduzz-ui-tw-min-h-screen eduzz-ui-tw-w-full', className, {
          'eduzz-ui-tw-pt-[var(--eduzz-ui-layout-topbar-height-rem)]': hasTopbar
        })}
        {...rest}
      >
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

export default nestedComponent(Layout, {
  Sidebar,
  Content,
  Topbar
});
