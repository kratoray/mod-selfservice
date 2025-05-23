'use client';

import { useCallback, useState } from 'react';

import Link from 'next/link';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/atoms/tabs';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/molecules/card';
import { UserProfileSkeleton } from '@/components/molecules/skeletons/user-profile-skeleton';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

import { useLoadingState } from '@/hooks/use-loading-state';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  bio: string;
  location: string;
  joinDate: string;
}

// Simulated API call
const fetchUserProfile = async (): Promise<UserProfile> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 5000));
  return {
    id: 1,
    name: 'Raymond de Vries',
    email: 'rd.d.vries.02@mindef.nl',
    role: 'Devops Engineer',
    bio: 'Passionate about building great user experiences.',
    location: 'Utrecht, Nederland',
    joinDate: 'November 2024',
  };
};

// Simulated failing API call
const fetchUserProfileError = async (): Promise<UserProfile> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 5000));
  throw new Error('Het ophalen van het profiel is mislukt. Probeer het later opnieuw.');
};

export default function SkeletonExample() {
  const [useError, setUseError] = useState(false);
  const handleError = useCallback((error: Error) => {
    // In productie zou hier een error logger worden gebruikt
    // console.error('Profiel laden mislukt:', error);

    // Expliciet gebruik van error om lint waarschuwing te voorkomen
    if (error.name === 'AbortError') {
      // Speciale afhandeling voor afgebroken requests
    }
  }, []);

  const { data, isLoading, error } = useLoadingState({
    fetchFn: useError ? fetchUserProfileError : fetchUserProfile,
    onError: handleError,
  });

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
              <div key={isLoading ? 'loading' : 'loaded'} className="mx-auto max-w-2xl space-y-8">
                <div className="space-y-4">
                  <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Skeleton Laadstatus Voorbeeld
                    </h2>
                    <p className="text-muted-foreground">
                      Dit voorbeeld laat zien hoe je laadstatussen kunt implementeren met skeleton
                      componenten.
                    </p>
                  </div>
                  <Tabs
                    value={useError ? 'error' : 'success'}
                    onValueChange={value => setUseError(value === 'error')}
                  >
                    <TabsList>
                      <TabsTrigger value="success">Succesvolle Status</TabsTrigger>
                      <TabsTrigger value="error">Fout Status</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {isLoading ? (
                  <UserProfileSkeleton />
                ) : error ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Fout</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                ) : !data ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Geen Profiel Gevonden</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Het opgevraagde profiel kon niet worden gevonden.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-muted" />
                        <div>
                          <CardTitle>{data.name}</CardTitle>
                          <p className="text-muted-foreground">{data.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Profiel Bewerken</Button>
                        <Button>Profiel Delen</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{data.bio}</p>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Locatie</p>
                          <p className="text-sm text-muted-foreground">{data.location}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Lid Sinds</p>
                          <p className="text-sm text-muted-foreground">{data.joinDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground">
            <div className="p-8">
              <div className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-0.5">
                  <h2 className="mb-4 text-2xl font-bold">Skeleton Componenten</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Basis Gebruik</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`import { UserProfileSkeleton } from '@/components/molecules/skeletons/user-profile-skeleton';
import { useLoadingState } from '@/hooks/use-loading-state';

// Definieer je data type
interface UserProfile {
  id: number;
  name: string;
  email: string;
  // andere velden...
}

// Gebruiken met loading state hook
const { data, isLoading, error } = useLoadingState({
  fetchFn: fetchUserProfile,
  onError: (error) => console.error(error)
});

// Gebruik in component
{isLoading ? (
  <UserProfileSkeleton />
) : error ? (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Fout</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert>
) : (
  // Toon data component...
)}

// Voor custom skeleton componenten, combineer de Skeleton component:
import { Skeleton } from '@/components/atoms/skeleton';

<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />`}</code>
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
