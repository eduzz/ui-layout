import { forwardRef, memo, useEffect } from 'react';

import { useContext } from 'use-context-selector';

import Badge from '../../Badge';
import Tooltip from '../../Tooltip';
import { cn } from '../../utils/cn';
import TopbarActionsContext from '../Actions/context';

export type ActionProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * If `true`, the item will be highlighted.
   */
  active?: boolean;
  tooltip?: string;
  icon: React.ReactNode;
  right?: React.ReactNode;
  label?: React.ReactNode;
  badgeCount?: number;
  badgeDot?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const Action = forwardRef<HTMLDivElement, ActionProps>(
  ({ active, icon, right, label, onClick, tooltip, className, badgeCount, badgeDot, ...rest }, ref) => {
    const registerAction = useContext(TopbarActionsContext);

    useEffect(() => {
      const unregister = registerAction({ badgeCount: badgeCount ?? 0, badgeDot: badgeDot ?? false });
      return () => unregister();
    }, [badgeCount, badgeDot, registerAction]);

    return (
      <div
        className={cn('uizz:[&_.anticon]:align-text-bottom uizz:[&_.anticon]:text-[20px]', className)}
        onClick={onClick}
        {...rest}
        ref={ref}
      >
        <Tooltip title={tooltip}>
          <Badge count={badgeCount === 0 ? undefined : badgeCount} dot={badgeCount ? false : badgeDot}>
            <div
              className={cn(
                'uizz:mt-0.5 uizz:box-border uizz:flex uizz:h-10 uizz:min-w-[40px] uizz:cursor-pointer uizz:select-none uizz:items-center uizz:justify-center uizz:gap-2 uizz:rounded-[20px] uizz:px-2 uizz:py-0 uizz:text-center uizz:transition uizz:hover:bg-content-title/[0.03] uizz:dark:hover:bg-content-title/[0.08]',
                { 'uizz:bg-content-title/[0.03] uizz:dark:bg-content-title/[0.08]': active }
              )}
            >
              {icon}
              <span className='eduzz-ui-layout-topbar-action-button-text uizz:hidden uizz:max-w-[150px] uizz:overflow-hidden uizz:text-ellipsis uizz:whitespace-nowrap uizz:empty:hidden uizz:md:block'>
                {label}
              </span>
              {right}
            </div>
          </Badge>
        </Tooltip>
      </div>
    );
  }
);

export default memo(Action);
