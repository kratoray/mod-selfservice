import * as React from 'react';

import { FormProps } from './types';

export const Form: React.FC<FormProps> = ({ onSubmit, children, className = '' }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: Record<string, unknown> = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {children}
    </form>
  );
};
