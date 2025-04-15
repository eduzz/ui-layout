import { type ReactNode, type ElementType, forwardRef, useEffect, createElement, memo } from 'react';

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
          'uizz:group/menu uizz:mr-[5px] uizz:block uizz:w-full uizz:select-none uizz:rounded-br-[50px] uizz:rounded-tr-[50px] uizz:text-content-title! uizz:outline-hidden uizz:outline-0 uizz:hover:bg-content-title/[0.03] uizz:dark:hover:bg-content-title/[0.08] uizz:hover:text-inherit uizz:hover:outline-hidden uizz:focus-visible:bg-content-title/[0.03] uizz:dark:focus-visible:bg-content-title/[0.03] uizz:focus-visible:shadow-[0_0_0_2px_#039be5_inset]',
          {
            '--active': active,
            '--disabled': disabled
          }
        )
      },
      <li className='uizz:box-border uizz:grid uizz:cursor-pointer uizz:grid-cols-[1.625rem_1fr] uizz:items-center uizz:gap-2 uizz:whitespace-nowrap uizz:px-4 uizz:py-1 uizz:leading-[1.2] uizz:no-underline uizz:transition-[left,background-color] uizz:xl:py-[0.07rem]'>
        <IconBullet
          className='uizz:text-(color:--eduzz-theme-secondary) uizz:opacity-0 uizz:group-[.--active]/uizz-layout-menu:bg-secondary uizz:group-[.--active]/menu:opacity-100'
          size='md'
        />

        <div className='uizz:flex uizz:items-center uizz:justify-between'>
          <span className='uizz:col-2 uizz:min-w-0 uizz:overflow-hidden uizz:text-ellipsis uizz:text-base uizz:transition-[font-weight] uizz:group-[.--active]/menu:font-bold'>
            {children}
          </span>
          {isExternal && <IconExternalLink className='uizz:fill-content-title/[0.88] uizz:opacity-50' size={20} />}
        </div>
      </li>
    );
  }
);

export default memo(SidebarItem);
