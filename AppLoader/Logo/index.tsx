import { type ReactNode, useMemo } from 'react';

import ImageRender from './ImageRender';

type LogoProps = {
  logo?: ReactNode | string;
  logoDarkMode?: ReactNode | string;
};

const InitialStyle = () => (
  // This is needed to prevent images to show unstyled before the css loads =[
  <style>
    {`
      #ui-loader-logo {
        display: none;
      }
    `}
  </style>
);

const Logo = ({ logo, logoDarkMode }: LogoProps) => {
  const logos = useMemo(() => {
    const light = logo ?? 'https://cdn.eduzzcdn.com/topbar/myeduzz.svg';
    const dark = logoDarkMode ?? 'https://cdn.eduzzcdn.com/topbar/myeduzz-white.svg';

    return { light, dark };
  }, [logo, logoDarkMode]);

  return (
    <>
      <InitialStyle />

      <div id='ui-loader-logo' className='uizz:mb-5 uizz:block! uizz:max-h-[5.625rem] uizz:w-[9.375rem]'>
        <div className='uizz:w-full uizz:dark:hidden'>
          <ImageRender image={logos.light} className='uizz:max-h-[5.625rem] uizz:w-full uizz:max-w-[9.375rem]' />
        </div>

        <div className='uizz:hidden uizz:w-full uizz:dark:block'>
          <ImageRender image={logos.dark} className='uizz:max-h-[5.625rem] uizz:max-w-[9.375rem]' />
        </div>
      </div>
    </>
  );
};

export default Logo;
