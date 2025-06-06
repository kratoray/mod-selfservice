'use client';

import * as React from 'react';

import { useSession } from 'next-auth/react';

import {
  AlertCircle,
  AlertTriangle,
  Bell,
  ClipboardEdit,
  Code,
  Command,
  FormInput,
  GalleryVerticalEnd,
  LayoutGrid,
  LifeBuoy,
  Palette,
  SquarePlay,
  SquareTerminal,
  Tag,
} from 'lucide-react';

import { NavMain } from '@/components/organisms/nav-main';
import { NavSecondary } from '@/components/organisms/nav-secondary';
import { NavUser } from '@/components/organisms/nav-user';
import { ProjectSwitcher } from '@/components/organisms/project-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/organisms/sidebar';

const data = {
  projects: [
    {
      name: 'SSP 2.0',
      logo: GalleryVerticalEnd,
      plan: '',
    },
    {
      name: 'SSP 1.0',
      logo: Command,
      plan: '',
    },
  ],
  navMain: [
    {
      label: 'Boilerplate',
      items: [
        {
          title: 'Huisstijl',
          url: '/huisstijl',
          icon: Palette,
          isActive: false,
        },
        {
          title: 'Examples',
          url: '/voorbeelden',
          icon: Code,
          isActive: true,
          items: [
            {
              title: 'RJSF Form',
              url: '/voorbeelden/rjsf',
              icon: FormInput,
              items: [
                {
                  title: 'Standard',
                  url: '/voorbeelden/rjsf/standard',
                },
                {
                  title: 'Variables',
                  url: '/voorbeelden/rjsf/env-properties',
                },
              ],
            },
            {
              title: 'Badge',
              url: '/voorbeelden/badge',
              icon: Tag,
            },
            {
              title: 'Button',
              url: '/voorbeelden/button',
              icon: SquarePlay,
            },
            {
              title: 'Card',
              url: '/voorbeelden/card',
              icon: LayoutGrid,
            },
            {
              title: 'Loading Screen',
              url: '/voorbeelden/skeleton',
              icon: SquareTerminal,
            },
            {
              title: 'Form Components',
              url: '/voorbeelden/form',
              icon: ClipboardEdit,
            },
            {
              title: 'Alert',
              url: '/voorbeelden/alert',
              icon: AlertTriangle,
            },
            {
              title: 'Alert Dialog',
              url: '/voorbeelden/alert-dialog',
              icon: AlertCircle,
            },
            {
              title: 'Notification (Sonner)',
              url: '/voorbeelden/sonner',
              icon: Bell,
            },
            {
              title: 'Sheet',
              url: '/voorbeelden/sheet',
              icon: Command,
            },
          ],
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Help Center',
      url: '#',
      icon: LifeBuoy,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const user = {
    name: session?.user.name,
    uaccount: session?.user.username,
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <ProjectSwitcher projects={data.projects} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-between px-4">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
