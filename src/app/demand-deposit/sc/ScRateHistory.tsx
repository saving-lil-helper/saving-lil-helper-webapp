'use client'

import { Separator } from '@/components/ui/separator'
import scRateData from '@/app/data/sc-rate.json'
import { format } from 'date-fns'
import { dateDefineToDate } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const descendingHistory = scRateData.data.slice().reverse()

interface ScRateHistoryProps {
  variant?: 'default' | 'simple'
}

const ScRateHistory: React.FC<ScRateHistoryProps> = (props) => {
  return (
    <div
      className={cn(
        'h-78 mt-6 flex w-full flex-col overflow-hidden rounded-md border p-7',
        props.variant === 'simple' && 'mt-0 border-none p-0'
      )}
    >
      {props.variant !== 'simple' && (
        <h2 className='text-3xl font-bold'>歷史優惠期</h2>
      )}
      <div
        className={cn(
          'mt-5 h-auto flex-1 overflow-scroll',
          props.variant === 'simple' && 'mt-1'
        )}
      >
        <Accordion type='single' collapsible className={'h-full w-full'}>
          {descendingHistory.map((item, index) => (
            <AccordionItem key={index} value={`term-${index}`}>
              <AccordionTrigger>
                <div className='flex w-full justify-between'>
                  <span className='text-md'>
                    {`${format(
                      dateDefineToDate(item.phases[0].start_date),
                      'yyyy-MM'
                    )}`}
                  </span>
                  <div className='flex items-center space-x-4 text-sm'>
                    {item.phases.map((phase, pIndex) => (
                      <div key={pIndex} className='flex h-full'>
                        <div className='mr-2 w-8 pl-1 text-center'>
                          {phase.rate}%
                        </div>
                        {pIndex !== item.phases.length - 1 && (
                          <Separator orientation='vertical' />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className={'text-lg'}>
                {`${format(
                  dateDefineToDate(item.phases[0].start_date),
                  'yyyy-MM-dd'
                )} ~
                    ${format(
                      dateDefineToDate(item.phases.slice(-1)[0].end_date),
                      'yyyy-MM-dd'
                    )}`}
              </AccordionContent>
              {/*<Separator className='my-2' />*/}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default ScRateHistory
