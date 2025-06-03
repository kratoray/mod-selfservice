'use client';

import { useState } from 'react';

import Link from 'next/link';

import { RJSFSchema } from '@rjsf/utils';

import { Button } from '@/components/atoms/button';
import { Checkbox } from '@/components/atoms/checkbox';
import { Combobox } from '@/components/atoms/combobox';
import { DatePicker } from '@/components/atoms/date-picker';
import { Input } from '@/components/atoms/input';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { Separator } from '@/components/atoms/separator';
import { Switch } from '@/components/atoms/switch';
import { Textarea } from '@/components/atoms/textarea';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { Form, FormField } from '@/components/molecules/forms';
import { ShadcnForm } from '@/components/organisms/forms/shadcn-form';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

export default function FormExamplesPage() {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [date, setDate] = useState<Date>();
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  // Simuleer backend validatie
  const handleSubmit = (data: Record<string, unknown>) => {
    // Reset errors
    setFormErrors({});
    // Simuleer een backend response met veldfouten
    const errors: Record<string, string[]> = {};
    if (!data.name || typeof data.name !== 'string' || data.name.length < 2) {
      errors.name = ['Naam is verplicht', 'Naam moet minimaal 2 tekens zijn'];
    }
    if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
      errors.email = ['E-mailadres is verplicht', 'E-mailadres is ongeldig'];
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormData(data);
  };

  // Options for select and combobox
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
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
        <div className="flex flex-1 flex-col gap-6 overflow-auto p-6">
          <div className="rounded-xl border bg-card text-card-foreground">
            <div className="p-8">
              <div className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-0.5">
                  <h2 className="text-2xl font-bold tracking-tight">Formuliercomponenten</h2>
                  <p className="text-muted-foreground">
                    Voorbeelden van formuliercomponenten en complete formulieren.
                  </p>
                </div>

                {/* Individual Form Components */}
                <section className="mb-12">
                  <h2 className="mb-6 text-xl font-semibold">Individuele Formuliercomponenten</h2>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-6 rounded-lg border p-6">
                      <FormField label="Tekstveld" description="Basis tekstinvoercomponent">
                        <Input placeholder="Voer tekst in" name="text-input" />
                      </FormField>

                      <FormField label="E-mailveld" description="E-mailinvoer met validatie">
                        <Input type="email" placeholder="email@voorbeeld.nl" name="email-input" />
                      </FormField>

                      <FormField
                        label="Wachtwoordveld"
                        description="Wachtwoordinvoer met maskering"
                      >
                        <Input
                          type="password"
                          placeholder="Voer wachtwoord in"
                          name="password-input"
                        />
                      </FormField>

                      <FormField label="Tekstvak" description="Tekstinvoer met meerdere regels">
                        <Textarea placeholder="Voer langere tekst in..." name="textarea" />
                      </FormField>
                    </div>

                    <div className="space-y-6 rounded-lg border p-6">
                      <FormField label="Selectievakje" description="Enkel selectievakje component">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" name="terms" />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Accepteer algemene voorwaarden
                          </label>
                        </div>
                      </FormField>

                      <FormField label="Keuzerondje" description="Meerkeuze selectie">
                        <RadioGroup defaultValue="option1" name="radio-group">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option1" id="option1" />
                            <label htmlFor="option1">Optie 1</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option2" id="option2" />
                            <label htmlFor="option2">Optie 2</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option3" id="option3" />
                            <label htmlFor="option3">Optie 3</label>
                          </div>
                        </RadioGroup>
                      </FormField>

                      <FormField label="Selectiemenu" description="Dropdownselectie">
                        <Select name="select">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer een optie" />
                          </SelectTrigger>
                          <SelectContent>
                            {options.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField label="Schakelaar" description="Aan/uit-component">
                        <div className="flex items-center space-x-2">
                          <Switch id="airplane-mode" name="airplane-mode" />
                          <label
                            htmlFor="airplane-mode"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Vliegtuigmodus
                          </label>
                        </div>
                      </FormField>
                    </div>

                    <div className="space-y-6 rounded-lg border p-6">
                      <FormField label="Datumkiezer" description="Selecteer een datum">
                        <DatePicker date={date} onSelect={setDate} />
                      </FormField>

                      <FormField label="Combinatievak" description="Doorzoekbare dropdown">
                        <Combobox options={options} placeholder="Selecteer een optie" />
                      </FormField>
                    </div>
                  </div>
                </section>

                <Separator className="my-10" />

                {/* Complete Form Example */}
                <section className="mb-12">
                  <h2 className="mb-6 text-xl font-semibold">Volledig Formuliervoorbeeld</h2>
                  <div className="rounded-lg border p-6">
                    <Form onSubmit={handleSubmit} errors={formErrors} className="space-y-8">
                      <FormField label="Volledige naam" name="name" required>
                        <Input placeholder="Jan Jansen" name="name" />
                      </FormField>

                      <FormField label="E-mailadres" name="email" required>
                        <Input type="email" placeholder="jan@voorbeeld.nl" name="email" />
                      </FormField>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField label="Geboortedatum" name="date_of_birth">
                          <DatePicker
                            date={date}
                            onSelect={setDate}
                            placeholder="Selecteer datum"
                          />
                        </FormField>

                        <FormField label="Land" name="country">
                          <Select name="country">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecteer een land" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">Verenigde Staten</SelectItem>
                              <SelectItem value="uk">Verenigd Koninkrijk</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="nl">Nederland</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormField>
                      </div>

                      <FormField label="Biografie" name="bio">
                        <Textarea placeholder="Vertel ons over jezelf..." name="bio" />
                      </FormField>

                      <FormField label="Voorkeuren" name="newsletter">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="newsletter" name="newsletter" />
                            <label htmlFor="newsletter">Abonneer op nieuwsbrief</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="marketing" name="marketing" />
                            <label htmlFor="marketing">Ontvang marketing e-mails</label>
                          </div>
                        </div>
                      </FormField>

                      <Button type="submit">Formulier versturen</Button>
                    </Form>

                    {Object.keys(formData).length > 0 && (
                      <div className="mt-8 rounded-md bg-muted p-4">
                        <h3 className="mb-2 font-medium">Formulier Verzendgegevens:</h3>
                        <pre className="whitespace-pre-wrap text-sm">
                          {JSON.stringify(formData, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </section>

                <Separator className="my-10" />

                {/* React JSON Schema Form Example */}
                <section>
                  <h2 className="mb-6 text-xl font-semibold">JSON Schema Formuliervoorbeeld</h2>
                  <div className="rounded-lg border p-6">
                    <ShadcnForm schema={schemaExample} onSubmit={handleSubmit} />
                  </div>
                </section>

                <Separator className="my-10" />

                {/* Base Usage Examples */}
                <section>
                  <h2 className="mb-4 text-2xl font-bold">Formuliercomponenten Basis Gebruik</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Input Component</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`import { Input } from '@/components/atoms/input';

<Input placeholder="Basic input" />
<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password" />
<Input disabled placeholder="Disabled input" />`}</code>
                      </pre>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium">Select Component</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/atoms/select';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selecteer een optie" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="optie1">Optie 1</SelectItem>
    <SelectItem value="optie2">Optie 2</SelectItem>
    <SelectItem value="optie3">Optie 3</SelectItem>
  </SelectContent>
</Select>`}</code>
                      </pre>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium">Checkbox & RadioGroup</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`import { Checkbox } from '@/components/atoms/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group';

// Checkbox
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms</label>
</div>

// RadioGroup
<RadioGroup defaultValue="optie1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="optie1" id="optie1" />
    <label htmlFor="optie1">Optie 1</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="optie2" id="optie2" />
    <label htmlFor="optie2">Optie 2</label>
  </div>
</RadioGroup>`}</code>
                      </pre>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium">Complete Form met FormField</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Form, FormField } from '@/components/molecules/forms';

<Form onSubmit={handleSubmit} className="space-y-4">
  <FormField
    label="Naam"
    required
    description="Voer uw volledige naam in"
  >
    <Input placeholder="John Doe" name="name" />
  </FormField>

  <FormField
    label="Email"
    required
    description="Uw email adres"
  >
    <Input type="email" placeholder="john@example.com" name="email" />
  </FormField>

  <Button type="submit">Verzenden</Button>
</Form>`}</code>
                      </pre>
                    </div>
                  </div>
                </section>

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

// JSON Schema example
const schemaExample: RJSFSchema = {
  type: 'object',
  required: ['name', 'email'],
  properties: {
    name: {
      type: 'string',
      title: 'Full Name',
      description: 'Enter your full name',
    },
    email: {
      type: 'string',
      title: 'Email',
      format: 'email',
      description: 'Enter your email address',
    },
    date_of_birth: {
      type: 'string',
      title: 'Date of Birth',
      format: 'date',
      description: 'Select your date of birth',
    },
    phone: {
      type: 'string',
      title: 'Phone Number',
      description: 'Enter your phone number',
    },
    preferences: {
      type: 'object',
      title: 'Preferences',
      properties: {
        theme: {
          type: 'string',
          title: 'Theme',
          enum: ['light', 'dark', 'system'],
          description: 'Select your preferred theme',
        },
        notifications: {
          type: 'boolean',
          title: 'Enable Notifications',
          description: 'Receive notifications about updates',
        },
      },
    },
  },
};
