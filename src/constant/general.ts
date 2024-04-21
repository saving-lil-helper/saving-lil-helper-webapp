import { z } from 'zod'

export const promotionRateSchema = z.object({
  promotion_date: z.object({
    month: z.number({
      required_error: 'Promotion Month is required',
      invalid_type_error: 'Promotion Month must be a number',
    }),
    year: z
      .number({
        required_error: 'Promotion Year is required',
        invalid_type_error: 'Promotion Year must be a number',
      })
      .min(2024, 'Promotion Year must be start at 2024'),
  }),
  phases: z
    .array(
      z.object(
        {
          start_date: z.object(
            {
              day: z.number({
                required_error: 'Start Day is required',
                invalid_type_error: 'Start Day must be a number',
              }),
              month: z.number({
                required_error: 'Start Month is required',
                invalid_type_error: 'Start Month must be a number',
              }),
              year: z
                .number({
                  required_error: 'Start Year is required',
                  invalid_type_error: 'Start Year must be a number',
                })
                .min(2024, 'Start Year must be start at 2024'),
            },
            {
              required_error: 'Start Date is required',
              invalid_type_error: 'Start Date must be an object',
            }
          ),
          end_date: z.object(
            {
              day: z.number({
                required_error: 'End Day is required',
                invalid_type_error: 'End Day must be a number',
              }),
              month: z.number({
                required_error: 'End Month is required',
                invalid_type_error: 'End Month must be a number',
              }),
              year: z
                .number({
                  required_error: 'End Year is required',
                  invalid_type_error: 'End Year must be a number',
                })
                .min(2024, 'End Year must be start at 2024'),
            },
            {
              required_error: 'End Date is required',
              invalid_type_error: 'End Date must be an object',
            }
          ),
          rate: z
            .number({
              required_error: 'Rate is required',
              invalid_type_error: 'Rate must be a number',
            })
            .positive('Rate must be a positive number'),
        },
        {
          required_error: 'Rate item is required',
          invalid_type_error: 'Rate item must be an object',
        }
      ),
      {
        required_error: 'Phases is required',
        invalid_type_error: 'Phases must be an array',
      }
    )
    .length(3, 'Phases must have 3 items'),
  source: z.string({
    required_error: 'Source PDF Link is required',
    invalid_type_error: 'Source PDF Link must be a string',
  }),
  currency_name: z.enum(['HKD', 'USD'], {
    required_error: 'Currency Name is required',
    invalid_type_error: 'Currency Name must be either HKD or USD',
  }),
})
