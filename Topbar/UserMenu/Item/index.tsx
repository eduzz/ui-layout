import { ElementType, ReactNode, forwardRef, useCallback, MouseEvent } from 'react';

import { useContextSelector } from 'use-context-selector';

import LayoutContext from '../../../context';
import { cn } from '../../../utils/cn';

export interface UserMenuItemProps {
  /**
   * Allow to provide more props to the `as` Component
   */
  [key: string]: any;
  /**
   * Component that wraps the item.
   * @example a, NavLink, Link (react-router-dom)
   */
  as?: ElementType;
  icon?: ReactNode;
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  preventClose?: boolean;
  id?: string;
  children: string;
  className?: string;
}

const UserMenuItem = forwardRef<HTMLButtonElement, UserMenuItemProps>(
  ({ id, icon, disabled, onClick, children, preventClose, className, as: Tag, ...rest }, ref) => {
    const close = useContextSelector(LayoutContext, context => context.userMenu.falseOpened);

    const handleClick = useCallback(
      (e: MouseEvent) => {
        onClick && onClick(e);
        !preventClose && close();
      },
      [close, onClick, preventClose]
    );

    let content = (
      <button
        id={id}
        ref={ref}
        onClick={handleClick}
        className={cn(
          className,
          'uizz-layout-flex uizz-layout-w-full uizz-layout-cursor-pointer uizz-layout-items-center uizz-layout-gap-2 uizz-layout-rounded-md uizz-layout-border-none uizz-layout-bg-transparent uizz-layout-px-4 uizz-layout-py-2 uizz-layout-text-inherit uizz-layout-transition hover:uizz-layout-bg-content-title/[0.03] disabled:uizz-layout-cursor-not-allowed disabled:uizz-layout-opacity-25 dark:hover:uizz-layout-bg-content-title/[0.08] [&>.anticon]:uizz-layout-text-[20px] [&>svg]:uizz-layout-mr-[5px] [&>svg]:uizz-layout-w-6'
        )}
        disabled={disabled}
      >
        {icon}
        <span className='uizz-layout-max-w-[235px] uizz-layout-overflow-hidden uizz-layout-text-ellipsis uizz-layout-whitespace-nowrap uizz-layout-text-base'>
          {children}
        </span>
      </button>
    );

    if (Tag) {
      content = (
        <Tag id={id} {...rest} className='uizz-layout-text-inherit hover:uizz-layout-text-inherit'>
          {content}
        </Tag>
      );
    }

    return <>{content}</>;
  }
);

export default UserMenuItem;
