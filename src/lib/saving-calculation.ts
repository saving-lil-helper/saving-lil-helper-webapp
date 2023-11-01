import bigNumber from 'bignumber.js'

// 定義一個函數來計算到期實收利息
export function calculateAccruedInterestByMonth(
  principal: string | number,
  interestRateWithPercent: string | number,
  months: number
): number {
  const yearFraction = bigNumber(months).div(12)
  const interestRate = bigNumber(interestRateWithPercent).div(100)

  return (
    bigNumber(principal).times(yearFraction).times(interestRate).toNumber() || 0
  )
}

export function calculateMsaInterestByDays(
  principal: string | number,
  msaRate: string | number,
  isLeapYear?: boolean
): number {
  return bigNumber(principal)
    .div(100)
    .times(msaRate)
    .div(isLeapYear ? 366 : 365)
    .toNumber()
}

export function calcMsaActualInterestRate(
  principal: string | number,
  actualIncome: string | number,
  daysInNormalYear: number,
  daysInLeapYear: number
): number {
  // actualIncome / (principal * (daysInCommonYear / 365 + daysInLeapYear / 366))

  const daysInNormalYearBigNo = bigNumber(daysInNormalYear)
  const daysInLeapYearBigNo = bigNumber(daysInLeapYear)
  const daysPercentage = bigNumber(daysInNormalYearBigNo.div(365)).plus(
    daysInLeapYearBigNo.div(366)
  )

  const numerator = bigNumber(actualIncome)
  const denominator = bigNumber(principal).times(daysPercentage)

  return numerator.div(denominator).times(100).toNumber()
}
