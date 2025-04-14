import { type ReactNode } from 'react';

interface TooltipProps {
  title?: string | undefined;
  children: ReactNode;
}

const Tooltip = ({ title, children }: TooltipProps) => {
  return (
    <div className='uizz:group/tooltip uizz:relative'>
      {title && (
        <div className='uizz:pointer-events-none uizz:absolute uizz:bottom-[-30px] uizz:left-[50%] uizz:translate-x-[-50%] uizz:rounded-lg uizz:bg-black uizz:px-2 uizz:py-1 uizz:text-[12px] uizz:text-white uizz:opacity-0 uizz:transition uizz:group-hover/tooltip:opacity-70'>
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
