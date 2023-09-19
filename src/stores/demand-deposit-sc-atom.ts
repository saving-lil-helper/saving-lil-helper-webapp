import { set } from 'date-fns'
import { atom, useAtom } from 'jotai'
import scRateData from '@/app/data/sc-rate.json'

export type GetScRateListParams = {
  principal: string
  start_date: Date
}

export type DemandDepositScColumn = {
  date: string
  interest: number
  'p&i': number
}

type Promotion =
  | {
      promotion_date: {
        month: number
        year: number
      }
      phases: {
        start_date: {
          day: number
          month: number
          year: number
        }
        end_date: {
          day: number
          month: number
          year: number
        }
        rate: number
        data?: DemandDepositScColumn[]
      }[]
    }
  | undefined

export const demandDepositScFormAtom = atom({
  principal: '',
  start_date: new Date(),
})

export const demandDepositScResultsAtom = atom<Promotion>((get) => {
  const principal = get(demandDepositScFormAtom).principal
  const year = get(demandDepositScFormAtom).start_date.getFullYear()
  const month = get(demandDepositScFormAtom).start_date.getMonth() + 1
  const day = get(demandDepositScFormAtom).start_date.getDate()

  const scRateListRecord = scRateData.data.find(
    (item) =>
      item.promotion_date.year === year && item.promotion_date.month === month
  )

  return scRateListRecord
})

export const useDemandDepositScForm = () => {
  const [demandDepositScForm, setDemandDepositScForm] = useAtom(
    demandDepositScFormAtom
  )

  const [demandDepositScResults, setDemandDepositScResults] = useAtom(
    demandDepositScResultsAtom
  )

  return {
    demandDepositScForm,
    setDemandDepositScForm,
    demandDepositScResults,
  }
}
