import { type ReactNode, forwardRef, useMemo, memo } from 'react';

import SidebarGroupContext, { type SidebarGroupContextType } from './context';
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
        <li id={id} className={cn(className, 'uizz:block uizz:select-none uizz:overflow-hidden')} ref={ref}>
          {!!label && (
            <div
              className='uizz:relative uizz:box-border uizz:grid uizz:min-h-[2.2rem] uizz:cursor-pointer uizz:grid-cols-[1.625rem_1fr] uizz:items-center uizz:gap-2 uizz:rounded-br-[50px] uizz:rounded-tr-[50px] uizz:px-4 uizz:py-2 uizz:leading-[1.15] uizz:outline-hidden uizz:transition-all uizz:hover:bg-content-title/[0.03] uizz:active:bg-content-title/[0.03] uizz:dark:hover:bg-content-title/[0.08] uizz:dark:active:bg-content-title/[0.03]'
              onClick={toogleExpanded}
              tabIndex={tabIndex ?? 1}
            >
              <div
                className={cn(
                  'uizz:absolute uizz:left-0 uizz:top-2/4 uizz:-mt-0.5 uizz:h-0.5 uizz:w-[30px] uizz:bg-content-title/[0.65] uizz:opacity-30 uizz:transition-[left,background-color]',
                  {
                    'uizz:top-[calc(50%-1px)]! uizz:mt-[-0.5px]! uizz:h-px! uizz:bg-content-title/[0.45]! uizz:opacity-30!':
                      isExpanded
                  }
                )}
              />

              <div className='uizz:col-2 uizz:min-w-0 uizz:truncate'>
                <span className='uizz:overflow-hidden uizz:text-ellipsis uizz:whitespace-nowrap uizz:break-all uizz:text-sm uizz:uppercase uizz:tracking-[0.03em] uizz:text-content-title/[0.65]'>
                  {label}
                </span>
              </div>
            </div>
          )}

          <ul className='uizz:m-0 uizz:block uizz:p-0'>
            <CollapseEffect visibled={isExpanded}>
              <div className='uizz:pb-[0.7rem] uizz:[&_li]:mb-0'>{children}</div>
            </CollapseEffect>
          </ul>
        </li>
      </SidebarGroupContext.Provider>
    );
  }
);

export default memo(SidebarGroup);
