'use client'

import { DataTable } from '@/components/ui/data-table'
import { cellFormatter } from '@/lib/utils'
import {
  DemandDepositScColumn,
  useDemandDepositScForm,
} from '@/stores/demand-deposit-sc-atom'
import { ColumnDef } from '@tanstack/react-table'

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
  const { demandDepositScResults } = useDemandDepositScForm()
  const phases = demandDepositScResults?.phases || []

  return (
    <div className='mt-5 w-full space-y-6 lg:mx-auto lg:mt-0'>
      {phases.map((phase, index) => {
        return (
          <section key={index} className=''>
            <h3 className='mb-2 text-lg font-semibold'>
              {`第${phaseNumbers[index]}階段 年利率 (${phase?.rate || 0}%)`}
            </h3>
            <DataTable columns={columns} data={phase?.data || []}></DataTable>
          </section>
        )
      })}
    </div>
  )
}
