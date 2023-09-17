'use client'

import { useTimeDepositForm } from '@/stores/time-deposit-atom'

import { useEffect } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { cellFormatter } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'

type TimeDepositType = {
  name: string
  interest: number
  'p&i': number
}

const columns: ColumnDef<TimeDepositType>[] = [
  {
    header: '存款期',
    accessorKey: 'name',
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

export function TimeDepositResultTable() {
  const { timeDepositResults } = useTimeDepositForm()

  return (
    <div className='mt-5 w-full lg:mx-auto lg:mt-0 '>
      <DataTable columns={columns} data={timeDepositResults}></DataTable>
    </div>
  )
}
