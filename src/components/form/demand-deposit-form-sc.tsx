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
import { DatePicker } from '../ui/date-picker'

const demandDepositScFormSchema = z.object({
  principal: z.string().min(5, { message: '本金必須大於10000' }), // 本金
  start_date: z.date(), // 存款開始日期
})

const defaultFormValues = {
  principal: '',
  start_date: new Date(),
}

type DemandDepositScFormType = z.infer<typeof demandDepositScFormSchema>

export default function DemandDepositFormSc() {
  const form = useForm<DemandDepositScFormType>({
    resolver: zodResolver(demandDepositScFormSchema),
    defaultValues: defaultFormValues,
  })

  function onSubmit(data: DemandDepositScFormType) {
    // setTimeDepositForm(form.getValues())
  }

  function onReset() {
    form.reset(defaultFormValues)
    // setTimeDepositForm(defaultFormValues)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-6 rounded-md border p-7 '
      >
        <h2 className={'text-3xl font-bold'}>高息馬拉松活期存款</h2>
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
              <FormLabel className={'text-lg'}>存款開始日期</FormLabel>
              <FormControl>
                <DatePicker className={'text-md'} placeholder='0' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className={'space-x-5'}>
          <Button type='submit'>計算</Button>
          <Button type='button' onClick={onReset}>
            重設
          </Button>
        </div>
      </form>
    </Form>
  )
}
