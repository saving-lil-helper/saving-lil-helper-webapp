import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cellFormatter = {
  moneyFormat: (cellValue: number | unknown) => {
    if (!cellValue) return 0

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cellValue as number)
  },
}
