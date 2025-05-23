/* eslint-disable no-unused-vars */
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/atoms/button';
import { Calendar } from '@/components/atoms/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover';

import { cn } from '@/lib/utils';

export interface DatePickerProps {
  /* eslint-disable-next-line no-unused-vars */
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export function DatePicker({
  /* eslint-disable-next-line no-unused-vars */
  date,
  onSelect,
  disabled = false,
  className,
  placeholder = 'Kies een datum',
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
