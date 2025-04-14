import { type ElementType, type ReactNode, forwardRef, useCallback, type MouseEvent } from 'react';

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
        onClick?.(e);

        if (!preventClose) {
          close();
        }
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
          'uizz:flex uizz:w-full uizz:cursor-pointer uizz:items-center uizz:gap-2 uizz:rounded-md uizz:border-none uizz:bg-transparent uizz:px-4 uizz:py-2 uizz:text-inherit uizz:transition uizz:hover:bg-content-title/[0.03] uizz:disabled:cursor-not-allowed uizz:disabled:opacity-25 uizz:dark:hover:bg-content-title/[0.08] uizz:[&>.anticon]:text-[20px] uizz:[&>svg]:mr-[5px] uizz:[&>svg]:w-6'
        )}
        disabled={disabled}
      >
        {icon}
        <span className='uizz:max-w-[235px] uizz:overflow-hidden uizz:text-ellipsis uizz:whitespace-nowrap uizz:text-base'>
          {children}
        </span>
      </button>
    );

    if (Tag) {
      content = (
        <Tag id={id} {...rest} className='uizz:text-inherit uizz:hover:text-inherit'>
          {content}
        </Tag>
      );
    }

    return <>{content}</>;
  }
);

export default UserMenuItem;
