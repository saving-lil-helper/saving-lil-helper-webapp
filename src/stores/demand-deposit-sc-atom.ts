import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  isLeapYear,
  set,
} from 'date-fns'
import { atom, useAtom } from 'jotai'
import scRateData from '@/app/data/sc-rate.json'
import { calculateMsaInterestByDays } from '@/lib/saving-calculation'
import bigNumber from 'bignumber.js'

export type GetScRateListParams = {
  principal: string
  start_date: Date
}

export type DemandDepositScColumn = {
  date: string
  interest: number
  'p&i': number
  accInterest: number
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
        phaseAccInterest?: number | string
      }[]
    }
  | undefined

type DemandDepositResultType = {
  totalAccInterest: number
  totalDays: number
  totalAccPrincipal: number
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

  let scRateListRecord = scRateData.data.find(
    (item) =>
      item.promotion_date.year === year && item.promotion_date.month === month
  ) as Promotion

  let totalAccPrincipal = bigNumber(principal).toNumber()
  let totalAccInterest = 0
  let totalDays = 0

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

      let phaseAccInterest: string | number = 0

      totalDays += eachDays.length

      const data = eachDays.map((date, dIdx) => {
        const eachDayInterest = bigNumber(
          calculateMsaInterestByDays(
            totalAccPrincipal,
            phase.rate,
            isLeapYear(date)
          )
        ).toFixed(6)

        totalAccInterest =
          bigNumber(totalAccInterest).plus(eachDayInterest).toNumber() || 0

        phaseAccInterest =
          bigNumber(phaseAccInterest).plus(eachDayInterest).toNumber() || 0

        totalAccPrincipal = bigNumber(totalAccPrincipal)
          .plus(eachDayInterest)
          .toNumber()

        return {
          date: format(date, 'yyyy-MM-dd'),
          interest: bigNumber(eachDayInterest).toNumber(),
          'p&i': totalAccPrincipal,
          accInterest: phaseAccInterest,
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
        phaseAccInterest,
      }
    }),
  }

  return {
    ...scRateListRecord,
    totalAccInterest,
    totalDays,
    totalAccPrincipal,
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
