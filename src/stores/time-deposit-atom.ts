import { atom, useAtom } from 'jotai'
import { calculateAccruedInterestByMonth } from '@/lib/saving-calculation'
import bigNumber from 'bignumber.js'

const terms = [
  {
    name: '1個月',
    month: 1,
  },
  {
    name: '3個月',
    month: 3,
  },
  {
    name: '6個月',
    month: 6,
  },
  {
    name: '9個月',
    month: 9,
  },
  {
    name: '1年',
    month: 12,
  },
]

export const timeDepositFormAtom = atom({ principal: '', rate: '' })
export const timeDepositResultsAtom = atom((get) => {
  const timeDepositForm = get(timeDepositFormAtom)

  return terms.map((term, idx) => {
    const interest = calculateAccruedInterestByMonth(
      timeDepositForm.principal,
      timeDepositForm.rate,
      term.month
    )

    return {
      ...term,
      interest,
      'p&i':
        bigNumber(timeDepositForm.principal).plus(interest).toNumber() || 0,
    }
  })
})

export const useTimeDepositForm = () => {
  const [timeDepositForm, setTimeDepositForm] = useAtom(timeDepositFormAtom)
  const [timeDepositResults, setTimeDepositResults] = useAtom(
    timeDepositResultsAtom
  )

  return {
    timeDepositForm,
    setTimeDepositForm,
    timeDepositResults,
  }
}
