'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { Separator } from '@/components/atoms/separator';
import { Skeleton } from '@/components/atoms/skeleton';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/molecules/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/molecules/sheet';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

type Project = { id: string; name: string };

export default function ProjectenPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setProjectsLoading(true);
    fetch('/api/projects')
      .then(async res => {
        if (!res.ok) throw new Error('Projecten ophalen mislukt');
        return res.json();
      })
      .then((data: Project[]) => {
        if (mounted) {
          setProjects(data || []);
          setProjectsError(null);
        }
      })
      .catch(() => {
        if (mounted) {
          setProjectsError('Projecten konden niet worden geladen.');
        }
      })
      .finally(() => {
        if (mounted) setProjectsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      toast.error('Geef een naam op voor het project');
      return;
    }

    setIsLoading(true);

    try {
      // In a real application, make an API call to create the project
      // For now, we'll simulate the API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock project ID
      const projectId = Date.now().toString();

      setIsOpen(false);
      toast.success('Project aangemaakt');
      router.push(`/projecten/${projectId}`);
    } catch {
      toast.error('Er is een fout opgetreden bij het aanmaken van het project');
    } finally {
      setIsLoading(false);
      setProjectName('');
    }
  };

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
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Projecten Overzicht</h1>
            {/* Dialog variant */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="ml-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nieuwe Aanvraag
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Nieuwe Project Aanvraag</DialogTitle>
                  <DialogDescription>
                    Vul de naam in voor de nieuwe project aanvraag. Na het aanmaken kun je verdere
                    details invullen.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectName" className="text-right">
                      Project Naam
                    </Label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={e => setProjectName(e.target.value)}
                      className="col-span-3"
                      placeholder="Voer een projectnaam in"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateProject} disabled={isLoading}>
                    {isLoading ? 'Aanmaken...' : 'Aanmaken'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Sheet variant */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="ml-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nieuwe Aanvraag (Sheet)
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Nieuwe Project Aanvraag</SheetTitle>
                  <SheetDescription>
                    Vul de naam in voor de nieuwe project aanvraag. Na het aanmaken kun je verdere
                    details invullen.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectNameSheet" className="text-right">
                      Project Naam
                    </Label>
                    <Input
                      id="projectNameSheet"
                      value={projectName}
                      onChange={e => setProjectName(e.target.value)}
                      className="col-span-3"
                      placeholder="Voer een projectnaam in"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit" onClick={handleCreateProject} disabled={isLoading}>
                    {isLoading ? 'Aanmaken...' : 'Aanmaken'}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <div className="rounded-lg border">
            <div className="p-4">
              {projectsLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ) : projectsError ? (
                <Alert variant="destructive">
                  <AlertTitle>Fout</AlertTitle>
                  <AlertDescription>{projectsError}</AlertDescription>
                </Alert>
              ) : !projects || projects.length === 0 ? (
                <p className="text-muted-foreground">Er zijn nog geen projecten.</p>
              ) : (
                <ul>
                  {projects.map(project => (
                    <li key={project.id}>{project.name || 'Project zonder naam'}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
