'use client';

import React from 'react';

import Link from 'next/link';

import { AlertCircle, CheckCircle, Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert';
import { Separator } from '@/components/atoms/separator';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

export default function AlertExamplePage() {
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
                  <h2 className="text-2xl font-bold tracking-tight">Alert Component Voorbeelden</h2>
                  <p className="text-muted-foreground">
                    Verschillende voorbeelden van de Alert component en varianten.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Default Alert */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Default Alert</h3>
                    <Alert>
                      <Terminal className="h-4 w-4" />
                      <AlertTitle>Let op!</AlertTitle>
                      <AlertDescription>
                        U kunt componenten toevoegen aan uw app met behulp van de CLI.
                      </AlertDescription>
                    </Alert>
                  </div>

                  {/* Destructive Alert */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Destructive Alert</h3>
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Fout</AlertTitle>
                      <AlertDescription>Uw sessie is verlopen. Log opnieuw in.</AlertDescription>
                    </Alert>
                  </div>

                  {/* Success Alert */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Success Alert</h3>
                    <Alert variant="success">
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Succes</AlertTitle>
                      <AlertDescription>Uw wijzigingen zijn succesvol opgeslagen.</AlertDescription>
                    </Alert>
                  </div>

                  {/* Warning Alert */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Warning Alert</h3>
                    <Alert variant="warning">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Waarschuwing</AlertTitle>
                      <AlertDescription>
                        Uw gegevens zijn nog niet opgeslagen. Verlaat deze pagina niet.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold">Alert Componenten</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Basis Gebruik</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`import { Alert, AlertTitle, AlertDescription } from '@/components/atoms/alert';
import { Terminal } from 'lucide-react';

<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Let op!</AlertTitle>
  <AlertDescription>
    U kunt componenten toevoegen aan uw app met behulp van de CLI.
  </AlertDescription>
</Alert>`}</code>
                      </pre>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium">Varianten</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`// Default variant
<Alert>...</Alert>

// Destructive variant
<Alert variant="destructive">...</Alert>

// Success variant
<Alert variant="success">...</Alert>

// Warning variant
<Alert variant="warning">...</Alert>`}</code>
                      </pre>
                    </div>
                  </div>
                </div>

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
