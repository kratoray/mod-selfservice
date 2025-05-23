import { HTMLAttributes, ReactNode } from 'react';

/**
 * Badge component interfaces
 */
export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
}
