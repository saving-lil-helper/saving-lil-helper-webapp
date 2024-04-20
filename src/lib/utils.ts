import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import bigNumber from 'bignumber.js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cellFormatter = {
  moneyFormat: (cellValue: number | unknown) => {
    if (!cellValue) return 0

    return bigNumber(cellValue as number).toFormat(3, {
      prefix: '$',
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: ' ',
      fractionGroupSize: 0,
      suffix: '',
    })
  },
}

type DateDefine = {
  day: number
  month: number
  year: number
  formatted?: string
}

export const dateDefineToDate = (dateDefine: DateDefine) => {
  if (!dateDefine) return new Date()
  return new Date(dateDefine.year, dateDefine.month - 1, dateDefine.day)
}
