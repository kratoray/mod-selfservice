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

const schema: RJSFSchema = {
  type: 'object',
  required: ['username', 'email'],
  properties: {
    username: {
      type: 'string',
      title: 'Username',
      description: 'This is your public display name.',
    },
    email: {
      type: 'string',
      title: 'Email',
      format: 'email',
      description: 'Enter your email address.',
    },
    password: {
      type: 'string',
      title: 'Password',
      description: 'Enter your password.',
      minLength: 8,
    },
    date_of_birth: {
      type: 'string',
      title: 'Date of birth',
      format: 'date',
      description: 'Pick a date',
    },
    bio: {
      type: 'string',
      title: 'Bio',
      description: 'Tell us a little bit about yourself',
    },
    urls: {
      type: 'object',
      title: 'URLs',
      properties: {
        portfolio: {
          type: 'string',
          title: 'Portfolio',
          format: 'uri',
        },
        github: {
          type: 'string',
          title: 'GitHub',
          format: 'uri',
        },
        linkedin: {
          type: 'string',
          title: 'LinkedIn',
          format: 'uri',
        },
      },
    },
    notifications: {
      type: 'object',
      title: 'Notifications',
      properties: {
        communication_emails: {
          type: 'boolean',
          title: 'Communication emails',
          description: 'Receive emails about your account activity.',
        },
        marketing_emails: {
          type: 'boolean',
          title: 'Marketing emails',
          description: 'Receive emails about new products, features, and more.',
        },
        social_emails: {
          type: 'boolean',
          title: 'Social emails',
          description: 'Receive emails for friend requests, follows, and more.',
        },
        security_emails: {
          type: 'boolean',
          title: 'Security emails',
          description: 'Receive emails about your account security.',
          default: true,
          readOnly: true,
        },
      },
    },
    appearance: {
      type: 'object',
      title: 'Appearance',
      properties: {
        theme: {
          type: 'string',
          title: 'Theme',
          enum: ['light', 'dark', 'system'],
          description: 'Select the theme for the dashboard.',
        },
        font: {
          type: 'string',
          title: 'Font',
          enum: ['inter', 'manrope', 'system'],
          description: 'Select the font for the dashboard.',
        },
      },
    },
    display: {
      type: 'object',
      title: 'Display',
      properties: {
        language: {
          type: 'string',
          title: 'Language',
          enum: ['en', 'de', 'fr', 'es', 'nl'],
          description: 'Select your preferred language.',
        },
        timezone: {
          type: 'string',
          title: 'Timezone',
          enum: ['UTC', 'EST', 'PST', 'GMT'],
          description: 'Select your timezone.',
        },
        date_format: {
          type: 'string',
          title: 'Date format',
          enum: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
          description: 'Select your preferred date format.',
        },
      },
    },
    sidebar: {
      type: 'object',
      title: 'Sidebar',
      description: 'Select the items you want to display in the sidebar.',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['recents', 'home', 'applications', 'desktop', 'downloads', 'documents'],
          },
          uniqueItems: true,
        },
      },
    },
  },
};

const uiSchema = {
  'ui:submitButtonOptions': {
    submitText: 'Instellingen opslaan',
  },
  'ui:globalOptions': {
    label: false,
    description: false,
  },
  email: {
    'ui:widget': 'email',
  },
  password: {
    'ui:widget': 'password',
  },
  bio: {
    'ui:widget': 'TextareaWidget',
  },
  date_of_birth: {
    'ui:widget': 'date',
  },
  appearance: {
    'ui:title': false,
    theme: {
      'ui:widget': 'theme',
      'ui:options': {
        enumOptions: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'system', label: 'System' },
        ],
      },
    },
    font: {
      'ui:widget': 'SelectWidget',
      'ui:options': {
        enumOptions: [
          { value: 'inter', label: 'Inter' },
          { value: 'manrope', label: 'Manrope' },
          { value: 'system', label: 'System' },
        ],
      },
    },
  },
  display: {
    'ui:title': false,
    language: {
      'ui:widget': 'SelectWidget',
    },
    timezone: {
      'ui:widget': 'SelectWidget',
    },
    date_format: {
      'ui:widget': 'SelectWidget',
    },
  },
  notifications: {
    'ui:title': false,
    'ui:classNames': 'space-y-4',
    communication_emails: {
      'ui:widget': 'switch',
    },
    marketing_emails: {
      'ui:widget': 'switch',
    },
    social_emails: {
      'ui:widget': 'switch',
    },
    security_emails: {
      'ui:widget': 'switch',
    },
  },
  sidebar: {
    'ui:title': false,
    items: {
      'ui:widget': 'CheckboxesWidget',
      'ui:options': {
        inline: false,
        label: false,
        enumOptions: [
          { value: 'recents', label: 'Recents' },
          { value: 'home', label: 'Home' },
          { value: 'applications', label: 'Applications' },
          { value: 'desktop', label: 'Desktop' },
          { value: 'downloads', label: 'Downloads' },
          { value: 'documents', label: 'Documents' },
        ],
      },
    },
  },
};

// Nav items for this form
const formNavItems = [
  {
    title: 'Profile',
    sections: ['username', 'email', 'password', 'date_of_birth', 'bio'],
  },
  {
    title: 'Appearance',
    sections: ['appearance.theme', 'appearance.font'],
  },
  {
    title: 'Display',
    sections: ['display.language', 'display.timezone', 'display.date_format'],
  },
  {
    title: 'Notifications',
    sections: [
      'notifications.communication_emails',
      'notifications.marketing_emails',
      'notifications.social_emails',
      'notifications.security_emails',
    ],
  },
  {
    title: 'Links',
    sections: ['urls.portfolio', 'urls.github', 'urls.linkedin'],
  },
  {
    title: 'Sidebar',
    sections: ['sidebar.items'],
  },
];

export default function StandardFormPage() {
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const handleSubmit = (formData: Record<string, unknown>) => {
    setFormData(formData);
    // Comment out console.log to fix linter warning
    // console.log('Form submitted:', formData);
  };

  // Aangepaste handleError functie die geen ongebruikte parameters heeft
  const handleError = () => {
    // Vereenvoudigde implementatie om linter issues te voorkomen
  };

  const handleSaveClick = () => {
    // Trigger form submit
    document.querySelector('form')?.requestSubmit();
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
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between px-6 pt-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <Button type="button" onClick={handleSaveClick}>
              Save changes
            </Button>
          </div>

          <div className="flex flex-1 p-6">
            <aside className="mr-12 w-64 flex-none">
              <FormNavigation items={formNavItems} />
            </aside>
            <div className="flex-1 space-y-6">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-semibold tracking-tight">Account Settings</h2>
                <p className="text-muted-foreground">
                  Manage your account settings and preferences.
                </p>
              </div>

              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  Dit is een voorbeeld van een formulier met validatie. Deze pagina laat zien hoe je
                  een standaard formulier met JSON schema kunt maken.{' '}
                  <Link href="/voorbeelden/rjsf/env-properties">
                    <Button variant="link" className="inline h-auto p-0">
                      Bekijk ook het voorbeeld met omgevingsvariabelen.
                    </Button>
                  </Link>
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                <CustomForm
                  schema={schema}
                  uiSchema={uiSchema}
                  onSubmit={handleSubmit}
                  onError={handleError}
                  widgets={settingsWidgets}
                  showErrorList="top"
                />
              </div>

              {Object.keys(formData).length > 0 && (
                <div className="rounded-md border p-4">
                  <h3 className="mb-2 font-medium">Submitted data:</h3>
                  <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
