import React, { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react';

const sizes = {
  small: 'text-xs',
  medium: 'text-2xl',
  large: 'text-4xl',
  xLarge: 'text-5xl',
} satisfies Record<string, string>;

interface BoxProps<T extends ElementType> {
  as?: T;
  className?: string;
  style?: React.CSSProperties;
  size?: keyof typeof sizes;
}

export function Box<T extends ElementType = 'div'>(
  props: BoxProps<T> & ComponentPropsWithoutRef<T>,
): ReactElement | null {
  const { as, className = '', style, size = 'medium', ...rest } = props;
  const Component = as || 'div';

  const sizes = {
    small: 'text-xs',
    medium: 'text-2xl',
    large: 'text-4xl',

    xLarge: 'text-5xl',
  } satisfies Record<string, string>;

  return (
    <Component
      className={['box', className, sizes[size]].filter(Boolean).join(' ')}
      style={{
        fontStyle: 'italic',
        ...style,
      }}
      {...rest}
    />
  );
}
