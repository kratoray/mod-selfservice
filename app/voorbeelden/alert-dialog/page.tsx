'use client';

import React from 'react';

import Link from 'next/link';

import { AlertCircle, Info, Trash } from 'lucide-react';

import { Button } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/molecules/alert-dialog';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

export default function AlertDialogExamplePage() {
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
                  <h2 className="text-2xl font-bold tracking-tight">
                    Alert Dialog Component Voorbeelden
                  </h2>
                  <p className="text-muted-foreground">
                    Verschillende voorbeelden van de Alert Dialog component en varianten.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Basic Alert Dialog */}
                  <div className="rounded-lg border p-6">
                    <h3 className="mb-4 text-xl font-medium">Basis Alert Dialog</h3>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>Toon Dialog</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Weet u het zeker?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Deze actie kan niet ongedaan worden gemaakt. Dit zal permanent uw
                            account verwijderen en alle gegevens van onze servers wissen.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuleren</AlertDialogCancel>
                          <AlertDialogAction>Doorgaan</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  {/* Delete Confirmation Alert Dialog */}
                  <div className="rounded-lg border p-6">
                    <h3 className="mb-4 text-xl font-medium">Verwijdering Bevestigen</h3>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Verwijderen
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Weet u zeker dat u dit item wilt verwijderen?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Deze actie kan niet ongedaan worden gemaakt. Het item zal permanent
                            verwijderd worden uit ons systeem en kan niet worden hersteld.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuleren</AlertDialogCancel>
                          <AlertDialogAction variant="destructive">Verwijderen</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  {/* Information Alert Dialog */}
                  <div className="rounded-lg border p-6">
                    <h3 className="mb-4 text-xl font-medium">Informatie Dialog</h3>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          <Info className="mr-2 h-4 w-4" />
                          Meer Informatie
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Belangrijke Informatie</AlertDialogTitle>
                          <AlertDialogDescription>
                            Dit is belangrijke informatie over het gebruik van deze functie. Lees
                            deze informatie aandachtig door voordat u verder gaat.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction>Begrepen</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  {/* Warning Alert Dialog */}
                  <div className="rounded-lg border p-6">
                    <h3 className="mb-4 text-xl font-medium">Waarschuwing Dialog</h3>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-amber-300 bg-amber-100 text-amber-900 hover:bg-amber-200"
                        >
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Waarschuwing
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Waarschuwing</AlertDialogTitle>
                          <AlertDialogDescription>
                            Deze actie kan gevolgen hebben voor uw gegevens. Controleer of u een
                            backup heeft voordat u verder gaat met deze actie.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuleren</AlertDialogCancel>
                          <AlertDialogAction className="bg-amber-500 text-white hover:bg-amber-600">
                            Doorgaan
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold">Alert Dialog Componenten</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Basis Gebruik</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/molecules/alert-dialog';

<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Bent u zeker?</AlertDialogTitle>
      <AlertDialogDescription>
        Deze actie kan niet ongedaan worden gemaakt.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Annuleren</AlertDialogCancel>
      <AlertDialogAction>Doorgaan</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}</code>
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
