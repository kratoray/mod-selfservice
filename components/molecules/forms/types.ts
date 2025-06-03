import { ReactNode } from 'react';

export interface FormFieldProps {
  id?: string;
  name?: string; // veldnaam voor error mapping
  label?: string;
  description?: string;
  error?: string | string[]; // accepteer array of string
  children: ReactNode;
  className?: string;
  required?: boolean;
}

export interface FormProps {
  /* eslint-disable-next-line no-unused-vars */
  onSubmit: (data: Record<string, unknown>) => void;
  children: ReactNode;
  className?: string;
  errors?: Record<string, string[]>; // veldfouten per veld
}

export interface FormNavigationProps {
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  isSubmitting?: boolean;
  className?: string;
}
