'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import { Skeleton } from '@/components/atoms/skeleton';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { ShadcnForm } from '@/components/organisms/forms/shadcn-form';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

import { cn } from '@/lib/utils';

// Types
type Tab = {
  title: string;
  description: string;
  icon: string;
  color: string;
  sequenceNumber: number;
  schema: Record<string, unknown>;
  ui: Record<string, unknown>;
};

type FormApiResponse = {
  id: number;
  tabs: Tab[];
  status: string;
  creation_date: string;
};

export default function ProjectDetailPage() {
  const router = useRouter();

  // State
  const [form, setForm] = useState<FormApiResponse | null>(null);
  const [formLoading, setFormLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedCategories, setCompletedCategories] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  // Icon mapping
  const iconMap: Record<string, React.ReactNode> = {
    Info: <span>ℹ️</span>,
    // Voeg eventueel andere iconen toe
  };

  // Ophalen van het formulier (API call)
  useEffect(() => {
    let active = true;
    setFormLoading(true);
    setFormError(null);
    fetch('/api/forms')
      .then(async res => {
        let data;
        try {
          data = await res.json();
        } catch {
          if (active) setFormError('Ongeldige server response.');
          return;
        }
        if (!res.ok) {
          const msg = data?.error || data?.devError || data?.message || 'Ophalen mislukt';
          if (active) setFormError(msg);
          return;
        }
        if (active) setForm(data);
      })
      .catch(() => {
        if (active) setFormError(prev => prev || 'Er is een fout opgetreden.');
      })
      .finally(() => {
        if (active) setFormLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Afgeleide data
  const categories = form?.tabs ?? [];
  const currentCategory = isReviewing ? null : categories[currentCategoryIndex];

  // Handlers
  const handleFormSubmit = async (data: Record<string, unknown>) => {
    if (!currentCategory) return;
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      // Simuleer een echte POST-call naar de backend
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: currentCategory.title,
          data,
        }),
      });
      const result = await res.json();
      if (!res.ok && result.errors) {
        setFieldErrors(result.errors);
        toast.error(result.message || 'Er zijn validatiefouten.');
        return;
      }
      // Geen veldfouten: ga door naar volgende stap
      if (!completedCategories.includes(currentCategory.title)) {
        setCompletedCategories(prev => [...prev, currentCategory.title]);
      }
      setFormData(prev => ({ ...prev, [currentCategory.title]: data }));
      if (currentCategoryIndex === categories.length - 1) {
        setIsReviewing(true);
      } else {
        setCurrentCategoryIndex(currentCategoryIndex + 1);
      }
    } catch {
      toast.error('Er is een fout opgetreden bij het opslaan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormError = () => {
    toast.error('Vul alle verplichte velden correct in', {
      description: 'Controleer de rood gemarkeerde velden',
      position: 'top-center',
    });
  };

  const handleNext = () => {
    if (submitButtonRef.current) submitButtonRef.current.click();
  };

  useEffect(() => {
    if (!isReviewing && currentCategory) {
      const timer = setTimeout(() => {
        const button = document.querySelector(
          '.form-container form button[type="submit"]'
        ) as HTMLButtonElement;
        if (button) submitButtonRef.current = button;
      }, 100);
      return () => {
        clearTimeout(timer);
        submitButtonRef.current = null;
      };
    }
  }, [currentCategory, isReviewing]);

  const handlePrevious = () => {
    if (isReviewing) {
      setIsReviewing(false);
      return;
    }
    if (currentCategoryIndex > 0) setCurrentCategoryIndex(currentCategoryIndex - 1);
  };

  const handleCategoryClick = (index: number) => {
    if (isReviewing) setIsReviewing(false);
    setCurrentCategoryIndex(index);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Hier kun je een echte POST doen
      router.push('/projecten');
      toast.success('Project aanvraag is succesvol ingediend');
    } catch {
      toast.error('Er is een fout opgetreden bij het indienen van de aanvraag');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (formLoading) {
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
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between px-6 pt-6">
              <h1 className="text-2xl font-bold">Project Aanvraag</h1>
            </div>
            <div className="flex flex-1 p-6">
              <div className="mr-8 w-72 flex-shrink-0">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-6 w-1/3" />
                </div>
              </div>
              <div className="flex-1">
                <Skeleton className="h-96 w-full" />
              </div>
            </div>
          </div>
        </SidebarInset>
      </>
    );
  }

  // Error state
  if (formError) {
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
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between px-6 pt-6">
              <h1 className="text-2xl font-bold">Project Aanvraag</h1>
            </div>
            <div className="flex flex-1 p-6">
              <div className="mr-8 w-72 flex-shrink-0">
                <Alert variant="destructive">
                  <AlertTitle>Fout</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              </div>
              <div className="flex-1">
                <Alert variant="destructive">
                  <AlertTitle>Fout</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </SidebarInset>
      </>
    );
  }

  // Main render
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
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between px-6 pt-6">
            <h1 className="text-2xl font-bold">Project Aanvraag</h1>
          </div>
          <div className="flex flex-1 p-6">
            {/* Sidebar links */}
            <div className="mr-8 w-72 flex-shrink-0">
              <div className="flex h-full flex-col space-y-4">
                {categories.map((category: Tab, index: number) => {
                  const isActive = currentCategoryIndex === index && !isReviewing;
                  const isCompleted = completedCategories.includes(category.title);
                  return (
                    <button
                      key={category.title}
                      onClick={() => handleCategoryClick(index)}
                      className={cn(
                        'flex flex-col items-start rounded-lg border p-4 text-left transition-all',
                        isActive ? category.color : 'border-transparent hover:bg-muted/50',
                        isCompleted && !isActive && 'border-l-4 border-l-primary'
                      )}
                    >
                      <div className="mb-1 flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <span
                            className={cn(
                              'mr-3 flex items-center justify-center rounded-full p-1.5',
                              isActive ? '' : 'bg-muted/50'
                            )}
                          >
                            {iconMap[category.icon] || <span />}
                          </span>
                          <span className="font-medium">{category.title}</span>
                        </div>
                        {isCompleted && <span className="h-4 w-4 text-primary">✔️</span>}
                      </div>
                      <p className="pl-9 text-sm text-muted-foreground">{category.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Formulier rechts */}
            <div className="flex-1">
              {isReviewing ? (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-4 text-xl font-semibold">Project Aanvraag Beoordelen</h2>
                    <p className="text-muted-foreground">
                      Controleer alle ingevulde gegevens voordat je de aanvraag indient.
                    </p>
                  </div>
                  {categories.map((category: Tab) => {
                    type SchemaProperty = { title?: string };
                    const schemaProps =
                      (category.schema as { properties?: Record<string, SchemaProperty> })
                        .properties || {};
                    const values = (formData[category.title] as Record<string, unknown>) || {};
                    return (
                      <div key={category.title} className="rounded-lg border p-4">
                        <h3 className="mb-3 text-lg font-medium">{category.title}</h3>
                        <div className="space-y-4">
                          {Object.keys(schemaProps).map(key => (
                            <div key={key}>
                              <div className="mb-1 font-semibold">
                                {schemaProps[key].title || key}
                              </div>
                              <div className="break-words rounded bg-muted p-2">
                                {values[key] == null || values[key] === '' ? (
                                  <span>-</span>
                                ) : (
                                  String(values[key])
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handlePrevious}>
                      Terug
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? 'Bezig met indienen...' : 'Indienen'}
                    </Button>
                  </div>
                </div>
              ) : currentCategory ? (
                <div>
                  <h2 className="mb-6 text-xl font-semibold">{currentCategory.title}</h2>
                  <div className="space-y-6">
                    <div className="form-container">
                      {/* Algemene foutmelding */}
                      {Object.keys(fieldErrors).length > 0 && (
                        <Alert variant="destructive" className="mb-4">
                          <AlertTitle>Fout</AlertTitle>
                          <AlertDescription>
                            Er zijn validatiefouten. Controleer de velden hieronder.
                          </AlertDescription>
                        </Alert>
                      )}
                      <ShadcnForm
                        schema={currentCategory.schema}
                        uiSchema={{
                          ...currentCategory.ui,
                          'ui:submitButtonOptions': { submitText: 'Opslaan en verder' },
                        }}
                        onSubmit={handleFormSubmit}
                        onError={handleFormError}
                        showErrorList={false}
                        serverErrors={fieldErrors}
                      />
                    </div>
                    <div className="mt-8 flex justify-between">
                      {currentCategoryIndex > 0 && (
                        <Button variant="outline" onClick={handlePrevious}>
                          Vorige
                        </Button>
                      )}
                      {currentCategoryIndex === 0 && <div></div>}
                      <Button type="button" onClick={handleNext}>
                        {currentCategoryIndex === categories.length - 1 ? 'Beoordelen' : 'Volgende'}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
