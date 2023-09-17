import { TimeDepositForm } from '@/components/form/time-deposit-form'
import { TimeDepositResultTable } from '@/components/table/time-deposit-form-result-table'
import TimeDepositResultCharts from '@/components/charts/time-deposit-result-charts'

export const metadata = {
  title: '主頁',
}

export default function Home() {
  return (
    <div>
      <section
        id={'time-deposit'}
        className='flex h-full w-full flex-col items-center p-5 lg:flex-row lg:items-start'
      >
        <div className={'w-full lg:w-1/3'}>
          <TimeDepositForm />
        </div>
        <div className={'w-full lg:w-2/3 lg:pl-16'}>
          <TimeDepositResultTable />
          <TimeDepositResultCharts />
        </div>
      </section>
    </div>
  )
}
