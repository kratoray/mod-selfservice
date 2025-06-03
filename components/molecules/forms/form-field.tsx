import * as React from 'react';

import { Label } from '@/components/atoms/label';

import { FormFieldProps } from './types';

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  children,
  description,
  error,
  className = '',
  required = false,
  name,
}) => {
  // useId altijd aanroepen, ongeacht of id is meegegeven
  const generatedId = React.useId();
  const fieldId = id || generatedId;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label htmlFor={fieldId} className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <div>{React.cloneElement(children as React.ReactElement, { id: fieldId, name })}</div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {error && Array.isArray(error)
        ? error.map((err, i) => (
            <p className="text-sm text-destructive" key={i}>
              {err}
            </p>
          ))
        : error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
(FormField as React.FC).displayName = 'FormField';
