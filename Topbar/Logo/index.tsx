import type { JSXElementConstructor, ReactNode } from 'react';

import './style.css';
import { useContextSelector } from 'use-context-selector';

import LayoutContext from '../../context';

export interface LogoProps {
  logo?: string | ReactNode;
  logoMobile?: string | ReactNode;
  logoDarkMode?: string | ReactNode;
  logoMobileDarkMode?: string | ReactNode;
  wrapper?: JSXElementConstructor<{ children: ReactNode; className: string }>;
}

type LogoRenderProps = {
  image: string | ReactNode;
  className?: string;
};

const LogoRender = ({ image, className }: LogoRenderProps) => {
  if (typeof image === 'string') {
    return <img className={className} src={image} />;
  }

  return image;
};

const Logo = ({ logo, logoMobile, logoDarkMode, logoMobileDarkMode, wrapper: Wrapper }: LogoProps) => {
  const theme = useContextSelector(LayoutContext, context => context.layout.mode);

  function getLogos() {
    if (theme === 'dark') {
      return {
        desktop: logoDarkMode ?? '//cdn.eduzzcdn.com/topbar/myeduzz-white.svg',
        mobile: logoMobileDarkMode ?? '//cdn.eduzzcdn.com/topbar/myeduzz-mobile.svg'
      } as const;
    }

    return {
      desktop: logo ?? '//cdn.eduzzcdn.com/topbar/myeduzz.svg',
      mobile: logoMobile ?? '//cdn.eduzzcdn.com/topbar/myeduzz-mobile.svg'
    } as const;
  }

  const logos = getLogos();

  if (Wrapper) {
    return (
      <Wrapper className='eduzz-ui-layout-topbar-logo'>
        <LogoRender className='eduzz-ui-layout-topbar-logo-default' image={logos.desktop} />
        <LogoRender className='eduzz-ui-layout-topbar-logo-mobile' image={logos.mobile} />
      </Wrapper>
    );
  }

  return (
    <div className='eduzz-ui-layout-topbar-logo'>
      <LogoRender className='eduzz-ui-layout-topbar-logo-default' image={logos.desktop} />
      <LogoRender className='eduzz-ui-layout-topbar-logo-mobile' image={logos.mobile} />
    </div>
  );
};

export default Logo;
