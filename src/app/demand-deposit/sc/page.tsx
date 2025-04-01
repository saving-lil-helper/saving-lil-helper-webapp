import DemandDepositFormSc from '@/components/form/demand-deposit-form-sc'
import { DemandDepositScResultTables } from '@/components/table/demand-deposit-result-tables'
import ScRateHistory from '@/app/demand-deposit/sc/ScRateHistory'
import { getLatestPromotionDate } from '@/api'
import { MonthYear } from '@/lib/utils'

export const metadata = {
  title: '渣打高息馬拉松活期存款',
}

export default async function ScPage() {
  const { data } = await getLatestPromotionDate()

  return (
    <div
      id={'demand-deposit-sc'}
      className='flex h-full w-full flex-col items-center py-10 lg:flex-row lg:items-start'
    >
      <div className={'flex h-full w-full flex-col lg:w-1/3'}>
        <DemandDepositFormSc
          latestPromotionDate={data?.promotion_date as MonthYear}
        />
        <div className='hidden lg:block lg:h-96'>
          <ScRateHistory />
        </div>
      </div>
      <div className={'w-full lg:w-2/3 lg:pl-16'}>
        <DemandDepositScResultTables />
      </div>
    </div>
  )
}
