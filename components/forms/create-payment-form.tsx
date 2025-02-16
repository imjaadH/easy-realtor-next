'use client'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { createPaymentSchema } from '@/schemas'
import { Types } from '@/types'
import React from 'react'

export type PaymentFormSchema = z.infer<typeof createPaymentSchema>

type FormControlChange = {
  value?: string
  disabled?: boolean
  onChange: (value: string) => void
}
interface FormProps {
  onFormSubmitted?: () => void
  defaultData?: Types.Payment | undefined
  contractPicker: React.ComponentType<FormControlChange>
  onSubmit: (e: any) => void
}

const PaymentForm: React.FC<FormProps> = ({
  defaultData,
  onSubmit,
  contractPicker: ContractPicker,
}) => {
  const form = useForm<PaymentFormSchema>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: { ...defaultData, amount: Number(defaultData?.amount) },
  })

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-3 py-4 '>
          <FormField
            control={form.control}
            name='contractId'
            disabled={Boolean(defaultData?.contractId!) ?? false}
            render={({ field }) => (
              <FormItem className='grid items-center mt-2'>
                <FormLabel>Select Contract</FormLabel>
                <FormControl>
                  <ContractPicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem className='grid items-center mt-2'>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder='$0.00' type={'number'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Save changes</Button>
      </form>
    </Form>
  )
}

export default PaymentForm
