import DemandDepositFormSc from '@/components/form/demand-deposit-form-sc'

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
      </div>
      <div className={'w-full lg:w-2/3 lg:pl-16'}>
        {/* <ScResultTable /> */}
      </div>
    </div>
  )
}
