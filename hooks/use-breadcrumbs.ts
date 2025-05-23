import { usePathname } from 'next/navigation';

export interface BreadcrumbItem {
  href: string;
  label: string;
}

interface UseBreadcrumbsOptions {
  overrides?: Record<string, { label: string; href?: string }>;
}

export function useBreadcrumbs({ overrides = {} }: UseBreadcrumbsOptions = {}) {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  const items: BreadcrumbItem[] = segments.map((segment, index) => {
    let href = `/${segments.slice(0, index + 1).join('/')}`;

    if (overrides[segment]) {
      const override = overrides[segment];
      href = override.href || href;
      return { href, label: override.label };
    } else {
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return { href, label };
    }
  });

  if (overrides) {
    Object.keys(overrides).forEach(key => {
      const override = overrides[key];
      if (!segments.includes(key)) {
        items.push({ href: override.href || '', label: override.label });
      }
    });
  }

  return items;
}
