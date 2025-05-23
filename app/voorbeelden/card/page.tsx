'use client';

import Link from 'next/link';

import {
  Bell,
  Check,
  CreditCard,
  Info,
  MessageSquare,
  Package,
  Plus,
  Settings,
} from 'lucide-react';

import { Avatar } from '@/components/atoms/avatar';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { Separator } from '@/components/atoms/separator';
import { Switch } from '@/components/atoms/switch';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/molecules/card';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

export default function CardExamplePage() {
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
                  <h2 className="text-2xl font-bold tracking-tight">Card Component Voorbeelden</h2>
                  <p className="text-muted-foreground">
                    Verschillende voorbeelden van de Card component en varianten.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Basic Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Titel</CardTitle>
                      <CardDescription>Card Beschrijving</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                      <p>Card Footer</p>
                    </CardFooter>
                  </Card>

                  {/* Project Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Nieuw Project Maken</CardTitle>
                      <CardDescription>Deploy uw nieuwe project in één klik.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <label htmlFor="name" className="text-sm font-medium">
                              Naam
                            </label>
                            <input
                              id="name"
                              type="text"
                              className="rounded-md border p-2"
                              placeholder="Naam van uw project"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <label htmlFor="framework" className="text-sm font-medium">
                              Framework
                            </label>
                            <Select>
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Selecteer een framework" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="next">Next.js</SelectItem>
                                <SelectItem value="react">React</SelectItem>
                                <SelectItem value="vue">Vue</SelectItem>
                                <SelectItem value="angular">Angular</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Annuleren</Button>
                      <Button>Deployen</Button>
                    </CardFooter>
                  </Card>

                  {/* Notification Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Notificaties</CardTitle>
                      <CardDescription>U heeft 3 ongelezen berichten.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="flex items-center gap-4 rounded-md border p-4">
                        <Bell className="h-4 w-4" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Push Notificaties</p>
                          <p className="text-sm text-muted-foreground">
                            Stuur notificaties naar apparaat.
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div>
                        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Uw afspraak is bevestigd.
                            </p>
                            <p className="text-sm text-muted-foreground">1 uur geleden</p>
                          </div>
                        </div>
                        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              U heeft een nieuw bericht!
                            </p>
                            <p className="text-sm text-muted-foreground">1 uur geleden</p>
                          </div>
                        </div>
                        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Uw abonnement loopt binnenkort af!
                            </p>
                            <p className="text-sm text-muted-foreground">2 uur geleden</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Check className="mr-2 h-4 w-4" /> Alles als gelezen markeren
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Cookie Settings Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Cookie Instellingen</CardTitle>
                      <CardDescription>Beheer uw cookie voorkeuren.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <div className="flex items-center justify-between space-x-2">
                        <label htmlFor="necessary" className="flex flex-col space-y-1">
                          <span className="font-medium">Noodzakelijke cookies</span>
                          <span className="text-xs text-muted-foreground">
                            Deze cookies zijn nodig voor het functioneren van de website.
                          </span>
                        </label>
                        <Switch id="necessary" defaultChecked disabled />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <label htmlFor="functional" className="flex flex-col space-y-1">
                          <span className="font-medium">Functionele cookies</span>
                          <span className="text-xs text-muted-foreground">
                            Deze cookies worden gebruikt om functionaliteit en voorkeuren te
                            onthouden.
                          </span>
                        </label>
                        <Switch id="functional" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <label htmlFor="performance" className="flex flex-col space-y-1">
                          <span className="font-medium">Prestatie cookies</span>
                          <span className="text-xs text-muted-foreground">
                            Deze cookies verzamelen informatie over het gebruik van de website.
                          </span>
                        </label>
                        <Switch id="performance" />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <label htmlFor="marketing" className="flex flex-col space-y-1">
                          <span className="font-medium">Marketing cookies</span>
                          <span className="text-xs text-muted-foreground">
                            Deze cookies worden gebruikt voor advertentiedoeleinden.
                          </span>
                        </label>
                        <Switch id="marketing" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Opslaan
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Profile Card */}
                  <Card className="overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-purple-500 to-blue-500" />
                    <div className="relative">
                      <Avatar className="absolute -top-12 left-6 h-24 w-24 border-4 border-background" />
                    </div>
                    <CardHeader className="pt-12">
                      <CardTitle>Jan Jansen</CardTitle>
                      <CardDescription>Software Developer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">124 berichten</span>
                        </div>
                        <div className="flex items-center">
                          <Package className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">8 projecten</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-between">
                      <Button variant="outline" size="sm">
                        <Plus className="mr-1 h-4 w-4" />
                        Volgen
                      </Button>
                      <Button size="sm">
                        <Settings className="mr-1 h-4 w-4" />
                        Profiel bewerken
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Payment Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Betaalmethode</CardTitle>
                      <CardDescription>
                        Voeg een nieuwe betaalmethode toe aan uw account.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="flex items-center gap-4 rounded-lg border p-4">
                          <CreditCard className="h-5 w-5" />
                          <div className="flex-1">
                            <div className="font-medium">Creditcard</div>
                            <div className="text-sm text-muted-foreground">**** **** **** 4321</div>
                          </div>
                          <Badge>Standaard</Badge>
                        </div>
                        <Button variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Nieuwe betaalmethode toevoegen
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      <Info className="mr-1 h-4 w-4" />
                      Uw betaalgegevens worden veilig verwerkt en opgeslagen.
                    </CardFooter>
                  </Card>
                </div>

                <div className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold">Card Componenten</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Basis Gebruik</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/molecules/card';

<Card>
  <CardHeader>
    <CardTitle>Card Titel</CardTitle>
    <CardDescription>Card Beschrijving</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`}</code>
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
