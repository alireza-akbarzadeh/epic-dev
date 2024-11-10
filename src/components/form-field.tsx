import React, { useId } from 'react';

const FormField = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'> & { label: string }>(
  ({ className, id, label, type, ...props }, ref) => {
    const generateId = useId();
    id ??= generateId;

    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          ref={ref}
          className={`border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
          {...props}
          id={id}
        />
      </div>
    );
  },
);

FormField.displayName = 'Input';

export { FormField };
