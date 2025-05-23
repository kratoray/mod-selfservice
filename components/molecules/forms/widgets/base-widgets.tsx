import { useState } from 'react';

import { WidgetProps } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { AlertCircle, EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/atoms/button';
import { Checkbox } from '@/components/atoms/checkbox';
import { Combobox, ComboboxOption } from '@/components/atoms/combobox';
import { DatePicker } from '@/components/atoms/date-picker';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { Switch } from '@/components/atoms/switch';
import { Textarea } from '@/components/atoms/textarea';

import { cn } from '@/lib/utils';

// Helper component for displaying error messages
const ErrorMessage = ({ errors }: { errors?: string[] }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="mt-1 flex items-center gap-1 text-sm text-destructive">
      <AlertCircle className="h-3 w-3" />
      <span>{errors[0]}</span>
    </div>
  );
};

// Base widget configurations
export const widgets = {
  TextWidget: (props: WidgetProps) => (
    <div className="space-y-2">
      <Label>{props.schema.title || ''}</Label>
      <Input
        id={props.id}
        value={(props.value as string) || ''}
        onChange={e => props.onChange(e.target.value)}
        className={props.rawErrors && props.rawErrors.length > 0 ? 'border-destructive' : ''}
        placeholder={props.placeholder || ''}
      />
      <ErrorMessage errors={props.rawErrors} />
      {props.schema.description && (
        <p className="text-sm text-muted-foreground">{props.schema.description}</p>
      )}
    </div>
  ),
  email: (props: WidgetProps) => (
    <div className="space-y-2">
      <Label>{props.schema.title || ''}</Label>
      <Input
        type="email"
        id={props.id}
        value={(props.value as string) || ''}
        onChange={e => props.onChange(e.target.value)}
        placeholder={props.placeholder || 'naam@voorbeeld.nl'}
        className={props.rawErrors && props.rawErrors.length > 0 ? 'border-destructive' : ''}
      />
      <ErrorMessage errors={props.rawErrors} />
      {props.schema.description && (
        <p className="text-sm text-muted-foreground">{props.schema.description}</p>
      )}
    </div>
  ),
  PasswordWidget: (props: WidgetProps) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="space-y-2">
        <Label>{props.schema.title || ''}</Label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id={props.id}
            value={(props.value as string) || ''}
            onChange={e => props.onChange(e.target.value)}
            placeholder={props.placeholder || ''}
            className={props.rawErrors && props.rawErrors.length > 0 ? 'border-destructive' : ''}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </Button>
        </div>
        <ErrorMessage errors={props.rawErrors} />
        {props.schema.description && (
          <p className="text-sm text-muted-foreground">{props.schema.description}</p>
        )}
      </div>
    );
  },
  TextareaWidget: (props: WidgetProps) => (
    <div className="space-y-2">
      <Label>{props.schema.title || ''}</Label>
      <Textarea
        id={props.id}
        value={(props.value as string) || ''}
        onChange={e => props.onChange(e.target.value)}
        placeholder={props.placeholder || ''}
        className={props.rawErrors && props.rawErrors.length > 0 ? 'border-destructive' : ''}
      />
      <ErrorMessage errors={props.rawErrors} />
      {props.schema.description && (
        <p className="text-sm text-muted-foreground">{props.schema.description}</p>
      )}
    </div>
  ),
  CheckboxWidget: (props: WidgetProps) => (
    <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
      <Checkbox id={props.id} checked={props.value as boolean} onCheckedChange={props.onChange} />
      <div className="space-y-1 leading-none">
        <Label>{props.schema.title || ''}</Label>
        {props.schema.description && (
          <p className="text-sm text-muted-foreground">{props.schema.description}</p>
        )}
        <ErrorMessage errors={props.rawErrors} />
      </div>
    </div>
  ),
  CheckboxesWidget: (props: WidgetProps) => {
    const { id, value = [], options, onChange, schema } = props;
    const { enumOptions = [] } = options || {};

    const onItemChange = (option: string) => {
      const newValue = (value as string[]).includes(option)
        ? (value as string[]).filter((v: string) => v !== option)
        : [...(value as string[]), option];
      onChange(newValue);
    };

    return (
      <div className="space-y-2">
        <Label>{schema.title || ''}</Label>
        {schema.description && (
          <p className="mb-4 text-sm text-muted-foreground">{schema.description}</p>
        )}
        <div className="space-y-2">
          {enumOptions.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${id}-${option.value}`}
                checked={(value as string[]).includes(option.value)}
                onCheckedChange={() => onItemChange(option.value)}
              />
              <Label className="text-sm font-normal" htmlFor={`${id}-${option.value}`}>
                {option.label || option.value}
              </Label>
            </div>
          ))}
        </div>
        <ErrorMessage errors={props.rawErrors} />
      </div>
    );
  },
  RadioWidget: (props: WidgetProps) => (
    <div className="space-y-2">
      <Label>{props.schema.title || ''}</Label>
      <RadioGroup
        value={props.value as string}
        onValueChange={props.onChange}
        className={cn(
          props.options?.classNames,
          props.rawErrors && props.rawErrors.length > 0 ? 'text-destructive' : ''
        )}
      >
        {props.options?.enumOptions?.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${props.id}-${option.value}`} />
            <Label htmlFor={`${props.id}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <ErrorMessage errors={props.rawErrors} />
      {props.schema.description && (
        <p className="text-sm text-muted-foreground">{props.schema.description}</p>
      )}
    </div>
  ),
  SelectWidget: (props: WidgetProps) => (
    <div className="space-y-2">
      <Label>{props.schema.title || ''}</Label>
      <Select value={(props.value as string) || ''} onValueChange={props.onChange}>
        <SelectTrigger
          className={props.rawErrors && props.rawErrors.length > 0 ? 'border-destructive' : ''}
        >
          <SelectValue placeholder={props.placeholder || 'Selecteer een optie'} />
        </SelectTrigger>
        <SelectContent>
          {(props.options?.enumOptions || []).map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label || option.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ErrorMessage errors={props.rawErrors} />
      {props.schema.description && (
        <p className="text-sm text-muted-foreground">{props.schema.description}</p>
      )}
    </div>
  ),
  switch: (props: WidgetProps) => (
    <div className="mb-4">
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label>{props.schema.title || ''}</Label>
          {props.schema.description && (
            <p className="text-sm text-muted-foreground">{props.schema.description}</p>
          )}
          <ErrorMessage errors={props.rawErrors} />
        </div>
        <Switch id={props.id} checked={props.value as boolean} onCheckedChange={props.onChange} />
      </div>
    </div>
  ),
  ComboboxWidget: (props: WidgetProps) => {
    const { enumOptions = [] } = props.options || {};
    const options: ComboboxOption[] = enumOptions.map(({ value, label }) => ({
      value: value,
      label: label || value,
    }));

    return (
      <div className="space-y-2">
        <Label>{props.schema.title || ''}</Label>
        <Combobox
          options={options}
          value={props.value as string}
          onValueChange={props.onChange}
          placeholder={props.placeholder || 'Selecteer een optie'}
          className={props.rawErrors && props.rawErrors.length > 0 ? 'border-destructive' : ''}
        />
        <ErrorMessage errors={props.rawErrors} />
        {props.schema.description && (
          <p className="text-sm text-muted-foreground">{props.schema.description}</p>
        )}
      </div>
    );
  },
  DateWidget: (props: WidgetProps) => {
    const handleDateChange = (date: Date | undefined) => {
      if (date) {
        props.onChange(date.toISOString().split('T')[0]);
      } else {
        props.onChange(undefined);
      }
    };

    const value = props.value ? new Date(props.value as string) : undefined;

    return (
      <div className="space-y-2">
        <Label>{props.schema.title || ''}</Label>
        <DatePicker
          date={value}
          onSelect={handleDateChange}
          placeholder={props.placeholder || 'Kies een datum'}
          className={props.rawErrors && props.rawErrors.length > 0 ? 'border-destructive' : ''}
        />
        <ErrorMessage errors={props.rawErrors} />
        {props.schema.description && (
          <p className="text-sm text-muted-foreground">{props.schema.description}</p>
        )}
      </div>
    );
  },
};

// Base form configuration
export const formConfig = {
  validator,
  widgets,
  uiSchema: {
    'ui:classNames': 'space-y-6',
  },
};
