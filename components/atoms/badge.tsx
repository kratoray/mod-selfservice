import * as React from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { BadgeProps } from './types';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', icon, iconPosition = 'start', children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
        {icon && iconPosition === 'start' && <span className="mr-1">{icon}</span>}
        {children}
        {icon && iconPosition === 'end' && <span className="ml-1">{icon}</span>}
      </div>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
