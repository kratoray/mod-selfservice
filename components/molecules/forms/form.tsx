import * as React from 'react';

import { FormProps } from './types';

export const Form: React.FC<FormProps> = ({ onSubmit, children, className = '', errors = {} }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: Record<string, unknown> = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    onSubmit(data);
  };

  // Injecteer errors als prop in FormField-kinderen
  const enhancedChildren = React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;
    // Check displayName for FormField
    const displayName = (child.type && (child.type as { displayName?: string }).displayName) || '';
    if (displayName === 'FormField') {
      const name = (child.props as { name?: string; id?: string }).name || (child.props as { id?: string }).id;
      const error = name && errors && errors[name] ? errors[name] : undefined;
      return React.cloneElement(
        child as React.ReactElement<{ error?: string | string[] }>,
        { error }
      );
    }
    return child;
  });

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {enhancedChildren}
    </form>
  );
};
