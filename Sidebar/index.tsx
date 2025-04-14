import { type ReactNode, useEffect, useMemo } from 'react';

import { useContextSelector } from 'use-context-selector';

import SidebarContext, { type SidebarContextType } from './context';
import Group from './Group';
import GroupWithGroupSwitcher from './GroupWithGroupSwitcher';
import Item from './Item';
import LayoutContext from '../context';
import Overlay from '../Overlay';
import { cn } from '../utils/cn';
import nestedComponent from '../utils/nestedComponent';

export interface SidebarProps {
  /**
   * Current location path, if you are using `react-router-dom` use `useLocation`
   */
  currentLocation: string;
  children: ReactNode;
}

const Sidebar = ({ currentLocation, children }: SidebarProps) => {
  const hasTopbar = useContextSelector(LayoutContext, context => context.topbar.exists);
  const register = useContextSelector(LayoutContext, context => context.sidebar.register);
  const opened = useContextSelector(LayoutContext, context => context.sidebar.opened);
  const toggleMenu = useContextSelector(LayoutContext, context => context.sidebar.toogleOpened);
  const falseOpened = useContextSelector(LayoutContext, context => context.sidebar.falseOpened);

  useEffect(() => {
    const unregister = register();
    return () => unregister();
  }, [register]);

  const contextValue = useMemo<SidebarContextType>(
    () => ({
      isActiveItem: (path?: string) => (!path ? false : path === currentLocation)
    }),
    [currentLocation]
  );

  useEffect(() => {
    falseOpened();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <div className='eduzz-ui-layout-sidebar uizz:relative uizz:box-border uizz:h-auto uizz:text-content-title uizz:xl:w-(--eduzz-ui-layout-sidebar-width-rem)'>
        <Overlay visible={opened} className='uizz:xl:hidden' onClick={toggleMenu} underTopbar />

        <aside
          className={cn(
            'uizz:fixed uizz:inset-y-0 uizz:left-[calc(var(--eduzz-ui-layout-sidebar-width-rem)*-1)] uizz:z-104 uizz:inline-flex uizz:w-(--eduzz-ui-layout-sidebar-width-rem) uizz:grow uizz:flex-col uizz:bg-surface-default uizz:shadow-[0px_4px_8px_rgb(0_0_0/0.16)] uizz:transition-[left,background-color] uizz:xl:left-0 uizz:xl:bg-surface-subtle uizz:xl:shadow-none',
            {
              'uizz:top-(--eduzz-ui-layout-topbar-height-rem)': hasTopbar,
              'uizz:left-0!': opened
            }
          )}
        >
          <nav className='uizz:overflow-y-auto uizz:overflow-x-hidden uizz:px-0 uizz:pb-10 uizz:pt-8 uizz:[&::-webkit-scrollbar-thumb]:rounded uizz:[&::-webkit-scrollbar-thumb]:bg-transparent uizz:[&::-webkit-scrollbar]:w-[3px] uizz:[&::-webkit-scrollbar]:bg-transparent uizz:[&:hover::-webkit-scrollbar-thumb]:bg-[#e0e0e0]'>
            <ul className='uizz:m-0 uizz:block uizz:p-0'>{children}</ul>
          </nav>
        </aside>
      </div>
    </SidebarContext.Provider>
  );
};

export default nestedComponent(Sidebar, {
  Item,
  Group,
  GroupWithGroupSwitcher
});
