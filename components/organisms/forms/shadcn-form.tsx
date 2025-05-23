/* eslint-disable no-unused-vars */
import { withTheme } from '@rjsf/core';
import {
  ArrayFieldTemplateProps,
  FieldTemplateProps,
  FormContextType,
  ObjectFieldTemplateProps,
  ErrorListProps as RJSFErrorListProps,
  RJSFSchema,
  RJSFValidationError,
  UiSchema,
  WidgetProps,
} from '@rjsf/utils';
import { AlertCircle, Plus } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import { formConfig } from '@/components/molecules/forms/widgets/base-widgets';

// Create a theme-less form
const ThemelessForm = withTheme({});

interface ShadcnFormProps {
  schema: RJSFSchema;
  uiSchema?: UiSchema;
  /* eslint-disable-next-line no-unused-vars */
  onSubmit?: (data: Record<string, unknown>) => void;
  /* eslint-disable-next-line no-unused-vars */
  onError?: (errors: RJSFValidationError[]) => void;
  widgets?: Record<string, React.ComponentType<WidgetProps>>;
  transformErrors?: (errors: RJSFValidationError[]) => RJSFValidationError[];
  showErrorList?: false | 'top' | 'bottom';
}

const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  return (
    <div className="space-y-4">
      {props.title && <h3 className="text-lg font-medium">{props.title}</h3>}

      {props.items.length > 0 ? (
        <div className="space-y-4">
          {props.items.map(element => (
            <div key={element.key} className="flex items-start gap-4">
              {element.children}
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="mt-2"
                onClick={element.onDropIndexClick(element.index)}
              >
                <span className="sr-only">Remove</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
          <p className="mb-4 text-muted-foreground">No properties added yet</p>
        </div>
      )}

      <Button type="button" variant="outline" onClick={props.onAddClick} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Property
      </Button>
    </div>
  );
};

const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  // Check if this is a key-value pair object (has exactly key and value properties)
  const isKeyValuePair =
    props.properties.length === 2 &&
    props.properties.some(p => p.name === 'key') &&
    props.properties.some(p => p.name === 'value');

  return (
    <div className={isKeyValuePair ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
      {props.properties.map(element => (
        <div key={element.name}>{element.content}</div>
      ))}
    </div>
  );
};

// Custom field template to prevent duplicate titles and show error messages
const FieldTemplate = (props: FieldTemplateProps) => {
  const { classNames, children } = props;

  return <div className={classNames}>{children}</div>;
};

// Use the RJSF ErrorList interface instead of our custom one
const ErrorList = (props: RJSFErrorListProps) => {
  if (!props.errors || props.errors.length === 0) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <div className="ml-2">
          <p className="font-medium">Formulier bevat fouten:</p>
          <ul className="mt-1 list-inside list-disc">
            {props.errors.map((/* eslint-disable-next-line no-unused-vars */ error, i: number) => (
              <li key={i}>{error.message}</li>
            ))}
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  );
};

const templates = {
  ArrayFieldTemplate,
  ObjectFieldTemplate,
  FieldTemplate,
  ErrorListTemplate: ErrorList,
};

// Custom error transformer to improve error messages
const transformErrors = (
  /* eslint-disable-next-line no-unused-vars */ errors: RJSFValidationError[]
) => {
  return errors.map(error => {
    // Check if we have custom error messages in the schema
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { params } = error;

    // Make error messages more user friendly
    if (error.name === 'required') {
      error.message = `Dit veld is verplicht`;
    } else if (error.name === 'minLength' && params && params.limit) {
      error.message = `Minimaal ${params.limit} karakters vereist`;
    }

    return error;
  });
};

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
export function ShadcnForm({
  schema,
  uiSchema,
  onSubmit,
  onError,
  widgets,
  transformErrors: customTransformErrors,
  showErrorList = false,
}: ShadcnFormProps) {
  const handleSubmit = (/* eslint-disable-next-line no-unused-vars */ data: FormContextType) => {
    onSubmit?.(data.formData);
  };

  const handleError = (
    /* eslint-disable-next-line no-unused-vars */ errors: RJSFValidationError[]
  ) => {
    onError?.(errors);
  };

  const config = {
    ...formConfig,
    templates,
    uiSchema: {
      ...formConfig.uiSchema,
      'ui:submitButtonOptions': {
        norender: true,
      },
      ...(uiSchema || {}),
    },
    widgets: {
      ...formConfig.widgets,
      ...(widgets || {}),
    },
  };

  return (
    <div className="space-y-6">
      <ThemelessForm
        schema={schema}
        {...config}
        onSubmit={handleSubmit}
        onError={handleError}
        transformErrors={customTransformErrors || transformErrors}
        showErrorList={showErrorList}
      />
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-unused-vars, no-unused-vars */
