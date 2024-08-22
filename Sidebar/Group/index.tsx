import { ReactNode, forwardRef, useMemo, memo } from 'react';

import SidebarGroupContext, { SidebarGroupContextType } from './context';
import CollapseEffect from '../../CollapseEffect';
import useBoolean from '../../hooks/useBoolean';
import { cn } from '../../utils/cn';

export interface SidebarGroupProps {
  label?: ReactNode;
  children: ReactNode;
  tabIndex?: number;
  id?: string;
  className?: string;
}

const SidebarGroup = forwardRef<HTMLLIElement, SidebarGroupProps>(
  ({ id, children, label, tabIndex, className }, ref) => {
    const [isExpanded, toogleExpanded, trueExpanded] = useBoolean(true);

    const contextValue = useMemo<SidebarGroupContextType>(() => {
      return { onItemActive: trueExpanded };
    }, [trueExpanded]);

    return (
      <SidebarGroupContext.Provider value={contextValue}>
        <li
          id={id}
          className={cn(className, 'uizz-layout-block uizz-layout-select-none uizz-layout-overflow-hidden')}
          ref={ref}
        >
          {!!label && (
            <div
              className='uizz-layout-relative uizz-layout-box-border uizz-layout-grid uizz-layout-min-h-[2.2rem] uizz-layout-cursor-pointer uizz-layout-grid-cols-[1.625rem_1fr] uizz-layout-items-center uizz-layout-gap-2 uizz-layout-rounded-br-[50px] uizz-layout-rounded-tr-[50px] uizz-layout-px-4 uizz-layout-py-2 uizz-layout-leading-[1.15] uizz-layout-outline-none uizz-layout-transition-all hover:uizz-layout-bg-content-title/[0.03] active:uizz-layout-bg-content-title/[0.03] dark:hover:uizz-layout-bg-content-title/[0.08] dark:active:uizz-layout-bg-content-title/[0.03]'
              onClick={toogleExpanded}
              tabIndex={tabIndex ?? 1}
            >
              <div
                className={cn(
                  'uizz-layout-absolute uizz-layout-left-0 uizz-layout-top-2/4 uizz-layout--mt-0.5 uizz-layout-h-0.5 uizz-layout-w-[30px] uizz-layout-bg-content-title/[0.65] uizz-layout-opacity-30 uizz-layout-transition-[left,_background-color]',
                  {
                    '!uizz-layout-top-[calc(50%_-_1px)] !uizz-layout-mt-[-0.5px] !uizz-layout-h-px !uizz-layout-bg-content-title/[0.45] !uizz-layout-opacity-30':
                      isExpanded
                  }
                )}
              />

              <div className='uizz-layout-col-[2] uizz-layout-min-w-0 uizz-layout-truncate'>
                <span className='uizz-layout-overflow-hidden uizz-layout-text-ellipsis uizz-layout-whitespace-nowrap uizz-layout-break-all uizz-layout-text-sm uizz-layout-uppercase uizz-layout-tracking-[0.03em] uizz-layout-text-content-title/[0.65]'>
                  {label}
                </span>
              </div>
            </div>
          )}

          <ul className='uizz-layout-m-0  uizz-layout-block uizz-layout-p-0'>
            <CollapseEffect visibled={isExpanded}>
              <div className=' uizz-layout-pb-[0.7rem] [&_li]:uizz-layout-mb-0'>{children}</div>
            </CollapseEffect>
          </ul>
        </li>
      </SidebarGroupContext.Provider>
    );
  }
);

export default memo(SidebarGroup);
