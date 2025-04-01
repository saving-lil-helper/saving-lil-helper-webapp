'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import {
  fetchScRateDataAtom,
  useDemandDepositScForm,
} from '@/stores/demand-deposit-sc-atom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ScRateHistory from '@/app/demand-deposit/sc/ScRateHistory'
import { Info } from 'lucide-react'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { MonthYear } from '@/lib/utils'
import { endOfMonth, isAfter } from 'date-fns'

const demandDepositScFormSchema = z.object({
  principal: z.string().min(5, { message: '本金必須大於10000' }), // 本金
  start_date: z.date(), // 存款開始日期
})

const defaultFormValues = {
  principal: '',
  start_date: new Date(),
}

type DemandDepositScFormType = z.infer<typeof demandDepositScFormSchema>

interface IProps {
  latestPromotionDate: MonthYear
}

const isUpdatedPromotionDate = (
  latestPromotionDate: MonthYear,
  cachedPromotionDate: MonthYear | null
) => {
  if (!cachedPromotionDate) return false
  if (latestPromotionDate.year > cachedPromotionDate.year) return false
  return latestPromotionDate.month <= cachedPromotionDate.month
}

export default function DemandDepositFormSc(props: IProps) {
  const form = useForm<DemandDepositScFormType>({
    resolver: zodResolver(demandDepositScFormSchema),
    defaultValues: defaultFormValues,
  })

  const [_scRateData, fetchScRateData] = useAtom(fetchScRateDataAtom)

  const { setDemandDepositScForm, availableDates, setLatestPromotionDate } =
    useDemandDepositScForm()

  function onSubmit(data: DemandDepositScFormType) {
    setDemandDepositScForm(data)
  }

  function onReset() {
    form.reset(defaultFormValues)
    setDemandDepositScForm(defaultFormValues)
  }

  useEffect(() => {
    if (!props.latestPromotionDate) return

    const latestPromotionDate = localStorage.getItem('latest-promotion-date')

    if (
      !latestPromotionDate ||
      !isUpdatedPromotionDate(
        props.latestPromotionDate,
        JSON.parse(latestPromotionDate)
      )
    ) {
      setLatestPromotionDate(props.latestPromotionDate)
      fetchScRateData()
    }
  }, [props.latestPromotionDate, setLatestPromotionDate, fetchScRateData])

  useEffect(() => {
    if (!props.latestPromotionDate) return

    const endOfLatestPromotionDate = endOfMonth(
      new Date(
        props.latestPromotionDate.year,
        props.latestPromotionDate.month - 1
      )
    )
    if (
      props.latestPromotionDate &&
      isAfter(new Date(), endOfLatestPromotionDate)
    ) {
      form.setValue('start_date', endOfLatestPromotionDate)
    }
  }, [props.latestPromotionDate, form])

  return (
    <Dialog>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='h-[365px] w-full space-y-6  rounded-md border p-7 lg:h-[380px] '
        >
          <h2 className={'relative text-3xl font-bold'}>
            高息馬拉松活期存款
            <DialogTrigger asChild>
              <Button
                className='absolute top-[-2px] lg:hidden'
                size={'icon'}
                variant='ghost'
              >
                <Info />
              </Button>
            </DialogTrigger>
          </h2>
          <FormField
            control={form.control}
            name='principal'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'text-lg'}>本金</FormLabel>
                <FormControl>
                  <Input
                    className={'text-md'}
                    type='number'
                    placeholder='0'
                    inputMode={'decimal'}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='start_date'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg'>存款開始日期</FormLabel>
                <FormControl>
                  <DatePicker
                    className={'text-md'}
                    placeholder='0'
                    {...field}
                    fromYear={availableDates.fromDate.year}
                    toYear={availableDates.toDate.year}
                    disabled={availableDates.isMatchDays}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={'flex space-x-5'}>
            <Button type='submit'>計算</Button>
            <Button type='button' onClick={onReset}>
              重設
            </Button>
          </div>
        </form>
      </Form>
      <DialogContent className='w-[90%] max-w-[450px] !rounded-lg'>
        <DialogHeader>
          <DialogTitle>歷史優惠期</DialogTitle>
        </DialogHeader>
        <ScRateHistory variant='simple' />
      </DialogContent>
    </Dialog>
  )
}
