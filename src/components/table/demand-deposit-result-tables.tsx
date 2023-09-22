'use client'

import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cellFormatter } from '@/lib/utils'
import {
  DemandDepositScColumn,
  useDemandDepositScForm,
} from '@/stores/demand-deposit-sc-atom'
import { ColumnDef } from '@tanstack/react-table'
import { differenceInCalendarDays, format } from 'date-fns'
import bigNumber from 'bignumber.js'

const columns: ColumnDef<DemandDepositScColumn>[] = [
  {
    header: '存入日期',
    accessorKey: 'date',
  },
  {
    header: '利息(元)',
    accessorKey: 'interest',
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

const phaseNumbers = [
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
]

export function DemandDepositScResultTables() {
  const { demandDepositScResults, demandDepositScForm } =
    useDemandDepositScForm()
  const phases = demandDepositScResults?.phases || []

  return (
    <div className='mt-5 w-full space-y-6 lg:mx-auto lg:mt-0'>
      <div className='flex-col'>
        <div className='text- text-lg font-semibold text-sky-700'>
          <span>總利息(元): </span>
          <span>
            {bigNumber(demandDepositScResults.accInterest).toFormat(3)}
          </span>
        </div>
        <div className='text- text-lg font-semibold text-sky-700'>
          <span>總本息綜和(元): </span>
          <span>
            {bigNumber(demandDepositScForm.principal || 0)
              .plus(demandDepositScResults.accInterest)
              .toFormat(3) || 0}
          </span>
        </div>
      </div>
      <Tabs defaultValue={phaseNumbers[0]} className='flex w-full flex-col'>
        <TabsList className='self-center'>
          {phases.map((_, index) => (
            <TabsTrigger
              key={index}
              value={phaseNumbers[index]}
            >{`第${phaseNumbers[index]}階段`}</TabsTrigger>
          ))}
        </TabsList>
        {phases.map((phase, index) => (
          <TabsContent key={index} value={phaseNumbers[index]}>
            <div className='my-2 space-x-3'>
              <Badge className='text-md font-semibold' color='cyan'>{`年利率 (${
                phase?.rate || 0
              }%)`}</Badge>
              <Badge className='text-md font-semibold'>{`${
                phase.start_date.formatted
              } ~ ${phase.end_date.formatted} (${differenceInCalendarDays(
                new Date(phase.end_date.formatted as string),
                new Date(phase.start_date.formatted as string)
              )}日)`}</Badge>
            </div>
            <div className='mt-2 h-[420px]'>
              <DataTable columns={columns} data={phase?.data || []} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
