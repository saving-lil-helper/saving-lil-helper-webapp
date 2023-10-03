'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import scRateData from '@/app/data/sc-rate.json'
import { format } from 'date-fns'

export default function ScRateHistory() {
  return (
    <div className='mt-6 h-72 w-full rounded-md border p-7'>
      <h2 className='text-3xl font-bold'>已記錄歷史推廣息率</h2>
      <ScrollArea className='mt-5'>
        {scRateData.data.map((item, index) => (
          <>
            <div key={index} className='flex justify-between'>
              <span className='text-md'>
                {format(
                  new Date(
                    item.promotion_date.year,
                    item.promotion_date.month - 1
                  ),
                  'yyyy/MM'
                )}
              </span>
              <div className='flex items-center space-x-4 text-sm'>
                {item.phases.map((phase, pIndex) => (
                  <>
                    <div key={pIndex} className='w-8 text-center'>
                      {phase.rate}%
                    </div>
                    {pIndex !== item.phases.length - 1 && (
                      <Separator orientation='vertical' />
                    )}
                  </>
                ))}
              </div>
            </div>
            <Separator className='my-2' />
          </>
        ))}
      </ScrollArea>
    </div>
  )
}
