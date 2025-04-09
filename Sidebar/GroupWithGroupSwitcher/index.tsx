import { ReactNode, forwardRef, memo, useState } from 'react';

import { CaretDownFilled } from '@ant-design/icons';

import CollapseEffect from '../../CollapseEffect';
import useBoolean from '../../hooks/useBoolean';
import { cn } from '../../utils/cn';

export type SidebarGroupWithGroupSwitcherOption = {
  id: string;
  label: string;
  icon?: ReactNode;
  items: ReactNode[];
};

export interface SidebarGroupWithGroupSwitcherProps {
  label?: ReactNode;
  options: SidebarGroupWithGroupSwitcherOption[];
  id?: string;
  className?: string;
}

const SidebarGroupWithGroupSwitcher = forwardRef<HTMLLIElement, SidebarGroupWithGroupSwitcherProps>(
  ({ id, label, className, options }, ref) => {
    const [selectedOption, setSelectedOption] = useState<SidebarGroupWithGroupSwitcherOption>(options[0]);
    const [optionsVisible, setOptionsVisible] = useBoolean(false);

    return (
      <li id={id} className={cn(className, 'uizz-layout-block uizz-layout-select-none')} ref={ref}>
        <div>
          <div
            className={cn(
              'uizz-layout-relative uizz-layout-box-border uizz-layout-grid uizz-layout-min-h-[2.2rem] uizz-layout-cursor-pointer uizz-layout-grid-cols-[1.625rem_1fr] uizz-layout-items-center uizz-layout-gap-2 uizz-layout-rounded-br-[50px] uizz-layout-rounded-tr-[50px] uizz-layout-px-4 uizz-layout-py-2 uizz-layout-leading-[1.15] uizz-layout-outline-none uizz-layout-transition-all hover:uizz-layout-bg-content-title/[0.03] active:uizz-layout-bg-content-title/[0.03] dark:hover:uizz-layout-bg-content-title/[0.08] dark:active:uizz-layout-bg-content-title/[0.03]',
              {
                '--active uizz-layout-bg-content-title/[0.03] dark:uizz-layout-bg-content-title/[0.08]': optionsVisible
              }
            )}
            onClick={setOptionsVisible}
          >
            <div className='uizz-layout-absolute uizz-layout-left-0 uizz-layout-top-[calc(50%_-_1px)] uizz-layout-mt-[-0.5px] uizz-layout-h-px uizz-layout-w-[30px] uizz-layout-bg-content-title/[0.45] uizz-layout-opacity-30 uizz-layout-transition-[left,_background-color]' />

            <div className='uizz-layout-col-[2] uizz-layout-flex uizz-layout-min-w-0 uizz-layout-justify-between uizz-layout-truncate'>
              <span className='uizz-layout-text-ellipsis uizz-layout-whitespace-nowrap uizz-layout-break-all uizz-layout-text-sm uizz-layout-uppercase uizz-layout-tracking-[0.03em] uizz-layout-text-content-title/[0.65]'>
                <div className='uizz-layout-flex uizz-layout-gap-1'>
                  {selectedOption.icon && (
                    <div
                      className={cn('uizz-layout-text-xs', {
                        'uizz-layout-font-bold': optionsVisible
                      })}
                    >
                      {selectedOption.icon}
                    </div>
                  )}

                  {selectedOption.label}
                </div>
              </span>

              <CaretDownFilled
                className='uizz-layout-ml-1'
                style={{
                  fontSize: '0.8rem'
                }}
              />
            </div>
          </div>

          <div
            className={cn(
              'uizz-layout-z-[105] uizz-layout-ml-2 uizz-layout-box-border uizz-layout-min-h-10 uizz-layout-w-full uizz-layout-items-center uizz-layout-gap-2 uizz-layout-rounded-[0.5rem_0.5rem_0.5rem_0.5rem] uizz-layout-border-2 uizz-layout-bg-surface-default uizz-layout-px-1 uizz-layout-py-2 uizz-layout-leading-[1.15] uizz-layout-shadow-[2px_4px_12px_rgb(var(--eduzz-ui-layout-content-title)_/_0.16)] uizz-layout-outline-none uizz-layout-transition-all',
              {
                'uizz-layout-absolute': optionsVisible,
                'uizz-layout-hidden': !optionsVisible
              }
            )}
          >
            <ul className='uizz-layout-m-0 uizz-layout-block uizz-layout-p-0'>
              <li
                className={cn(
                  'uizz-layout-group/menu uizz-layout-grid uizz-layout-gap-1 uizz-layout-px-4 uizz-layout-py-3 uizz-layout-text-sm uizz-layout-font-bold'
                )}
              >
                {label}:
              </li>

              {options.map(option => {
                const isSelected = selectedOption.id === option.id;

                return (
                  <li
                    onClick={() => {
                      setSelectedOption(option);
                      setOptionsVisible();
                    }}
                    className={cn(
                      'uizz-layout-group/menu uizz-layout-flex uizz-layout-cursor-pointer uizz-layout-gap-1 uizz-layout-px-4 uizz-layout-py-2 hover:uizz-layout-bg-content-title/[0.03] active:uizz-layout-bg-content-title/[0.03] dark:hover:uizz-layout-bg-content-title/[0.08] dark:active:uizz-layout-bg-content-title/[0.03]',
                      {
                        '--active uizz-layout-bg-content-title/[0.03] dark:uizz-layout-bg-content-title/[0.08]':
                          isSelected
                      }
                    )}
                    key={`group-option-${option.id}`}
                  >
                    {option.icon && (
                      <div
                        className={cn('uizz-layout-text-xs', {
                          'uizz-layout-font-bold': isSelected
                        })}
                      >
                        {option.icon}
                      </div>
                    )}

                    <div className='uizz-layout-flex uizz-layout-items-center uizz-layout-justify-between'>
                      <span
                        className={cn(
                          'uizz-layout-whitespace-nowrap uizz-layout-break-all uizz-layout-text-sm uizz-layout-uppercase uizz-layout-tracking-[0.03em]',
                          {
                            'uizz-layout-font-bold': isSelected
                          }
                        )}
                      >
                        {option.label}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <ul className='uizz-layout-m-0  uizz-layout-block uizz-layout-p-0'>
          <CollapseEffect visibled={true}>
            <div className=' uizz-layout-pb-[0.7rem] [&_li]:uizz-layout-mb-0'>
              {selectedOption.items.map(item => item)}
            </div>
          </CollapseEffect>
        </ul>
      </li>
    );
  }
);

export default memo(SidebarGroupWithGroupSwitcher);
