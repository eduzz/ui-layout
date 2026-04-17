import { HTMLAttributes, memo, useCallback, useEffect } from 'react';

import { useContextSelector } from 'use-context-selector';

import { TopbarApplicationCategory, TopbarApplication } from '..';
import LayoutContext from '../../../context';
import IconClose from '../../../Icons/Close';
import { cn } from '../../../utils/cn';

export type AppsDropdownProps = HTMLAttributes<HTMLDivElement> & {
  currentApplication: string | undefined;
  applicationsCategories?: TopbarApplicationCategory[];
  opened: boolean;
  onClose: () => void;
};

const AppsDropdown = memo<AppsDropdownProps>(
  ({ currentApplication, applicationsCategories, opened, onClose, ...rest }) => {
    const mode = useContextSelector(LayoutContext, context => context.layout.mode);

    const buildRedirectUrl = useCallback(
      ({ url }: TopbarApplication) => {
        const params = new URLSearchParams({
          utm_source: 'topbar',
          utm_medium: 'app-dropdown',
          ref: currentApplication ?? '',
          eduzzMode: mode
        });

        const redirectUrl = new URL(url);
        redirectUrl.search = params.toString();

        return redirectUrl.toString();
      },
      [currentApplication, mode]
    );

    useEffect(() => {
      const oldValue = document.body.style.overflow;
      document.body.style.overflow = opened ? 'hidden' : oldValue;

      return () => {
        document.body.style.overflow = oldValue;
      };
    }, [opened]);

    return (
      <div
        className={cn(
          'uizz-layout-group/apps uizz-layout-invisible uizz-layout-fixed uizz-layout-left-0 uizz-layout-top-[var(--eduzz-ui-layout-topbar-height-rem)] uizz-layout-z-[105] uizz-layout-box-border uizz-layout-h-[calc(100%-var(--eduzz-ui-layout-topbar-height-rem))] uizz-layout-max-h-[calc(100vh-var(--eduzz-ui-layout-topbar-height-rem))] uizz-layout-w-full uizz-layout-select-none uizz-layout-rounded-none uizz-layout-bg-surface-default uizz-layout-shadow-none uizz-layout-transition-all',
          { '--opened !uizz-layout-visible': opened }
        )}
        {...rest}
      >
        <div className='uizz-layout-box-border uizz-layout-flex uizz-layout-h-14 uizz-layout-w-full uizz-layout-items-center uizz-layout-justify-between uizz-layout-border-0 uizz-layout-border-b uizz-layout-border-solid uizz-layout-border-gray-200 uizz-layout-px-4 uizz-layout-py-2 dark:uizz-layout-border-neutral-800 sm:uizz-layout-px-7'>
          <h5 className='!uizz-layout-mb-0 !uizz-layout-mt-0  uizz-layout-text-sm uizz-layout-font-normal'>
            Navegue entre os Apps
          </h5>
          <button
            id='close-apps-button'
            onClick={onClose}
            className='uizz-layout-flex uizz-layout-h-8 uizz-layout-w-8 uizz-layout-cursor-pointer uizz-layout-items-center uizz-layout-justify-center uizz-layout-rounded-full uizz-layout-border-none uizz-layout-bg-transparent uizz-layout-p-0 uizz-layout-text-content-title uizz-layout-transition-all hover:uizz-layout-bg-content-title/[0.03] dark:hover:uizz-layout-bg-content-title/[0.06]'
          >
            <IconClose size={18} />
          </button>
        </div>

        <div className='uizz-layout-box-border uizz-layout-h-[calc(100%-var(--eduzz-ui-layout-topbar-height-rem)-14px)] uizz-layout-overflow-y-auto'>
          {!applicationsCategories?.length && (
            <div className='uizz-layout-col-start-1 uizz-layout-col-end-4 uizz-layout-flex uizz-layout-w-full uizz-layout-items-center uizz-layout-justify-center uizz-layout-p-12'>
              Carregando...
            </div>
          )}
          {applicationsCategories?.map(category => (
            <section
              className='uizz-layout-mb-4 uizz-layout-grid uizz-layout-grid-cols-1 uizz-layout-flex-wrap uizz-layout-justify-items-center uizz-layout-gap-0 uizz-layout-p-0 uizz-layout-px-4 sm:uizz-layout-mb-2 sm:uizz-layout-grid-cols-2 sm:uizz-layout-gap-4 sm:uizz-layout-p-6 lg:uizz-layout-grid-cols-3 xl:uizz-layout-grid-cols-4'
              key={category.title}
            >
              <header className='uizz-layout-col-span-1 uizz-layout-w-full uizz-layout-py-4 sm:uizz-layout-col-span-2 sm:uizz-layout-p-0 lg:uizz-layout-col-span-3 xl:uizz-layout-col-span-4'>
                <h5 className='!uizz-layout-mb-[0.125rem] !uizz-layout-mt-0 uizz-layout-w-full uizz-layout-text-base uizz-layout-font-medium uizz-layout-text-content-title'>
                  {category.title}
                </h5>
                <p className='uizz-layout-mt-0 uizz-layout-w-full !uizz-layout-text-sm uizz-layout-text-content-subtitle'>
                  {category.description}
                </p>
              </header>

              {category.apps?.map((app, index) => {
                const isCurrent = app.application === currentApplication;

                return (
                  <a
                    id={`app-${index}-link`}
                    className={cn(
                      'uizz-layout-relative uizz-layout-box-border uizz-layout-flex uizz-layout-w-full uizz-layout-cursor-pointer uizz-layout-flex-col uizz-layout-items-start uizz-layout-gap-1 uizz-layout-border-0 uizz-layout-border-b uizz-layout-border-solid uizz-layout-border-gray-200 uizz-layout-px-0 uizz-layout-py-4 !uizz-layout-text-content-caption uizz-layout-no-underline last-of-type:first-of-type:uizz-layout-border-b-0 visited:uizz-layout-text-inherit hover:!uizz-layout-bg-content-title/[0.03] hover:uizz-layout-text-inherit dark:uizz-layout-border-neutral-800 dark:hover:!uizz-layout-bg-content-title/[0.06] sm:uizz-layout-rounded sm:uizz-layout-border sm:uizz-layout-px-4 sm:last-of-type:first-of-type:uizz-layout-border-b',
                      'max-sm:before:uizz-layout-absolute max-sm:before:uizz-layout-inset-y-0 max-sm:before:-uizz-layout-left-4 max-sm:before:uizz-layout-w-4 max-sm:before:uizz-layout-content-[""] max-sm:hover:before:uizz-layout-bg-content-title/[0.03] dark:max-sm:hover:before:uizz-layout-bg-content-title/[0.06]',
                      'max-sm:after:uizz-layout-absolute max-sm:after:uizz-layout-inset-y-0 max-sm:after:-uizz-layout-right-4 max-sm:after:uizz-layout-w-4 max-sm:after:uizz-layout-content-[""] max-sm:hover:after:uizz-layout-bg-content-title/[0.03] dark:max-sm:hover:after:uizz-layout-bg-content-title/[0.06]',
                      {
                        'uizz-layout-border-primary !uizz-layout-bg-[rgba(var(--eduzz-theme-primary-rgb),0.05)] dark:!uizz-layout-bg-[rgba(var(--eduzz-theme-primary-rgb),0.05)] max-sm:before:uizz-layout-bg-content-title/[0.03] max-sm:after:uizz-layout-bg-content-title/[0.03] dark:max-sm:before:uizz-layout-bg-content-title/[0.06] dark:max-sm:after:uizz-layout-bg-content-title/[0.06]':
                          isCurrent
                      }
                    )}
                    key={app.application}
                    href={isCurrent ? undefined : buildRedirectUrl(app)}
                    rel='noopener noreferrer'
                    target='_blank'
                    onClick={isCurrent ? onClose : undefined}
                  >
                    <img src={app.icon} className='uizz-layout-mb-2 uizz-layout-block uizz-layout-max-h-6' />

                    <p className='uizz-layout-m-0 !uizz-layout-mb-0 uizz-layout-text-left uizz-layout-text-base uizz-layout-leading-normal uizz-layout-text-content-title'>
                      {app.label}
                    </p>
                    <p className='uizz-layout-col-span-2 uizz-layout-m-0 !uizz-layout-mb-0 uizz-layout-mt-0 uizz-layout-block uizz-layout-overflow-hidden uizz-layout-text-sm uizz-layout-leading-normal uizz-layout-text-content-subtitle uizz-layout-opacity-80 sm:uizz-layout-col-span-1 sm:uizz-layout-col-start-2'>
                      {app.description}
                    </p>
                  </a>
                );
              })}
            </section>
          ))}
        </div>
      </div>
    );
  }
);

export default AppsDropdown;
