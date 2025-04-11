import { type ReactNode } from 'react';

interface BadgeProps {
  count?: number | undefined | null;
  dot?: boolean | undefined | null;
  children: ReactNode;
}

const Badge = ({ children, count, dot }: BadgeProps) => {
  return (
    <div className='uizz:relative'>
      {count ? (
        <div className='uizz:absolute uizz:right-[-8px] uizz:top-[-4px] uizz:inline-block uizz:h-[16px] uizz:min-w-[16px] uizz:rounded-full uizz:bg-red-500 uizz:px-1 uizz:text-center uizz:text-[12px] uizz:leading-[17px] uizz:text-white'>
          {count > 99 ? '99+' : count}
        </div>
      ) : dot ? (
        <div className='uizz:absolute uizz:right-[2px] uizz:top-[2px] uizz:inline-block uizz:h-[6px] uizz:min-w-[6px] uizz:rounded-full uizz:bg-red-500'>
          {count}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default Badge;
