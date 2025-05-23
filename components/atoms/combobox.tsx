/* eslint-disable no-unused-vars */
import * as React from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/atoms/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/atoms/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover';

import { cn } from '@/lib/utils';

export interface ComboboxOption {
  /* eslint-disable-next-line no-unused-vars */
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  /* eslint-disable-next-line no-unused-vars */
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

export function Combobox({
  options,
  /* eslint-disable-next-line no-unused-vars */
  value,
  onValueChange,
  placeholder = 'Selecteer een optie',
  emptyMessage = 'Geen opties gevonden.',
  className,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
          disabled={disabled}
        >
          {value ? options.find(option => option.value === value)?.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {options.map(option => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  onValueChange?.(option.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
