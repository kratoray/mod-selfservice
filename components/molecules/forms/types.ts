import { ReactNode } from 'react';

export interface FormFieldProps {
  id?: string;
  label?: string;
  description?: string;
  error?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}

export interface FormProps {
  /* eslint-disable-next-line no-unused-vars */
  onSubmit: (data: Record<string, unknown>) => void;
  children: ReactNode;
  className?: string;
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
