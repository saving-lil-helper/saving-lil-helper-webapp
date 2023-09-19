import { set } from 'date-fns'
import { atom, useAtom } from 'jotai'
import useSWR from 'swr'

export type GetScRateListParams = {
  principal: string
  start_date: Date
}

export const demandDepositScFormAtom = atom({
  principal: '',
  startDate: new Date(),
})

export const demandDepositScResultsAtom = atom((get) => {
  const formData = get(demandDepositScFormAtom)

  return []
})

export const useDemandDepositScForm = () => {
  const [demandDepositScForm, setDemandDepositScForm] = useAtom(
    demandDepositScFormAtom
  )

  async function calcDemandDepositSc({
    principal,
    start_date,
  }: GetScRateListParams) {
    setDemandDepositScForm({ principal, startDate: start_date })
  }

  return {
    demandDepositScForm,
    setDemandDepositScForm,
    calcDemandDepositSc,
  }
}
