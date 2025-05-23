'use client';

import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

import { ChevronsUpDown, LogOut, User } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/atoms/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/molecules/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/organisms/sidebar';

export function NavUser({
  user,
}: {
  user: {
    name?: string;
    uaccount?: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { setTheme, theme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.uaccount}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.uaccount}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="px-2 py-2">
              <Tabs defaultValue={theme || 'system'} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="light"
                    onClick={() => setTheme('light')}
                    className="flex items-center gap-2"
                  >
                    <span>Licht</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="dark"
                    onClick={() => setTheme('dark')}
                    className="flex items-center gap-2"
                  >
                    <span>Donker</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="system"
                    onClick={() => setTheme('system')}
                    className="flex items-center gap-2"
                  >
                    <span>Systeem</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Account Instellingen
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const res = await fetch('/api/auth/logout');
                  if (!res.ok) throw new Error('Logout failed');
                  return signOut();
                } catch {
                  toast.error('Uitloggen mislukt. Probeer het later opnieuw.');
                }
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Uitloggen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
