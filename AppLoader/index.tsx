import { ReactNode, Suspense, useMemo, useState } from 'react';

import AppLoaderContext, { AppLoaderContextValue } from './context';
import Logo from './Logo';
import { cn } from '../utils/cn';
import errorFormatter from '../utils/errorFormatter';

export type AppLoaderProps = {
  children: ReactNode;
  logo?: ReactNode;
  logoDarkMode?: ReactNode;
};

const AppLoader = ({ children, logo, logoDarkMode }: AppLoaderProps) => {
  const [show, setShow] = useState(true);
  const [error, setError] = useState<{ message: string; tryAgain: () => void } | null>(null);

  const contextValue = useMemo<AppLoaderContextValue>(
    () => ({
      show: () => setShow(true),
      error: (error: any, tryAgain: () => void) =>
        setError({
          message: errorFormatter(error),
          tryAgain: () => {
            tryAgain();
            setError(null);
          }
        }),
      hide: () => setShow(false)
    }),
    []
  );

  return (
    <>
      <AppLoaderContext.Provider value={contextValue}>
        <Suspense>{children}</Suspense>
      </AppLoaderContext.Provider>

      <section
        className={cn(
          'uizz-layout-pointer-events-none uizz-layout-fixed uizz-layout-inset-0 uizz-layout-z-[2147483002] uizz-layout-flex uizz-layout-animate-fadeOut uizz-layout-items-center uizz-layout-justify-center uizz-layout-bg-surface-default/[0.32] uizz-layout-backdrop-blur',
          { '!uizz-layout-pointer-events-auto !uizz-layout-animate-fadeIn': show }
        )}
      >
        <div
          className={cn(
            'uizz-layout-mt-[-150vh] uizz-layout-flex uizz-layout-w-[200px] uizz-layout-flex-col uizz-layout-items-center uizz-layout-justify-center uizz-layout-transition-[0s,width] uizz-layout-duration-[0.5s]',
            {
              '!uizz-layout-mt-0': show,
              '!uizz-layout-w-[95vw]': error
            }
          )}
        >
          {error ? (
            <>
              <p className='uizz-layout-text-center uizz-layout-text-lg uizz-layout-text-content-title'>
                Não conseguimos carregar a aplicação
                <small className='uizz-layout-mt-1 uizz-layout-block uizz-layout-opacity-70'>{error.message}</small>
              </p>

              {error.tryAgain && (
                <button
                  onClick={error.tryAgain}
                  className='uizz-layout-mt-4 uizz-layout-h-[42px] uizz-layout-cursor-pointer uizz-layout-rounded uizz-layout-border uizz-layout-border-solid uizz-layout-border-content-disabled uizz-layout-bg-transparent uizz-layout-px-4 uizz-layout-py-2 uizz-layout-text-sm uizz-layout-text-content-title uizz-layout-text-inherit uizz-layout-transition-[0.3s] hover:uizz-layout-border-primary hover:uizz-layout-text-primary'
                >
                  Tentar Novamente
                </button>
              )}
            </>
          ) : (
            <>
              <Logo logo={logo} logoDarkMode={logoDarkMode} />

              <div className='uizz-layout-relative uizz-layout-block uizz-layout-h-1 uizz-layout-w-full uizz-layout-overflow-hidden uizz-layout-bg-[#0d2871]/25'>
                <div className='uizz-layout-bg-primary'>
                  <div className='uizz-layout-absolute uizz-layout-inset-y-0 uizz-layout-left-0 uizz-layout-animate-loader uizz-layout-bg-inherit' />
                  <div className='l uizz-layout-absolute uizz-layout-inset-y-0 uizz-layout-left-0 uizz-layout-animate-loaderShort uizz-layout-bg-inherit' />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AppLoader;
