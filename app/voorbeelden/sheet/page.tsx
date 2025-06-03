'use client';

import Link from 'next/link';
import { AppSidebar } from '@/components/templates/app-sidebar';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { Separator } from '@/components/atoms/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/molecules/card';
import { Button } from '@/components/atoms/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/molecules/sheet';

export default function VoorbeeldSheet() {
  return (
    <>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbNav />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="rounded-xl border bg-card text-card-foreground">
            <div className="p-8">
              <div className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-0.5">
                  <h2 className="text-2xl font-bold tracking-tight">Sheet Component</h2>
                  <p className="text-muted-foreground">
                    Voorbeeld van een Sheet component implementatie met shadcn.
                  </p>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Sheet Voorbeeld</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button>Open Sheet</Button>
                      </SheetTrigger>
                      <SheetContent side="right">
                        <SheetHeader>
                          <SheetTitle>Sheet Titel</SheetTitle>
                          <SheetDescription>
                            Dit is een voorbeeld van een shadcn Sheet component implementatie.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-4">Hier kan je eigen content plaatsen.</div>
                        <SheetFooter>
                          <Button variant="secondary">Annuleren</Button>
                          <Button>Opslaan</Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </CardContent>
                </Card>
                <div className="mt-10">
                  <Link href="/voorbeelden" className="text-primary underline">
                    Terug naar Voorbeelden
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
