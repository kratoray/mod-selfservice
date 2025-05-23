'use client';

import Link from 'next/link';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/molecules/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/organisms/sidebar';

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
}

export function NavMain({ items }: { items: NavItem[] }) {
  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasItems = item.items && item.items.length > 0;
    const isFirstLevel = level === 0;

    if (isFirstLevel) {
      return (
        <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={item.title} className="text-white">
              <Link href={item.url}>
                {item.icon && <item.icon className="text-white" />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
            {hasItems && item.items && (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="text-white data-[state=open]:rotate-90">
                    <ChevronRight />
                    <span className="sr-only">Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map(subItem => renderNavItem(subItem, level + 1))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            )}
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuSubItem key={item.title}>
        <SidebarMenuSubButton asChild className="text-white">
          <Link href={item.url}>
            {item.icon && <item.icon className="text-white" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-white">Boilerplate</SidebarGroupLabel>
      <SidebarMenu>{items.map(item => renderNavItem(item))}</SidebarMenu>
    </SidebarGroup>
  );
}
