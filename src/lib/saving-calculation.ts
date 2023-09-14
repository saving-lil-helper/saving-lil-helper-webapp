import bigNumber from 'bignumber.js'

// 定義一個函數來計算到期實收利息
export function calculateFixSavingAccruedInterest(
  principal: string,
  interestRateWithPercent: string,
  months: number
): number {
  const yearFraction = bigNumber(months).div(12)
  const interestRate = bigNumber(interestRateWithPercent).div(100)

  return (
    bigNumber(principal).times(yearFraction).times(interestRate).toNumber() || 0
  )
}
