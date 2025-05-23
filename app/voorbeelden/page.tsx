'use client';

import Link from 'next/link';

import {
  AlertCircle,
  AlertTriangle,
  ChevronRight,
  ClipboardEdit,
  FormInput,
  LayoutGrid,
  SquarePlay,
  SquareTerminal,
  Tag,
} from 'lucide-react';

import { buttonVariants } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/molecules/card';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

export default function VoorbeeldenPage() {
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
                  <h2 className="text-2xl font-bold tracking-tight">Component Voorbeelden</h2>
                  <p className="text-muted-foreground">
                    Bekijk de verschillende component voorbeelden.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5" />
                        Badge
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Een badge component met verschillende varianten en mogelijkheden.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/voorbeelden/badge"
                        className={buttonVariants({
                          variant: 'outline',
                          size: 'sm',
                          className: 'w-full',
                        })}
                      >
                        Bekijken
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <SquarePlay className="h-5 w-5" />
                        Button
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Een button component met verschillende varianten, maten en mogelijkheden.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/voorbeelden/button"
                        className={buttonVariants({
                          variant: 'outline',
                          size: 'sm',
                          className: 'w-full',
                        })}
                      >
                        Bekijken
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <SquareTerminal className="h-5 w-5" />
                        Laadscherm
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Skeleton componenten voor laadschermen.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/voorbeelden/skeleton"
                        className={buttonVariants({
                          variant: 'outline',
                          size: 'sm',
                          className: 'w-full',
                        })}
                      >
                        Bekijken
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FormInput className="h-5 w-5" />
                        RJSF Formulier
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Voorbeelden van RJSF formulieren met verschillende configuraties.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/voorbeelden/rjsf"
                        className={buttonVariants({
                          variant: 'outline',
                          size: 'sm',
                          className: 'w-full',
                        })}
                      >
                        Bekijken
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LayoutGrid className="h-5 w-5" />
                        Card
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Card componenten met verschillende layouts en voorbeelden.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/voorbeelden/card"
                        className={buttonVariants({
                          variant: 'outline',
                          size: 'sm',
                          className: 'w-full',
                        })}
                      >
                        Bekijken
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ClipboardEdit className="h-5 w-5" />
                        Form Componenten
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Alle form componenten en voorbeelden van complete formulieren.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/voorbeelden/form"
                        className={buttonVariants({
                          variant: 'outline',
                          size: 'sm',
                          className: 'w-full',
                        })}
                      >
                        Bekijken
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Alert
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Alert componenten met verschillende varianten voor feedback en notificaties.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/voorbeelden/alert"
                        className={buttonVariants({
                          variant: 'outline',
                          size: 'sm',
                          className: 'w-full',
                        })}
                      >
                        Bekijken
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Alert Dialog
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Alert Dialog componenten voor belangrijke meldingen die om bevestiging
                        vragen.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/voorbeelden/alert-dialog"
                        className={buttonVariants({
                          variant: 'outline',
                          size: 'sm',
                          className: 'w-full',
                        })}
                      >
                        Bekijken
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <SquareTerminal className="h-5 w-5" />
                        Sheet
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Een voorbeeld van de shadcn Sheet component implementatie.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/voorbeelden/sheet"
                        className={buttonVariants({
                          variant: 'outline',
                          size: 'sm',
                          className: 'w-full',
                        })}
                      >
                        Bekijken
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
