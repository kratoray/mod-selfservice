import { ReactNode } from 'react';

// Base props interface for all components
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

// Common button props
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Common input props
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  /* eslint-disable-next-line no-unused-vars */
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

// Common card props
export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// Common form field props
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

// Common layout props
export interface LayoutProps extends BaseComponentProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  centered?: boolean;
}

// Common navigation item props
export interface NavItemProps extends BaseComponentProps {
  href: string;
  active?: boolean;
  icon?: ReactNode;
}

// Common modal props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Define more specific types for table data
export type TableValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: TableValue }
  | TableValue[];

export interface ColumnDefinition {
  key: string;
  header: string;
  /* eslint-disable-next-line no-unused-vars */
  render?: (value: TableValue) => ReactNode;
}

// Common table props
export interface TableProps extends BaseComponentProps {
  columns: ColumnDefinition[];
  data: Record<string, TableValue>[];
  loading?: boolean;
  emptyState?: ReactNode;
}

// Common theme props
export interface ThemeProps {
  /* eslint-disable-next-line no-unused-vars */
  setTheme?: (theme: 'light' | 'dark' | 'system') => void;
}
