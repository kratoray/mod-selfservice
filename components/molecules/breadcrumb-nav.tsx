import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';

interface BreadcrumbNavProps {
  overrides?: Record<string, { label: string; href?: string }>;
  className?: string;
}

export function BreadcrumbNav({ overrides, className }: BreadcrumbNavProps) {
  const items = useBreadcrumbs({ overrides });

  if (items.length === 0 && !overrides) return null;

  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            {!item.href ? (
              <span className="ml-1 text-sm font-medium text-muted-foreground md:ml-2">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="ml-1 text-sm font-medium text-muted-foreground hover:text-foreground md:ml-2"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
