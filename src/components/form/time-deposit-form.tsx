'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
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
import { useTimeDepositForm } from '@/stores/time-deposit-atom'

const timeDepositFormSchema = z.object({
  principal: z.string().min(5, { message: '本金必須大於10000' }), // 本金
  rate: z.string().min(1, { message: '年利率必須大於1' }), // 年利率
  // term: z.number(), // 存款期
})

const defaultFormValues = {
  principal: '',
  rate: '',
  // term: 0,
}

type TimeDepositFormType = z.infer<typeof timeDepositFormSchema>
export function TimeDepositForm() {
  const form = useForm<TimeDepositFormType>({
    resolver: zodResolver(timeDepositFormSchema),
    defaultValues: defaultFormValues,
  })

  const { setTimeDepositForm } = useTimeDepositForm()

  function onSubmit(data: TimeDepositFormType) {
    setTimeDepositForm(form.getValues())
  }

  function onReset() {
    form.reset(defaultFormValues)
    setTimeDepositForm(defaultFormValues)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-6 rounded-md border p-7 '
      >
        <h2 className={'text-3xl font-bold'}>定期存款</h2>
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
              {/*<FormDescription>本金必須大於10000</FormDescription>*/}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rate'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'text-lg'}>年利率(%)</FormLabel>
              <FormControl>
                <Input
                  className={'text-md'}
                  type='number'
                  placeholder='0'
                  inputMode={'decimal'}
                  {...field}
                />
              </FormControl>
              {/*<FormDescription>本金必須大於10000</FormDescription>*/}
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
