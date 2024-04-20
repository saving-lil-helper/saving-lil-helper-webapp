import { type PromotionRateItem } from './index.d'

const baseUrl =
  'https://saving-lil-helper-cf-workers.niskan516-dev.workers.dev/api'

const authToken =
  'WmJX6dA9zTsJJGzKS5grDP2rYsPq35lLFxhbfgfHoX4ptT4p8SF7Lk7EKxqiwisc'

export const getAllPromotionRates = async (): Promise<{
  data: PromotionRateItem[] | null
  ok: boolean
  error: unknown
}> => {
  try {
    const res = await fetch(`${baseUrl}/all_promotion_rates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const { data = [] } = await res.json()

    return {
      data,
      ok: true,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      ok: false,
      error,
    }
  }
}
