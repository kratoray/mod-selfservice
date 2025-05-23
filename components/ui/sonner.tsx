'use client';

import { useTheme } from 'next-themes';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success:
            'group-[.toast]:border-l-4 group-[.toast]:border-l-[hsl(var(--success))] group-[.toast]:text-[hsl(var(--success))] [&_svg]:text-[hsl(var(--success))]',
          error:
            'group-[.toast]:border-l-4 group-[.toast]:border-l-destructive group-[.toast]:text-destructive [&_svg]:text-destructive',
          warning:
            'group-[.toast]:border-l-4 group-[.toast]:border-l-[hsl(var(--warning))] group-[.toast]:text-[hsl(var(--warning))] [&_svg]:text-[hsl(var(--warning))]',
          info: 'group-[.toast]:border-l-4 group-[.toast]:border-l-primary group-[.toast]:text-primary [&_svg]:text-primary',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
