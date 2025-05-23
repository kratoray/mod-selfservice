'use client';

import { useState } from 'react';

import Link from 'next/link';

import { RJSFSchema, RJSFValidationError, WidgetProps } from '@rjsf/utils';
import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { FormNavigation } from '@/components/molecules/forms/form-navigation';
import { settingsWidgets } from '@/components/molecules/forms/widgets/settings-widgets';
import { ShadcnForm } from '@/components/organisms/forms/shadcn-form';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

const schema: RJSFSchema = {
  type: 'object',
  properties: {
    settings: {
      type: 'array',
      title: 'Docker Settings',
      items: {
        type: 'object',
        required: ['key', 'value'],
        properties: {
          key: {
            type: 'string',
            title: '',
            pattern: '^[A-Z0-9_]+$',
            minLength: 2,
          },
          value: {
            type: 'string',
            title: '',
            minLength: 1,
          },
        },
      },
    },
  },
};

const uiSchema = {
  'ui:submitButtonOptions': {
    submitText: 'Configuratie opslaan',
  },
  'ui:ErrorList': () => null,
  settings: {
    'ui:options': {
      orderable: true,
    },
    items: {
      classNames: 'space-y-4',
      'ui:field': 'ObjectField',
      'ui:options': {
        label: false,
      },
      key: {
        'ui:placeholder': 'PORT',
        'ui:help': 'Must be uppercase letters, numbers, and underscores only',
        'ui:options': {
          errormessage: {
            required: 'Key is required',
            minLength: 'Key must be at least 2 characters',
            pattern: 'Key must be uppercase letters, numbers, and underscores only',
          },
        },
      },
      value: {
        'ui:placeholder': '3000',
        'ui:options': {
          errormessage: {
            required: 'Value is required',
            minLength: 'Value cannot be empty',
          },
        },
      },
    },
  },
};

// Custom form wrapper to handle error styling
/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
const CustomForm = (props: {
  schema: RJSFSchema;
  uiSchema?: Record<string, unknown>;
  showErrorList?: false | 'top' | 'bottom';
  onSubmit: (data: Record<string, unknown>) => void;
  onError: (errors: RJSFValidationError[]) => void;
  widgets?: Record<string, React.ComponentType<WidgetProps>>;
}) => {
  return (
    <div className="[&_.error-detail]:text-sm [&_.error-detail]:text-destructive">
      <ShadcnForm {...props} />
    </div>
  );
};
/* eslint-enable @typescript-eslint/no-unused-vars, no-unused-vars */

export default function EnvPropertiesPage() {
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const handleSubmit = (formData: Record<string, unknown>) => {
    setFormData(formData);
    // Uncomment for debugging purposes only
    // console.log('Form submitted:', formData);
  };

  // Aangepaste handleError functie die geen ongebruikte parameters heeft
  const handleError = () => {
    // Vereenvoudigde implementatie om linter issues te voorkomen
  };

  // Trigger form submission directly through the form in DOM
  const handleSaveClick = () => {
    // Find the form and submit it
    const form = document.querySelector('.form-container form') as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  // Nav items voor deze form
  const formNavItems = [
    {
      title: 'Docker Configuration',
      sections: ['settings'],
    },
  ];

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
          <FormNavigation items={formNavItems} />
          <div className="rounded-xl border bg-card text-card-foreground">
            <div className="p-8">
              <div className="mx-auto max-w-2xl space-y-8">
                <div className="space-y-0.5">
                  <h2 className="text-2xl font-bold tracking-tight">Docker Configuration</h2>
                  <p className="text-muted-foreground">
                    Configure your Docker container settings. Click the plus button to add new
                    properties.
                  </p>
                </div>
                <div className="form-container">
                  <CustomForm
                    schema={schema}
                    uiSchema={{
                      ...uiSchema,
                      'ui:submitButtonOptions': {
                        norender: true,
                      },
                    }}
                    widgets={settingsWidgets}
                    onSubmit={handleSubmit}
                    onError={handleError}
                    showErrorList={false}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSaveClick} variant="default">
                    Configuratie opslaan
                  </Button>
                </div>
                {formData && Object.keys(formData).length > 0 && (
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Form Submitted!</AlertTitle>
                    <AlertDescription>
                      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
                      </pre>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold">RJSF Environment Properties Component</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Schema Definitie</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`const schema: RJSFSchema = {
  type: "object",
  properties: {
    settings: {
      type: "array",
      title: "Docker Settings",
      items: {
        type: "object",
        required: ["key", "value"],
        properties: {
          key: {
            type: "string",
            title: "",
            pattern: "^[A-Z0-9_]+$",
            minLength: 2
          },
          value: {
            type: "string",
            title: "",
            minLength: 1
          }
        }
      }
    }
  }
};`}</code>
                      </pre>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium">UI Schema Definitie</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`const uiSchema = {
  "ui:submitButtonOptions": {
    submitText: "Configuratie opslaan"
  },
  "ui:ErrorList": () => null,
  settings: {
    "ui:options": {
      orderable: true
    },
    items: {
      "ui:field": "ObjectField",
      "ui:options": {
        label: false
      },
      key: {
        "ui:placeholder": "PORT",
        "ui:help": "Must be uppercase letters, numbers, and underscores only",
        "ui:options": {
          errormessage: {
            required: "Key is required",
            minLength: "Key must be at least 2 characters",
            pattern: "Key must be uppercase letters, numbers, and underscores only"
          }
        }
      },
      value: {
        "ui:placeholder": "3000",
        "ui:options": {
          errormessage: {
            required: "Value is required",
            minLength: "Value cannot be empty"
          }
        }
      }
    }
  }
};`}</code>
                      </pre>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium">Basis Gebruik</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`import { ShadcnForm } from "@/components/organisms/forms/shadcn-form";
import { settingsWidgets } from "@/components/molecules/forms/widgets/settings-widgets";

// Custom Form component voor error styling
const CustomForm = (props: {
  schema: RJSFSchema;
  uiSchema?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void;
  onError: (errors: RJSFValidationError[]) => void;
  widgets?: Record<string, React.ComponentType<WidgetProps>>;
  showErrorList?: false | 'top' | 'bottom';
}) => {
  return (
    <div className="[&_.error-detail]:text-destructive [&_.error-detail]:text-sm">
      <ShadcnForm {...props} />
    </div>
  );
};

// In uw component:
<CustomForm
  schema={schema}
  uiSchema={uiSchema}
  widgets={settingsWidgets}
  onSubmit={handleSubmit}
  onError={handleError}
  showErrorList={false}
/>`}</code>
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
