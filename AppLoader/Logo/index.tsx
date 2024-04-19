import { ReactNode, useMemo } from 'react';

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

      <div
        id='ui-loader-logo'
        className='uizz-layout-mb-5 !uizz-layout-block uizz-layout-max-h-[5.625rem] uizz-layout-w-[9.375rem]'
      >
        <div className='uizz-layout-w-full dark:uizz-layout-hidden'>
          <ImageRender
            image={logos.light}
            className='uizz-layout-max-h-[5.625rem] uizz-layout-w-full  uizz-layout-max-w-[9.375rem]'
          />
        </div>

        <div className='uizz-layout-hidden uizz-layout-w-full dark:uizz-layout-block'>
          <ImageRender image={logos.dark} className='uizz-layout-max-h-[5.625rem]  uizz-layout-max-w-[9.375rem]' />
        </div>
      </div>
    </>
  );
};

export default Logo;
