import { WidgetProps } from '@rjsf/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/atoms/button';
import { Label } from '@/components/atoms/label';
import { Card } from '@/components/molecules/card';
import { Calendar } from '@/components/organisms/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/organisms/popover';

import { cn } from '@/lib/utils';

interface ThemeItemProps {
  theme: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

const ThemeItem = ({ theme, label, selected, onSelect }: ThemeItemProps) => {
  return (
    <div className="space-y-2">
      <Card
        className={cn(
          'relative aspect-[1.1/1] cursor-pointer rounded-lg p-2 hover:border-primary',
          selected && 'border-2 border-primary'
        )}
        onClick={onSelect}
      >
        <div
          className={cn(
            'flex h-full flex-col items-center justify-between rounded-md p-4',
            theme === 'dark' ? 'bg-zinc-950' : 'border border-zinc-200 bg-white'
          )}
        >
          <div className="w-full space-y-2">
            <div
              className={cn(
                'h-2 w-[80%] rounded-lg',
                theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'
              )}
            />
            <div
              className={cn(
                'h-2 w-[60%] rounded-lg',
                theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'
              )}
            />
          </div>
          <div className="w-full space-y-2">
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  'h-4 w-4 rounded-full',
                  theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'
                )}
              />
              <div
                className={cn(
                  'h-2 w-[60%] rounded-lg',
                  theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'
                )}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  'h-4 w-4 rounded-full',
                  theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'
                )}
              />
              <div
                className={cn(
                  'h-2 w-[40%] rounded-lg',
                  theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'
                )}
              />
            </div>
          </div>
        </div>
      </Card>
      <div className="text-center text-sm font-medium">{label}</div>
    </div>
  );
};

interface EnumOption {
  value: string;
  label?: string;
}

export const ThemeWidget = (props: WidgetProps) => {
  const { value, onChange, options, schema } = props;
  const { enumOptions = [] } = options || {};

  return (
    <div className="space-y-4">
      <Label>{schema.title || ''}</Label>
      <div className="grid grid-cols-3 gap-4">
        {enumOptions.map((option: EnumOption) => (
          <ThemeItem
            key={option.value}
            theme={option.value}
            label={option.label || option.value}
            selected={value === option.value}
            onSelect={() => onChange(option.value)}
          />
        ))}
      </div>
      {schema.description && <p className="text-sm text-muted-foreground">{schema.description}</p>}
    </div>
  );
};

export const DateWidget = ({ value, onChange, disabled, readonly }: WidgetProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
          disabled={disabled || readonly}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(new Date(value as string), 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? new Date(value as string) : undefined}
          onSelect={date => onChange(date?.toISOString())}
          disabled={disabled || readonly}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export const settingsWidgets = {
  date: DateWidget,
  theme: ThemeWidget,
};
