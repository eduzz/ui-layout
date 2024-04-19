import { ReactNode, ElementType, forwardRef, useEffect, createElement, memo } from 'react';

import { useContextSelector } from 'use-context-selector';

import IconBullet from '../../Icons/Bullet';
import IconExternalLink from '../../Icons/ExternalLink';
import { cn } from '../../utils/cn';
import SidebarContext from '../context';
import SidebarGroupContext from '../Group/context';

export interface SidebarItemProps {
  [key: string]: any;
  id?: string;
  tabIndex?: number;
  isActive?: boolean;
  isExternal?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  /**
   * Component that wraps the item.
   * @example NavLink, Link (react-router-dom)
   */
  as?: ElementType;
}

const SidebarItem = forwardRef<HTMLElement, SidebarItemProps>(
  (
    { children, isActive: isActiveProp, tabIndex, className, as: Component, disabled, to, isExternal, ...rest },
    ref
  ) => {
    isExternal = isExternal ?? rest?.target === '_blank';
    const isActiveItem = useContextSelector(SidebarContext, context => context.isActiveItem);
    const onItemActive = useContextSelector(SidebarGroupContext, context => context.onItemActive);

    const active = isActiveProp ?? isActiveItem(to);

    useEffect(() => {
      if (!active) return;
      onItemActive();
    }, [active, onItemActive]);

    return createElement(
      Component ?? 'a',
      {
        ...rest,
        ref,
        to,
        tabIndex: tabIndex ?? 1,
        className: cn(
          className,
          'uizz-layout-group/menu uizz-layout-mr-[5px] uizz-layout-block uizz-layout-w-full uizz-layout-select-none uizz-layout-rounded-br-[50px] uizz-layout-rounded-tr-[50px] uizz-layout-text-inherit uizz-layout-outline-none uizz-layout-outline-0 hover:uizz-layout-bg-content-title/[0.03] dark:hover:uizz-layout-bg-content-title/[0.08] hover:uizz-layout-text-inherit hover:uizz-layout-outline-none focus-visible:uizz-layout-bg-content-title/[0.03] dark:focus-visible:uizz-layout-bg-content-title/[0.03] focus-visible:uizz-layout-shadow-[0_0_0_2px_#039be5_inset]',
          {
            '--active': active,
            '--disabled': disabled
          }
        )
      },
      <li className='uizz-layout-box-border uizz-layout-grid uizz-layout-cursor-pointer uizz-layout-grid-cols-[1.625rem_1fr] uizz-layout-items-center uizz-layout-gap-2 uizz-layout-whitespace-nowrap uizz-layout-px-4 uizz-layout-py-1 uizz-layout-leading-[1.2] uizz-layout-no-underline uizz-layout-transition-[left,_background-color] xl:uizz-layout-py-[0.07rem]'>
        <IconBullet
          className='uizz-layout-text-[color:var(--eduzz-theme-secondary)] uizz-layout-opacity-0 group-[.--active]/uizz-layout-menu:uizz-layout-bg-secondary group-[.--active]/menu:uizz-layout-opacity-100'
          size='md'
        />

        <div className='uizz-layout-flex uizz-layout-items-center uizz-layout-justify-between'>
          <span className='uizz-layout-col-[2] uizz-layout-min-w-0 uizz-layout-overflow-hidden uizz-layout-text-ellipsis uizz-layout-text-base uizz-layout-transition-[font-weight] group-[.--active]/menu:uizz-layout-font-bold'>
            {children}
          </span>
          {isExternal && (
            <IconExternalLink className='uizz-layout-fill-content-title/[0.88] uizz-layout-opacity-50' size={20} />
          )}
        </div>
      </li>
    );
  }
);

export default memo(SidebarItem);
