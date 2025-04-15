import { type HTMLAttributes, memo, useCallback, useEffect } from 'react';

import { useContextSelector } from 'use-context-selector';

import { type TopbarApplication } from '..';
import LayoutContext from '../../../context';
import useBoolean from '../../../hooks/useBoolean';
import IconClose from '../../../Icons/Close';
import IconFullscreen from '../../../Icons/Fullscreen';
import { cn } from '../../../utils/cn';

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
    document.body.style.overflow = expanded ? 'uizz:hidden' : oldValue;

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
      className={cn(
        'uizz:group/apps uizz:invisible uizz:fixed uizz:left-0 uizz:top-(--eduzz-ui-layout-topbar-height-rem) uizz:z-105 uizz:box-border uizz:max-h-[calc(100vh-var(--eduzz-ui-layout-topbar-height-rem))] uizz:w-full uizz:select-none uizz:overflow-y-auto uizz:rounded-[0_0_0.5rem_0.5rem] uizz:bg-surface-default uizz:shadow-[0px_8px_24px_rgb(var(--eduzz-ui-layout-content-title)/0.16)] uizz:sm:left-2 uizz:sm:w-(--eduzz-ui-layout-topbar-app-dropdown-width-rem)',
        {
          '--opened uizz:visible!': opened,
          '--expanded uizz:left-0! uizz:h-[calc(100%-var(--eduzz-ui-layout-topbar-height-rem))] uizz:w-full! uizz:overflow-x-auto uizz:rounded-none uizz:shadow-none':
            expanded
        }
      )}
      {...rest}
    >
      <div className='uizz:box-border uizz:hidden uizz:h-14 uizz:w-full uizz:items-center uizz:justify-between uizz:border-0 uizz:border-b uizz:border-solid uizz:border-gray-200 uizz:px-4 uizz:py-2 uizz:group-[.--expanded]/apps:flex uizz:dark:border-neutral-800 uizz:sm:px-7'>
        <h5 className='uizz:text-base uizz:font-semibold'>Lista de Apps</h5>
        <button
          onClick={toggleExpanded}
          className='uizz:flex uizz:h-8 uizz:w-8 uizz:cursor-pointer uizz:items-center uizz:justify-center uizz:rounded-full uizz:border-none uizz:bg-transparent uizz:p-0 uizz:text-content-title uizz:transition-all uizz:hover:bg-content-title/[0.03] uizz:dark:hover:bg-content-title/[0.06]'
        >
          <IconClose size={18} />
        </button>
      </div>

      <div className='uizz:box-border uizz:grid uizz:grid-cols-[repeat(2,1fr)] uizz:flex-wrap uizz:justify-items-center uizz:gap-[0.5rem_0.5rem] uizz:p-4 uizz:group-[.--expanded]/apps:grid-cols-[1fr] uizz:group-[.--expanded]/apps:gap-0 uizz:group-[.--expanded]/apps:p-0 uizz:sm:grid-cols-[repeat(3,1fr)] uizz:sm:group-[.--expanded]/apps:grid-cols-[repeat(2,1fr)] uizz:sm:group-[.--expanded]/apps:gap-6 uizz:sm:group-[.--expanded]/apps:p-6 uizz:lg:group-[.--expanded]/apps:grid-cols-[repeat(3,1fr)] uizz:xl:group-[.--expanded]/apps:grid-cols-[repeat(4,1fr)]'>
        {!applications?.length && (
          <div className='uizz:col-start-1 uizz:col-end-4 uizz:flex uizz:w-full uizz:items-center uizz:justify-center uizz:p-12'>
            Carregando...
          </div>
        )}

        {applications?.map(app => {
          const isCurrent = app.application === currentApplication;

          return (
            <a
              className={cn(
                'uizz:box-border uizz:block uizz:w-full uizz:cursor-pointer uizz:grid-cols-[2rem_1fr] uizz:grid-rows-[1.5rem_auto] uizz:gap-1 uizz:rounded uizz:border-gray-200 uizz:px-2 uizz:py-4 uizz:no-underline uizz:visited:text-inherit uizz:hover:bg-content-title/[0.03] uizz:hover:text-inherit uizz:group-[.--expanded]/apps:grid uizz:group-[.--expanded]/apps:border-b uizz:group-[.--expanded]/apps:p-4 uizz:dark:border-neutral-800 uizz:text-content-caption! uizz:dark:hover:bg-content-title/[0.06] uizz:sm:grid-cols-[4rem_1fr] uizz:sm:group-[.--expanded]/apps:border',
                isCurrent && 'uizz:bg-content-title/[0.03] uizz:dark:bg-content-title/[0.06]'
              )}
              key={app.application}
              href={isCurrent ? undefined : addModeToSearchParams(app.url, mode)}
              rel='noopener noreferrer'
              target='_blank'
              onClick={isCurrent ? onClose : undefined}
            >
              <img
                src={app.icon}
                className='uizz:m-auto uizz:mb-2 uizz:block uizz:max-h-10 uizz:max-w-[2.5rem] uizz:group-[.--expanded]/apps:max-h-[1.50rem] uizz:group-[.--expanded]/apps:max-w-[1.50rem] uizz:sm:group-[.--expanded]/apps:max-h-[3.1rem] uizz:sm:group-[.--expanded]/apps:max-w-[3.1rem]'
              />

              <p className='uizz:m-0 uizz:text-center uizz:text-sm uizz:leading-normal uizz:group-[.--expanded]/apps:text-left uizz:group-[.--expanded]/apps:text-base uizz:mb-0!'>
                {app.label}
              </p>
              <p className='uizz:col-span-2 uizz:m-0 uizz:mt-0.5 uizz:hidden uizz:overflow-hidden uizz:text-base uizz:leading-normal uizz:text-content-title/[0.45] uizz:opacity-80 uizz:group-[.--expanded]/apps:block uizz:sm:col-span-1 uizz:sm:col-start-2'>
                {app.description}
              </p>
            </a>
          );
        })}
      </div>

      {!!applications?.length && (
        <button
          className='uizz:flex uizz:h-[50px] uizz:w-full uizz:cursor-pointer uizz:flex-row uizz:items-center uizz:justify-center uizz:gap-2 uizz:border-none uizz:bg-transparent uizz:text-content-title uizz:transition-all uizz:hover:bg-content-title/[0.04] uizz:group-[.--expanded]/apps:hidden'
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
