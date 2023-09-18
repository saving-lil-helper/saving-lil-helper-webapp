import { TimeDepositForm } from '@/components/form/time-deposit-form'
import { TimeDepositResultTable } from '@/components/table/time-deposit-form-result-table'
import TimeDepositResultCharts from '@/components/charts/time-deposit-result-charts'

export const metadata = {
  title: '定期存款',
}

export default function TimeDeposit() {
  return (
    <div
      id={'time-deposit'}
      className='flex h-full w-full flex-col items-center py-10 lg:flex-row lg:items-start'
    >
      <section className={'w-full lg:w-1/3'}>
        <TimeDepositForm />
      </section>
      <section className={'w-full lg:w-2/3 lg:pl-16'}>
        <TimeDepositResultTable />
        <TimeDepositResultCharts />
      </section>
    </div>
  )
}
