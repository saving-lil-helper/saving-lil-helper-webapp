import { atom, useAtom } from 'jotai'
import { calculateFixSavingAccruedInterest } from '@/lib/saving-calculation'
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
    name: '1年',
    month: 12,
  },
]
export const fixSavingFormAtom = atom({ principal: '', rate: '' })
export const fixSavingResultsAtom = atom((get) => {
  const fixSavingForm = get(fixSavingFormAtom)

  return terms.map((term, idx) => {
    const interest = calculateFixSavingAccruedInterest(
      fixSavingForm.principal,
      fixSavingForm.rate,
      term.month
    )

    return {
      ...term,
      interest,
      'p&i': bigNumber(fixSavingForm.principal).plus(interest).toNumber() || 0,
    }
  })
})

export const useFixSavingForm = () => {
  const [fixSavingForm, setFixSavingForm] = useAtom(fixSavingFormAtom)
  const [fixSavingResults, setFixSavingResults] = useAtom(fixSavingResultsAtom)

  return {
    fixSavingForm,
    setFixSavingForm,
    fixSavingResults,
  }
}
