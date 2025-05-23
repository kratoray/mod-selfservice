'use client';

import Link from 'next/link';

import { AlertCircle, Bell, CheckCircle, Home, Info, Shield } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

export default function HuisstijlPage() {
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
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Defensie Kleurenpalet</h2>
                  <p className="text-muted-foreground">
                    Een kleurenpalet geïnspireerd door defensie.nl voor gebruik in de applicatie.
                  </p>
                </div>

                {/* Kleurenpalet sectie */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Primaire Kleuren</h3>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-sidebar"></div>
                        <span>Defensie Blauw (Sidebar) - #154273</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-primary"></div>
                        <span>Defensie Oranje (Acties) - #e17000</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Statuskleuren</h3>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-[hsl(var(--success))]"></div>
                        <span>Success Groen - #39870c</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-[hsl(var(--warning))]"></div>
                        <span>Waarschuwing Oranje - #ffb612</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-destructive"></div>
                        <span>Destructive Rood - #d52b1e</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-accent"></div>
                        <span>Accent Blauw - #01689b</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons sectie */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Buttons</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button>Primair (Oranje)</Button>
                    <Button variant="success">Success (Groen)</Button>
                    <Button variant="destructive">Destructive (Rood)</Button>
                    <Button variant="secondary">Secundair</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>

                  <div className="mt-4 rounded-md bg-muted p-4">
                    <h4 className="mb-2 font-medium">UX Kleurcodering voor Acties</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm bg-primary"></div>
                        <span>
                          <strong>Oranje (Primair)</strong>: Hoofdacties, belangrijkste
                          call-to-actions
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm bg-[hsl(var(--success))]"></div>
                        <span>
                          <strong>Groen (Success)</strong>: Positieve acties, toevoegen, aanmaken,
                          bevestigen
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm bg-destructive"></div>
                        <span>
                          <strong>Rood (Destructive)</strong>: Verwijderen, data wissen, kritieke
                          acties
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm bg-secondary"></div>
                        <span>
                          <strong>Grijs (Secondary)</strong>: Secundaire acties, niet-kritieke
                          opties
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button>
                      <Shield />
                      Defensie
                    </Button>
                    <Button variant="success">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 4V20M4 12H20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Toevoegen
                    </Button>
                    <Button variant="destructive">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 18L18 6M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Verwijderen
                    </Button>
                    <Button variant="outline">Annuleren</Button>
                  </div>
                </div>

                {/* Alerts sectie */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Alerts</h3>
                  <div className="grid gap-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Informatie</AlertTitle>
                      <AlertDescription>Dit is een standaard informatiemelding.</AlertDescription>
                    </Alert>

                    <Alert variant="success">
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Succes</AlertTitle>
                      <AlertDescription>Uw wijzigingen zijn succesvol opgeslagen.</AlertDescription>
                    </Alert>

                    <Alert variant="warning">
                      <Bell className="h-4 w-4" />
                      <AlertTitle>Waarschuwing</AlertTitle>
                      <AlertDescription>Let op! Er zijn openstaande wijzigingen.</AlertDescription>
                    </Alert>

                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Fout</AlertTitle>
                      <AlertDescription>
                        Er is een fout opgetreden bij het opslaan.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <div className="mt-4">
                  <Link href="/" className="inline-flex items-center text-primary hover:underline">
                    <Home className="mr-2 h-4 w-4" />
                    Terug naar home
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
