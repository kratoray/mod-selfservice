'use client';

import * as React from 'react';

import { SidebarProvider } from '@/components/organisms/sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
