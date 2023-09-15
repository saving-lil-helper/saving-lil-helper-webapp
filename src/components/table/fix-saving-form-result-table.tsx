'use client'

import { useFixSavingForm } from '@/stores/fix-saving-atom'

import { useEffect } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { cellFormatter } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'

type FixSavingType = {
  name: string
  interest: number
  'p&i': number
}

const columns: ColumnDef<FixSavingType>[] = [
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

export function FixSavingResultTable() {
  const { fixSavingResults } = useFixSavingForm()

  return (
    <div className='mt-5 w-full lg:mx-auto lg:mt-0 '>
      <DataTable columns={columns} data={fixSavingResults}></DataTable>
    </div>
  )
}
