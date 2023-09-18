'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export type DatePickerProps = {
  className?: string
  value?: Date
  onChange: (...event: any[]) => void
  placeholder?: string
}

export function DatePicker({
  value: date,
  onChange,
  className,
  placeholder,
}: DatePickerProps) {
  //   const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'flex w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? (
            format(date, 'PPP')
          ) : (
            <span>{placeholder || '選擇日期'}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' side='bottom'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={onChange}
          initialFocus
          captionLayout='dropdown-buttons'
          fromYear={1960}
          toYear={2030}
          className=''
        />
      </PopoverContent>
    </Popover>
  )
}
