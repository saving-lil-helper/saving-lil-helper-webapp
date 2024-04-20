'use client'

import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cellFormatter } from '@/lib/utils'
import {
  DemandDepositScColumn,
  useDemandDepositScForm,
} from '@/stores/demand-deposit-sc-atom'
import { ColumnDef } from '@tanstack/react-table'
import bigNumber from 'bignumber.js'
import { format } from 'date-fns'

const columns: ColumnDef<DemandDepositScColumn>[] = [
  {
    header: '存入日期',
    accessorKey: 'date',
  },
  {
    header: '日利息(元)',
    accessorKey: 'interest',
    cell: ({ getValue }) => (
      <span className={'text-green-700'}>
        {`+${cellFormatter.moneyFormat(getValue())}`}
      </span>
    ),
  },
  {
    header: '累積利息(元)',
    accessorKey: 'accInterest',
    cell: ({ getValue }) => (
      <span className={'text-green-700'}>
        {`+${cellFormatter.moneyFormat(getValue())}`}
      </span>
    ),
  },
  {
    header: '本息總和(元)',
    accessorKey: 'p&i',
    cell: ({ getValue }) => cellFormatter.moneyFormat(getValue()),
  },
]

const phaseNumbers = ['一', '二', '三']

export function DemandDepositScResultTables() {
  const { demandDepositScResults } = useDemandDepositScForm()
  const phases = demandDepositScResults?.phases || []

  const renderPhase = () => {
    if (!phases.length)
      return (
        <>
          <Skeleton className='mt-4 h-[135px] w-full lg:h-[112px]'> </Skeleton>
          <Skeleton className='mt-2 h-[420px] w-full'></Skeleton>
        </>
      )
    return phases.map((phase, index) => (
      <TabsContent key={index} value={phaseNumbers[index]}>
        <Card className='my-2'>
          <CardContent className='p-2'>
            <div className='flex space-x-1 p-1'>
              <p className='text-sm text-muted-foreground'>年利率:</p>
              <p className='text-sm font-medium'>{` ${phase?.rate || 0}%`}</p>
            </div>
            <div className='flex space-x-1 p-1'>
              <p className='text-sm text-muted-foreground'>階段日期:</p>
              <p className='text-sm font-medium'>
                {`${phase.start_date.formatted} ~ ${
                  phase.end_date.formatted
                } (${phase?.data?.length || 0}日)`}
              </p>
            </div>
            <div className='flex space-x-1 p-1'>
              <p className='text-sm text-muted-foreground'>該階段利息:</p>
              <p className='text-sm font-medium'>
                {`${bigNumber(phase?.phaseAccInterest || 0).toFormat(3)}元`}
              </p>
            </div>
          </CardContent>
        </Card>
        <div className='mt-2 h-[420px]'>
          <DataTable columns={columns} data={phase?.data || []} />
        </div>
      </TabsContent>
    ))
  }

  return (
    <div className='mt-5 w-full space-y-6 lg:mx-auto lg:mt-0'>
      <div className='flex-col rounded-lg border p-2'>
        <div className='text-lg font-semibold'>
          <span className='text-muted-foreground'>總利息(元): </span>
          <span>
            {bigNumber(demandDepositScResults.totalAccInterest).toFormat(3)}
          </span>
        </div>
        <div className='text-lg font-semibold'>
          <span className='text-muted-foreground'> 總本息綜和(元): </span>
          <span>
            {bigNumber(demandDepositScResults.totalAccPrincipal || 0).toFormat(
              3
            ) || 0}
          </span>
        </div>
        <div className='text-lg font-semibold'>
          <span className='text-muted-foreground'>實際年利率: </span>
          <span>
            {bigNumber(demandDepositScResults.actualInterestRate || 0).toFormat(
              3
            ) || 0}
            %
          </span>
        </div>
        <div className='text-lg font-semibold'>
          <span className='text-muted-foreground'>總日數: </span>
          <span>{demandDepositScResults.totalDays}</span>
        </div>
        <div className='text-lg font-semibold'>
          <span className='text-muted-foreground'>完結日期: </span>
          <span>
            {format(demandDepositScResults.termEndDate, 'yyyy-MM-dd')}
          </span>
        </div>
      </div>
      <Tabs defaultValue={phaseNumbers[0]} className='flex w-full flex-col'>
        <TabsList className='h-full w-full self-center'>
          {phaseNumbers.map((_, index) => (
            <TabsTrigger
              key={index}
              value={phaseNumbers[index]}
            >{`第${phaseNumbers[index]}階段`}</TabsTrigger>
          ))}
        </TabsList>
        {renderPhase()}
      </Tabs>
    </div>
  )
}
