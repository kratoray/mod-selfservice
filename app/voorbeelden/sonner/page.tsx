'use client';

import Link from 'next/link';

import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

export default function SonnerExamplePage() {
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
                    Sonner Toast Component Voorbeelden
                  </h2>
                  <p className="text-muted-foreground">
                    Verschillende voorbeelden van de Sonner toast component en varianten.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Default Toast */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Standaard Toast</h3>
                    <Button onClick={() => toast('Gebeurtenis is aangemaakt.')}>Toon Toast</Button>
                  </div>

                  {/* Toast with Description */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Toast met Beschrijving</h3>
                    <Button
                      onClick={() =>
                        toast('Wijzigingen opgeslagen', {
                          description: 'Uw wijzigingen zijn succesvol opgeslagen en gepubliceerd.',
                        })
                      }
                    >
                      Met Beschrijving
                    </Button>
                  </div>

                  {/* Success Toast */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Succes Toast</h3>
                    <Button
                      onClick={() =>
                        toast.success('Succesvol opgeslagen', {
                          icon: <CheckCircle className="h-4 w-4" />,
                          description: 'Uw wijzigingen zijn met succes opgeslagen.',
                        })
                      }
                      variant="success"
                    >
                      Succes Toast
                    </Button>
                  </div>

                  {/* Error Toast */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Fout Toast</h3>
                    <Button
                      onClick={() =>
                        toast.error('Er is een fout opgetreden', {
                          icon: <X className="h-4 w-4" />,
                          description:
                            'De wijzigingen konden niet worden opgeslagen. Probeer het later opnieuw.',
                        })
                      }
                      variant="destructive"
                    >
                      Fout Toast
                    </Button>
                  </div>

                  {/* Warning Toast */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Waarschuwing Toast</h3>
                    <Button
                      onClick={() =>
                        toast.warning('Waarschuwing', {
                          icon: <AlertTriangle className="h-4 w-4" />,
                          description: 'Uw sessie verloopt over 5 minuten.',
                        })
                      }
                      variant="outline"
                      className="border-amber-300 bg-amber-100 text-amber-900 hover:bg-amber-200"
                    >
                      Waarschuwing Toast
                    </Button>
                  </div>

                  {/* Action Toast */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Toast met Actie</h3>
                    <Button
                      onClick={() =>
                        toast('Update beschikbaar', {
                          icon: <Info className="h-4 w-4" />,
                          description: 'Een nieuwe versie is beschikbaar.',
                          action: {
                            label: 'Update',
                            onClick: () => {
                              // Hier zou update logica komen
                              // console.log('Update gestart')
                            },
                          },
                          cancel: {
                            label: 'Later',
                            onClick: () => {
                              // Hier zou uitstel logica komen
                              // console.log('Update uitgesteld')
                            },
                          },
                        })
                      }
                    >
                      Met Actie Knoppen
                    </Button>
                  </div>

                  {/* Loading Toast */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Laad Toast</h3>
                    <Button
                      onClick={() => {
                        const toastId = toast.loading('Gegevens worden geladen...');

                        // Simuleer laden na 2 seconden
                        setTimeout(() => {
                          toast.success('Gegevens geladen!', {
                            id: toastId,
                            description: 'Alle gegevens zijn succesvol opgehaald.',
                          });
                        }, 2000);
                      }}
                    >
                      Laad Toast
                    </Button>
                  </div>

                  {/* Custom Positie */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Aangepaste Positie</h3>
                    <Button
                      onClick={() =>
                        toast('Toast in het midden', {
                          position: 'top-center',
                        })
                      }
                    >
                      Midden Positie
                    </Button>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold">Sonner Toast Componenten</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Basis Gebruik</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`// 1. Voeg de Toaster component toe aan je layout
import { Toaster } from "@/components/ui/sonner";

// In je layout component
<Toaster />

// 2. Gebruik de toast functie in je componenten
import { toast } from "sonner";

// Standaard toast
toast("Gebeurtenis is aangemaakt.")

// Toast met beschrijving
toast("Wijzigingen opgeslagen", {
  description: "Uw wijzigingen zijn succesvol opgeslagen."
})

// Succes toast
toast.success("Succesvol opgeslagen")`}</code>
                      </pre>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium">Varianten</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`// Succes toast
toast.success("Bericht")

// Fout toast
toast.error("Er is een fout opgetreden")

// Promise toast
toast.promise(fetchData(), {
  loading: "Laden...",
  success: "Gegevens geladen!",
  error: "Kon gegevens niet laden"
})

// Toast met actieknoppen
toast("Update beschikbaar", {
  action: {
    label: "Update",
    onClick: () => console.log("Update")
  },
  cancel: {
    label: "Later",
    onClick: () => console.log("Later")
  }
})`}</code>
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
