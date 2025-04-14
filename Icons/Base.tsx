import { type SVGAttributes, forwardRef } from 'react';

export type IconSizes = 'sm' | 'md' | 'lg';

export type BaseIconProps = Omit<SVGAttributes<SVGElement>, 'width' | 'height'> & {
  /**
   * Defaults to 'md' (24px or 1.5rem)
   */
  size?: IconSizes | number;
};

const BaseIcon = forwardRef<SVGSVGElement, BaseIconProps>(
  ({ focusable = false, children, size = 'md', ...rest }, ref) => {
    const sizesMap: Record<IconSizes, number> = {
      lg: 32,
      md: 24,
      sm: 16
    };

    return (
      <svg
        ref={ref}
        width={sizesMap[size as IconSizes] ?? size}
        viewBox='0 0 192 192'
        focusable={focusable}
        fill='currentColor'
        {...rest}
      >
        {children}
      </svg>
    );
  }
);

export default BaseIcon;
