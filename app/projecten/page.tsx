'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { Separator } from '@/components/atoms/separator';
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
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

// Pas indien nodig aan op jouw projectmodel
type Project = { id: string; name: string };

export default function ProjectenPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Projecten ophalen
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setProjectsLoading(true);
    setProjectsError(null);

    fetch('/api/projects')
      .then(async res => {
        if (!res.ok) throw new Error('Projecten ophalen mislukt');
        return res.json();
      })
      .then((data: Project[]) => {
        if (mounted) setProjects(data || []);
      })
      .catch(() => {
        if (mounted) setProjectsError('Projecten konden niet worden geladen.');
      })
      .finally(() => {
        if (mounted) setProjectsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Je bestaande functie behouden
  const handleCreateProject = async () => {
    // if (!projectName.trim()) {
    //   toast.error('Geef een naam op voor het project');
    //   return;
    // }

    setIsLoading(true);

    try {
      const res = await fetch('/api/projects/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: projectName }),
      });

      if (!res.ok) {
        throw new Error('Project aanmaken mislukt');
      }

      // Stel dat je backend het nieuwe project teruggeeft:
      const project = await res.json();

      setIsOpen(false);
      toast.success('Project aangemaakt');
      // Navigeer naar het nieuwe project. Gebruik het id uit de response!
      router.push(`/projecten/${project.id}`);
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Projecten Overzicht</h1>
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
          </div>

          <div className="rounded-lg border">
            <div className="p-4">
              {projectsLoading ? (
                <p>Projecten laden...</p>
              ) : projectsError ? (
                <p style={{ color: 'red' }}>{projectsError}</p>
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
