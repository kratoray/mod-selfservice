'use client';

import React from 'react';

import Link from 'next/link';

import {
  AlertCircle,
  Anchor,
  ArrowRight,
  BellRing,
  ChevronRight,
  ExternalLink,
  Github,
  Info,
  Link as LinkIcon,
  Loader2,
  Plane,
  Shield,
} from 'lucide-react';

import { Button, buttonVariants } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/molecules/card';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

export default function ButtonPage() {
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
                  <h2 className="text-2xl font-bold tracking-tight">Button Component</h2>
                  <p className="text-muted-foreground">
                    Displays a button or a component that looks like a button.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Standaard Variants</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Button>Default</Button>
                      <Button variant="success">Success</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Button Sizes</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-2">
                      <Button size="sm">Small</Button>
                      <Button>Default</Button>
                      <Button size="lg">Large</Button>
                      <Button size="icon">
                        <Info />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Buttons with Icons</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Button>
                        <Info />
                        Info
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
                      <Button variant="secondary">
                        <BellRing />
                        Notifications
                      </Button>
                      <Button variant="outline">
                        <ArrowRight />
                        Action
                      </Button>
                      <Button variant="destructive">
                        <AlertCircle />
                        Warning
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Buttons as Links</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Link href="#" className={buttonVariants()}>
                        Link as Button
                      </Link>
                      <Link href="#" className={buttonVariants({ variant: 'secondary' })}>
                        Secondary Link
                      </Link>
                      <Link href="#" className={buttonVariants({ variant: 'outline' })}>
                        Outline Link
                      </Link>
                      <Link href="#" className={buttonVariants({ variant: 'destructive' })}>
                        Destructive Link
                      </Link>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Icon Positions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Button>
                        <LinkIcon />
                        Icon Left
                      </Button>
                      <Button variant="secondary">
                        Icon Right
                        <ChevronRight />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink />
                        Small with Icon
                      </Button>
                      <Button variant="destructive" size="lg">
                        <Github />
                        Large with Icon
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Button States</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Button disabled>Disabled</Button>
                      <Button variant="secondary" disabled>
                        Disabled
                      </Button>
                      <Button>
                        <Loader2 className="animate-spin" />
                        Loading
                      </Button>
                      <Button variant="outline">
                        <Loader2 className="animate-spin" />
                        Loading
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Defensie Buttons</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Button>
                          <Shield className="h-4 w-4" />
                          Defensie
                        </Button>
                        <Button>
                          <Shield className="h-4 w-4" />
                          Landmacht
                        </Button>
                        <Button>
                          <Plane className="h-4 w-4" />
                          Luchtmacht
                        </Button>
                        <Button>
                          <Anchor className="h-4 w-4" />
                          Marine
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="success">
                          <Shield className="h-4 w-4" />
                          Toevoegen Eenheid
                        </Button>
                        <Button variant="secondary">
                          <Shield className="h-4 w-4" />
                          Bekijken
                        </Button>
                        <Button variant="outline">
                          <Shield className="h-4 w-4" />
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>UX Kleurcodering voor Acties</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Bij het ontwerpen van gebruikersinterfaces is het belangrijk om consistente
                      kleuren te gebruiken voor verschillende soorten acties. Dit helpt gebruikers
                      snel te begrijpen wat een knop doet.
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="font-medium">Kleurrichtlijnen</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-sm bg-primary"></div>
                            <span>
                              <strong>Oranje (Default)</strong>: Hoofdacties, belangrijkste
                              call-to-actions
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-sm bg-[hsl(var(--success))]"></div>
                            <span>
                              <strong>Groen (Success)</strong>: Positieve acties, toevoegen,
                              aanmaken, bevestigen
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-sm bg-destructive"></div>
                            <span>
                              <strong>Rood (Destructive)</strong>: Verwijderen, data wissen,
                              kritieke acties
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

                      <div className="space-y-2">
                        <h4 className="font-medium">Voorbeelden</h4>
                        <div className="flex flex-wrap gap-2">
                          <Button>Opslaan</Button>
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
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold">Button Componenten</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Basis Gebruik</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`import { Button } from '@/components/atoms/button';

// Standaard button
<Button>Klik hier</Button>

// Met variant
<Button variant="success">Success</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Met size
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// Met icon
<Button><Icon />Met Icon</Button>

// Als link gebruiken (met Next.js Link)
import Link from 'next/link';
import { buttonVariants } from '@/components/atoms/button';

<Link href="/route" className={buttonVariants()}>
  Link als Button
</Link>`}</code>
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
