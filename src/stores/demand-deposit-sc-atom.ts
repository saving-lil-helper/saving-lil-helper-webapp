import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  set,
} from 'date-fns'
import { atom, useAtom } from 'jotai'
import scRateData from '@/app/data/sc-rate.json'
import { calculateAccruedInterestByDays } from '@/lib/saving-calculation'
import bigNumber from 'bignumber.js'

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
      promotion_date?: {
        month: number
        year: number
      }
      phases?: {
        start_date: {
          day: number
          month: number
          year: number
          formatted?: string
        }
        end_date: {
          day: number
          month: number
          year: number
          formatted?: string
        }
        rate: number
        data?: DemandDepositScColumn[]
      }[]
    }
  | undefined

type DemandDepositResultType = {
  accInterest: number
}

export const demandDepositScFormAtom = atom({
  principal: '',
  start_date: new Date(),
})

export const demandDepositScResultsAtom = atom<
  Promotion & DemandDepositResultType
>((get) => {
  const principal = get(demandDepositScFormAtom).principal
  const year = get(demandDepositScFormAtom).start_date.getFullYear()
  const month = get(demandDepositScFormAtom).start_date.getMonth() + 1
  const day = get(demandDepositScFormAtom).start_date.getDate()

  let scRateListRecord = scRateData.data.find(
    (item) =>
      item.promotion_date.year === year && item.promotion_date.month === month
  ) as Promotion

  let accInterest = 0

  scRateListRecord = {
    ...scRateListRecord,
    phases: scRateListRecord?.phases?.map((phase, pIdx) => {
      const startDate =
        pIdx === 0
          ? get(demandDepositScFormAtom).start_date
          : new Date(
              phase.start_date.year,
              phase.start_date.month - 1,
              phase.start_date.day
            )

      const endDate = new Date(
        phase.end_date.year,
        phase.end_date.month - 1,
        phase.end_date.day
      )

      const eachDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
      })

      console.log('phase', phase)

      const data = eachDays.map((date, dIdx) => {
        const interest = calculateAccruedInterestByDays(
          principal,
          phase.rate,
          differenceInCalendarDays(date, startDate) + 1
        )

        const pNi = bigNumber(principal)
          .plus(interest)
          .plus(accInterest)
          .toNumber()

        if (dIdx === eachDays.length - 1) {
          accInterest = bigNumber(accInterest).plus(interest).toNumber() || 0
        }

        return {
          date: format(date, 'yyyy-MM-dd'),
          interest,
          'p&i': pNi,
        }
      })

      return {
        ...phase,
        start_date: {
          ...phase.start_date,
          formatted: format(startDate, 'yyyy-MM-dd'),
        },
        end_date: {
          ...phase.end_date,
          formatted: format(endDate, 'yyyy-MM-dd'),
        },
        data,
        accInterest,
      }
    }),
  }

  return {
    ...scRateListRecord,
    accInterest,
  }
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
