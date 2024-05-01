import {
  GetLatestPromotionDateResponse,
  GetAllPromotionRatesResponse,
} from './index.d'

const baseUrl = 'https://saving-lil-helper.niskan516dev.com/api'

const authToken =
  'WmJX6dA9zTsJJGzKS5grDP2rYsPq35lLFxhbfgfHoX4ptT4p8SF7Lk7EKxqiwisc'

const headerOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  },
}

export const getLatestPromotionDate =
  async (): Promise<GetLatestPromotionDateResponse> => {
    try {
      const res = await fetch(`${baseUrl}/latest_promotion_date`, {
        ...headerOptions,
        cache: 'no-cache',
      })

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }

      const { data, ok } = await res.json()

      return {
        data,
        ok,
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

export const getAllPromotionRates =
  async (): Promise<GetAllPromotionRatesResponse> => {
    try {
      const res = await fetch(`${baseUrl}/all_promotion_rates`, headerOptions)

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
