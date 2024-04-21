export type PromotionRateItem = {
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
  }[]
  currency_name: 'HKD' | 'USD'
  source: string
}

export type GetLatestPromotionDateResponse = {
  data: {
    promotion_date: {
      month: number
      year: number
    }
  } | null
  ok: boolean
  error: unknown
}

export type GetAllPromotionRatesResponse = {
  data: PromotionRateItem[] | null
  ok: boolean
  error: unknown
}
