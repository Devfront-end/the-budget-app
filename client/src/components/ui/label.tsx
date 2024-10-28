import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', error, children, ...props }, ref) => {
    const baseStyles = "block text-sm font-medium";
    const errorStyles = error ? "text-red-500" : "text-gray-700";

    const classes = `${baseStyles} ${errorStyles} ${className}`;

    return (
      <label ref={ref} className={classes} {...props}>
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';

export default Label;