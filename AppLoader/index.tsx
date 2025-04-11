import { type ReactNode, Suspense, useMemo, useState } from 'react';

import AppLoaderContext, { type AppLoaderContextValue } from './context';
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
          'uizz:pointer-events-none uizz:fixed uizz:inset-0 uizz:z-2147483002 uizz:flex uizz:animate-fade-out uizz:items-center uizz:justify-center uizz:bg-surface-default/[0.32] uizz:backdrop-blur',
          { 'uizz:pointer-events-auto! uizz:animate-fade-in!': show }
        )}
      >
        <div
          className={cn(
            'uizz:mt-[-150vh] uizz:flex uizz:w-[200px] uizz:flex-col uizz:items-center uizz:justify-center uizz:transition-[0s,width] uizz:duration-[0.5s]',
            {
              'uizz:mt-0!': show,
              'uizz:w-[95vw]!': error
            }
          )}
        >
          {error ? (
            <>
              <p className='uizz:text-center uizz:text-lg uizz:text-content-title'>
                Não conseguimos carregar a aplicação
                <small className='uizz:mt-1 uizz:block uizz:opacity-70'>{error.message}</small>
              </p>

              {error.tryAgain && (
                <button
                  onClick={error.tryAgain}
                  className='uizz:mt-4 uizz:h-[42px] uizz:cursor-pointer uizz:rounded uizz:border uizz:border-solid uizz:border-content-disabled uizz:bg-transparent uizz:px-4 uizz:py-2 uizz:text-sm uizz:text-content-title uizz:transition-[0.3s] uizz:hover:border-primary uizz:hover:text-primary'
                >
                  Tentar Novamente
                </button>
              )}
            </>
          ) : (
            <>
              <Logo logo={logo} logoDarkMode={logoDarkMode} />

              <div className='uizz:relative uizz:block uizz:h-1 uizz:w-full uizz:overflow-hidden uizz:bg-[#0d2871]/25'>
                <div className='uizz:bg-primary'>
                  <div className='uizz:absolute uizz:inset-y-0 uizz:left-0 uizz:animate-loader uizz:bg-inherit' />
                  <div className='l uizz:absolute uizz:inset-y-0 uizz:left-0 uizz:animate-loader-short uizz:bg-inherit' />
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
