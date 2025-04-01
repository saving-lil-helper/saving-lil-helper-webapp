'use client'

import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { dateDefineToDate } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { scRateDataAtom } from '@/stores/demand-deposit-sc-atom'
import { useAtom } from 'jotai'
import { Skeleton } from '@/components/ui/skeleton'

interface ScRateHistoryProps {
  variant?: 'default' | 'simple'
}

const ScRateHistory: React.FC<ScRateHistoryProps> = (props) => {
  const [scRateData] = useAtom(scRateDataAtom)

  return (
    <div
      className={cn(
        'mt-6 flex h-80 w-full flex-col overflow-hidden rounded-md border p-7 lg:h-full',
        props.variant === 'simple' && 'mt-0 border-none p-0'
      )}
    >
      {props.variant !== 'simple' && (
        <h2 className='text-3xl font-bold'>歷史優惠期</h2>
      )}
      <div
        className={cn(
          'mt-5 h-auto flex-1 overflow-auto',
          props.variant === 'simple' && 'mt-1'
        )}
      >
        <Accordion type='single' collapsible className={'h-full w-full'}>
          {scRateData.length <= 0 ? (
            <>
              <Skeleton className='my-2 mt-5 h-10 w-full'></Skeleton>
              <Skeleton className='my-2 h-10 w-full'></Skeleton>
              <Skeleton className='my-2 h-10 w-full'></Skeleton>
              <Skeleton className='my-2 h-10 w-full'></Skeleton>
            </>
          ) : (
            scRateData.toReversed().map((item, index) => (
              <AccordionItem key={index} value={`term-${index}`}>
                <AccordionTrigger>
                  <div className='flex w-full justify-between'>
                    <span className='text-md'>
                      {`${item.promotion_date.year}-${item.promotion_date.month}`}
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
                <AccordionContent
                  asChild
                  className={
                    'text-md flex w-full items-center justify-between font-light'
                  }
                >
                  <span>
                    {`${format(
                      dateDefineToDate(item.phases[0].start_date),
                      'yyyy-MM-dd'
                    )} ~
                    ${format(
                      dateDefineToDate(item.phases.slice(-1)[0].end_date),
                      'yyyy-MM-dd'
                    )}`}
                  </span>
                  <Button variant={'link'}>
                    <Link href={item.source} target='_blank'>
                      源文件(PDF)
                    </Link>
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))
          )}
        </Accordion>
      </div>
    </div>
  )
}

export default ScRateHistory
