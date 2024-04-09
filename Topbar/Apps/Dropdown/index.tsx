import { HTMLAttributes, memo, useCallback, useEffect } from 'react';

import { useContextSelector } from 'use-context-selector';

import { TopbarApplication } from '..';
import LayoutContext from '../../../context';
import useBoolean from '../../../hooks/useBoolean';
import IconClose from '../../../Icons/Close';
import IconFullscreen from '../../../Icons/Fullscreen';
import cx from '../../../utils/cx';

export type AppsDropdownProps = HTMLAttributes<HTMLDivElement> & {
  currentApplication: string | undefined;
  applications: TopbarApplication[] | undefined;
  opened: boolean;
  onClose: () => void;
};

const AppsDropdown = memo<AppsDropdownProps>(({ currentApplication, applications, opened, onClose, ...rest }) => {
  const [expanded, toggleExpanded, , closeExpanded] = useBoolean();
  const mode = useContextSelector(LayoutContext, context => context.layout.mode);

  const addModeToSearchParams = useCallback((url: string, currentMode: 'dark' | 'light') => {
    const newURL = new URL(url);
    newURL.searchParams.set('eduzzMode', currentMode);
    return newURL.href;
  }, []);

  useEffect(() => {
    const oldValue = document.body.style.overflow;
    document.body.style.overflow = expanded ? 'uizz-layout-hidden' : oldValue;

    return () => {
      document.body.style.overflow = oldValue;
    };
  }, [expanded]);

  useEffect(() => {
    if (opened) return;
    closeExpanded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <div
      className={cx(
        'uizz-layout-group/apps uizz-layout-invisible uizz-layout-fixed uizz-layout-left-0 uizz-layout-top-[var(--eduzz-ui-layout-topbar-height-rem)] uizz-layout-z-[105] uizz-layout-box-border uizz-layout-max-h-[calc(100vh-var(--eduzz-ui-layout-topbar-height-rem))] uizz-layout-w-full uizz-layout-select-none uizz-layout-overflow-y-auto uizz-layout-rounded-[0_0_0.5rem_0.5rem] uizz-layout-bg-surface-default uizz-layout-shadow-[0px_8px_24px_rgb(var(--eduzz-ui-layout-content-title)_/_0.16)] sm:uizz-layout-left-2 sm:uizz-layout-w-[var(--eduzz-ui-layout-topbar-app-dropdown-width-rem)]',
        {
          '--opened !uizz-layout-visible': opened,
          '--expanded !uizz-layout-left-0 uizz-layout-h-[calc(100%-var(--eduzz-ui-layout-topbar-height-rem))] !uizz-layout-w-full uizz-layout-overflow-x-auto uizz-layout-rounded-none uizz-layout-shadow-none':
            expanded
        }
      )}
      {...rest}
    >
      <div className='uizz-layout-box-border uizz-layout-hidden uizz-layout-h-14 uizz-layout-w-full uizz-layout-items-center uizz-layout-justify-between uizz-layout-border-0 uizz-layout-border-b uizz-layout-border-solid uizz-layout-border-gray-200 uizz-layout-px-4 uizz-layout-py-2 group-[.--expanded]/apps:uizz-layout-flex dark:uizz-layout-border-neutral-800 sm:uizz-layout-px-7'>
        <h5 className='uizz-layout-text-base uizz-layout-font-semibold'>Lista de Apps</h5>
        <button
          onClick={toggleExpanded}
          className='uizz-layout-flex uizz-layout-h-8 uizz-layout-w-8 uizz-layout-cursor-pointer uizz-layout-items-center uizz-layout-justify-center uizz-layout-rounded-full uizz-layout-border-none uizz-layout-bg-transparent uizz-layout-p-0 uizz-layout-text-content-title uizz-layout-transition-all hover:uizz-layout-bg-content-title/[0.03] dark:hover:uizz-layout-bg-content-title/[0.06]'
        >
          <IconClose size={18} />
        </button>
      </div>

      <div className='uizz-layout-box-border uizz-layout-grid uizz-layout-grid-cols-[repeat(2,1fr)] uizz-layout-flex-wrap uizz-layout-justify-items-center uizz-layout-gap-[0.5rem_0.5rem] uizz-layout-p-4 group-[.--expanded]/apps:uizz-layout-grid-cols-[1fr] group-[.--expanded]/apps:uizz-layout-gap-0 group-[.--expanded]/apps:uizz-layout-p-0 sm:uizz-layout-grid-cols-[repeat(3,1fr)] sm:group-[.--expanded]/apps:uizz-layout-grid-cols-[repeat(2,1fr)] sm:group-[.--expanded]/apps:uizz-layout-gap-6 sm:group-[.--expanded]/apps:uizz-layout-p-6 lg:group-[.--expanded]/apps:uizz-layout-grid-cols-[repeat(3,1fr)] xl:group-[.--expanded]/apps:uizz-layout-grid-cols-[repeat(4,1fr)]'>
        {!applications?.length && (
          <div className='uizz-layout-col-start-1 uizz-layout-col-end-4 uizz-layout-flex uizz-layout-w-full uizz-layout-items-center uizz-layout-justify-center uizz-layout-p-12'>
            Carregando...
          </div>
        )}

        {applications?.map(app => {
          const isCurrent = app.application === currentApplication;

          return (
            <a
              className={cx(
                'uizz-layout-box-border uizz-layout-block uizz-layout-w-full uizz-layout-cursor-pointer uizz-layout-grid-cols-[2rem_1fr] uizz-layout-grid-rows-[1.5rem_auto] uizz-layout-gap-1 uizz-layout-rounded uizz-layout-border-gray-200 uizz-layout-px-2  uizz-layout-py-4 uizz-layout-text-inherit uizz-layout-no-underline visited:uizz-layout-text-inherit hover:uizz-layout-bg-content-title/[0.03] hover:uizz-layout-text-inherit group-[.--expanded]/apps:uizz-layout-grid group-[.--expanded]/apps:uizz-layout-border-b group-[.--expanded]/apps:uizz-layout-p-4 dark:uizz-layout-border-neutral-800 dark:hover:uizz-layout-bg-content-title/[0.06] sm:uizz-layout-grid-cols-[4rem_1fr] sm:group-[.--expanded]/apps:uizz-layout-border',
                isCurrent && 'uizz-layout-bg-content-title/[0.03] dark:uizz-layout-bg-content-title/[0.06]'
              )}
              key={app.application}
              href={isCurrent ? undefined : addModeToSearchParams(app.url, mode)}
              rel='noopener noreferrer'
              target='_blank'
              onClick={isCurrent ? onClose : undefined}
            >
              <img
                src={app.icon}
                className='uizz-layout-m-auto uizz-layout-mb-2 uizz-layout-block uizz-layout-max-h-10 uizz-layout-max-w-[2.5rem] group-[.--expanded]/apps:uizz-layout-max-h-[1.50rem] group-[.--expanded]/apps:uizz-layout-max-w-[1.50rem] sm:group-[.--expanded]/apps:uizz-layout-max-h-[3.1rem] sm:group-[.--expanded]/apps:uizz-layout-max-w-[3.1rem]'
              />

              <p className='uizz-layout-m-0 uizz-layout-text-center uizz-layout-text-sm uizz-layout-leading-normal group-[.--expanded]/apps:uizz-layout-text-left group-[.--expanded]/apps:uizz-layout-text-base'>
                {app.label}
              </p>
              <p className='uizz-layout-col-span-2 uizz-layout-m-0 uizz-layout-mt-0.5 uizz-layout-hidden uizz-layout-overflow-hidden uizz-layout-text-base uizz-layout-leading-normal uizz-layout-text-content-title/[0.45] uizz-layout-opacity-80 group-[.--expanded]/apps:uizz-layout-block sm:uizz-layout-col-span-1 sm:uizz-layout-col-start-2'>
                {app.description}
              </p>
            </a>
          );
        })}
      </div>

      {!!applications?.length && (
        <button
          className='uizz-layout-flex uizz-layout-h-[50px] uizz-layout-w-full uizz-layout-cursor-pointer uizz-layout-flex-row uizz-layout-items-center uizz-layout-justify-center uizz-layout-gap-2 uizz-layout-border-none uizz-layout-bg-transparent uizz-layout-text-content-title uizz-layout-transition-all hover:uizz-layout-bg-content-title/[0.04] group-[.--expanded]/apps:uizz-layout-hidden'
          onClick={toggleExpanded}
        >
          <IconFullscreen />
          Expandir
        </button>
      )}
    </div>
  );
});

export default AppsDropdown;
