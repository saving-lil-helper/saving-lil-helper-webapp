import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isLeapYear,
} from 'date-fns'
import { atom, useAtom } from 'jotai'
import scRateData from '@/app/data/sc-rate.json'
import {
  calcMsaActualInterestRate,
  calculateMsaInterestByDays,
} from '@/lib/saving-calculation'
import bigNumber from 'bignumber.js'
import { Matcher } from 'react-day-picker'
import { dateDefineToDate } from '@/lib/utils'

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

type DateDefine = {
  day: number
  month: number
  year: number
  formatted?: string
}

type Promotion =
  | {
      promotion_date?: {
        month: number
        year: number
      }
      phases?: {
        start_date: DateDefine
        end_date: DateDefine
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
  termEndDate: Date
  actualInterestRate: number
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
  let daysInNormalYear = 0
  let daysInLeapYear = 0

  const termEndDate = dateDefineToDate(
    scRateListRecord?.phases?.slice(-1)[0].end_date as DateDefine
  )

  let actualInterestRate = 0

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

      daysInNormalYear += eachDays.filter((date) => !isLeapYear(date)).length
      daysInLeapYear += eachDays.filter((date) => isLeapYear(date)).length

      const data = eachDays.map((date) => {
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

      actualInterestRate = calcMsaActualInterestRate(
        principal,
        totalAccInterest,
        daysInNormalYear,
        daysInLeapYear
      )

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
    totalDays: daysInNormalYear + daysInLeapYear,
    totalAccPrincipal,
    termEndDate,
    actualInterestRate,
  }
})

export const useDemandDepositScForm = () => {
  const [demandDepositScForm, setDemandDepositScForm] = useAtom(
    demandDepositScFormAtom
  )

  const [demandDepositScResults] = useAtom(demandDepositScResultsAtom)

  const availableDates: {
    fromDate: DateDefine
    toDate: DateDefine
    isMatchDays: Matcher
  } = {
    fromDate: scRateData.data[0].phases[0].start_date,
    toDate: scRateData.data.slice(-1)[0].phases[0].start_date,
    isMatchDays: (date) => {
      const isBeforeStartDate = isBefore(
        date,
        new Date(
          availableDates.fromDate.year,
          availableDates.fromDate.month - 1,
          availableDates.fromDate.day
        )
      )

      if (isBeforeStartDate) return true

      return isAfter(
        date,
        endOfMonth(
          new Date(availableDates.toDate.year, availableDates.toDate.month - 1)
        )
      )
    },
  }

  return {
    demandDepositScForm,
    setDemandDepositScForm,
    demandDepositScResults,
    availableDates,
  }
}
