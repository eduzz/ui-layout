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
        className={cn('[&_.anticon]:uizz-layout-align-text-bottom [&_.anticon]:uizz-layout-text-[20px]', className)}
        onClick={onClick}
        {...rest}
        ref={ref}
      >
        <Tooltip title={tooltip}>
          <Badge count={badgeCount === 0 ? undefined : badgeCount} dot={badgeCount ? false : badgeDot}>
            <div
              className={cn(
                'uizz-layout-mt-0.5 uizz-layout-box-border uizz-layout-flex uizz-layout-h-10 uizz-layout-min-w-[40px] uizz-layout-cursor-pointer uizz-layout-select-none uizz-layout-items-center uizz-layout-justify-center uizz-layout-gap-2 uizz-layout-rounded-[20px] uizz-layout-px-2 uizz-layout-py-0 uizz-layout-text-center uizz-layout-transition hover:uizz-layout-bg-content-title/[0.03] dark:hover:uizz-layout-bg-content-title/[0.08]',
                { 'uizz-layout-bg-content-title/[0.03] dark:uizz-layout-bg-content-title/[0.08]': active }
              )}
            >
              {icon}
              <span className='eduzz-ui-layout-topbar-action-button-text uizz-layout-hidden uizz-layout-max-w-[150px] uizz-layout-overflow-hidden uizz-layout-text-ellipsis uizz-layout-whitespace-nowrap empty:uizz-layout-hidden md:uizz-layout-block'>
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
