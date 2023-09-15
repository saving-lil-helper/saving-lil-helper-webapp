'use client'

import { FixSavingForm } from '@/components/form/fix-saving-form'
import { FixSavingResultTable } from '@/components/table/fix-saving-form-result-table'
import FixSavingResultCharts from '@/components/charts/fix-saving-result-charts'

export default function Home() {
  return (
    <div>
      <section
        id={'fix-saving'}
        className='flex h-full w-full flex-col items-center p-5 lg:flex-row lg:items-start'
      >
        <div className={'w-full lg:w-1/3'}>
          <FixSavingForm />
        </div>
        <div className={'w-full lg:w-2/3 lg:pl-16'}>
          <FixSavingResultTable />
          <FixSavingResultCharts></FixSavingResultCharts>
        </div>
      </section>
    </div>
  )
}
