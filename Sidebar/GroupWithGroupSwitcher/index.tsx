import { type ReactNode, forwardRef, memo } from 'react';

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
  optionId: string;
  onChangeOption?: (option: SidebarGroupWithGroupSwitcherOption) => void;
}

const SidebarGroupWithGroupSwitcher = forwardRef<HTMLLIElement, SidebarGroupWithGroupSwitcherProps>(
  ({ id, label, className, options, optionId, onChangeOption }, ref) => {
    const selectedOption = options.find(option => option.id === optionId);

    const [optionsVisible, setOptionsVisible] = useBoolean(false);

    return (
      <li id={id} className={cn(className, 'uizz:block uizz:select-none')} ref={ref}>
        <div>
          <div
            className={cn(
              'uizz:relative uizz:box-border uizz:grid uizz:min-h-[2.2rem] uizz:cursor-pointer uizz:grid-cols-[1.625rem_1fr] uizz:items-center uizz:gap-2 uizz:rounded-br-[50px] uizz:rounded-tr-[50px] uizz:px-4 uizz:py-2 uizz:leading-[1.15] uizz:outline-hidden uizz:transition-all uizz:hover:bg-content-title/[0.03] uizz:active:bg-content-title/[0.03] uizz:dark:hover:bg-content-title/[0.08] uizz:dark:active:bg-content-title/[0.03]',
              {
                '--active uizz:bg-content-title/[0.03] uizz:dark:bg-content-title/[0.08]': optionsVisible
              }
            )}
            onClick={setOptionsVisible}
          >
            <div className='uizz:absolute uizz:left-0 uizz:top-[calc(50%-1px)] uizz:mt-[-0.5px] uizz:h-px uizz:w-[30px] uizz:bg-content-title/[0.45] uizz:opacity-30 uizz:transition-[left,background-color]' />

            <div className='uizz:col-2 uizz:flex uizz:min-w-0 uizz:justify-between uizz:truncate'>
              <span className='uizz:text-ellipsis uizz:whitespace-nowrap uizz:break-all uizz:text-sm uizz:uppercase uizz:tracking-[0.03em] uizz:text-content-title/[0.65]'>
                <div className='uizz:flex uizz:gap-1 uizz:items-center'>
                  {selectedOption?.icon && (
                    <div
                      className={cn('uizz:text-xs', {
                        'uizz:font-bold': optionsVisible
                      })}
                    >
                      {selectedOption.icon}
                    </div>
                  )}

                  {selectedOption?.label}
                </div>
              </span>

              <CaretDownFilled
                className='uizz:ml-1'
                style={{
                  fontSize: '0.8rem'
                }}
              />
            </div>
          </div>

          <div
            className={cn(
              'uizz:z-105 uizz:ml-2 uizz:box-border uizz:min-h-10 uizz:w-full uizz:items-center uizz:gap-2 uizz:rounded-[0.5rem_0.5rem_0.5rem_0.5rem] uizz:border uizz:border-outline-default uizz:bg-surface-default uizz:px-1 uizz:py-2 uizz:leading-[1.15] uizz:shadow-[2px_4px_12px_rgba(var(--eduzz-ui-layout-content-title),0.16)] uizz:outline-hidden uizz:transition-all',
              {
                'uizz:absolute': optionsVisible,
                'uizz:hidden': !optionsVisible
              }
            )}
          >
            <ul className='uizz:m-0 uizz:block uizz:p-0'>
              <li
                className={cn(
                  'uizz:group/menu uizz:grid uizz:gap-1 uizz:px-4 uizz:pb-2 uizz:pt-1 uizz:text-sm uizz:font-bold'
                )}
              >
                {label}:
              </li>

              {options.map(option => {
                const isSelected = selectedOption?.id === option.id;

                return (
                  <li
                    onClick={() => {
                      onChangeOption?.(option);

                      setOptionsVisible();
                    }}
                    className={cn(
                      'uizz:group uizz:flex uizz:cursor-pointer uizz:gap-1 uizz:px-4 uizz:py-2 uizz:items-center uizz:hover:bg-content-title/[0.03] uizz:active:bg-content-title/[0.03] uizz:dark:hover:bg-content-title/[0.08] uizz:dark:active:bg-content-title/[0.03]',
                      {
                        '--active uizz:bg-content-title/[0.03] uizz:dark:bg-content-title/[0.08]': isSelected
                      }
                    )}
                    key={`group-option-${option.id}`}
                  >
                    {option.icon && (
                      <div
                        className={cn('uizz:text-xs', {
                          'uizz:font-bold': isSelected
                        })}
                      >
                        {option.icon}
                      </div>
                    )}

                    <div className='uizz:flex uizz:items-center uizz:justify-between'>
                      <span
                        className={cn(
                          'uizz:whitespace-nowrap uizz:break-all uizz:text-sm uizz:uppercase uizz:tracking-[0.03em]',
                          {
                            'uizz:font-bold': isSelected
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

        <ul className='uizz:m-0 uizz:block uizz:p-0'>
          <CollapseEffect visibled={true}>
            <div className='uizz:pb-[0.7rem] uizz:[&_li]:mb-0'>{(selectedOption?.items || []).map(item => item)}</div>
          </CollapseEffect>
        </ul>
      </li>
    );
  }
);

export default memo(SidebarGroupWithGroupSwitcher);
