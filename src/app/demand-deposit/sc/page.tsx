import DemandDepositFormSc from '@/components/form/demand-deposit-form-sc'
import { DemandDepositScResultTables } from '@/components/table/demand-deposit-result-tables'
import ScRateHistory from '@/app/demand-deposit/sc/ScRateHistory'

export const metadata = {
  title: '渣打高息馬拉松活期存款',
}

export default function ScPage() {
  return (
    <div
      id={'demand-deposit-sc'}
      className='flex h-full w-full flex-col items-center py-10 lg:flex-row lg:items-start'
    >
      <div className={'w-full lg:w-1/3'}>
        <DemandDepositFormSc />
        <ScRateHistory />
      </div>
      <div className={'w-full lg:w-2/3 lg:pl-16'}>
        <DemandDepositScResultTables />
      </div>
    </div>
  )
}
