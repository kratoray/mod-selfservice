'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/atoms/tabs';

interface FormTab {
  value: string;
  label: string;
  href: string;
}

interface FormNavigationItem {
  title: string;
  sections: string[];
}

interface FormNavigationProps {
  items?: FormNavigationItem[];
}

const formTabs: FormTab[] = [
  {
    value: 'standard',
    label: 'Standard Form',
    href: '/voorbeelden/rjsf/standard',
  },
  {
    value: 'env-properties',
    label: 'Env Properties',
    href: '/voorbeelden/rjsf/env-properties',
  },
];

export function FormNavigation({ items }: FormNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Als items zijn meegegeven, toon dan de items weergave
  if (items && items.length > 0) {
    return (
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-medium">{item.title}</h3>
            <ul className="space-y-1.5">
              {item.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#${section}`}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
                  >
                    {section
                      .split('.')
                      .pop()
                      ?.replace(/([A-Z])/g, ' $1')
                      .replace(/^./, str => str.toUpperCase())}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // Standaard weergave met tabs
  const currentTab = formTabs.find(tab => tab.href === pathname)?.value || 'standard';

  return (
    <Tabs
      value={currentTab}
      onValueChange={(value: string) => {
        const tab = formTabs.find(t => t.value === value);
        if (tab) {
          router.push(tab.href);
        }
      }}
    >
      <TabsList>
        {formTabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
