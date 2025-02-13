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
import { createContractSchema } from '@/schemas'
import { Types } from '@/types'
import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Banknote, CalendarIcon, Currency } from 'lucide-react'
import { Calendar } from '../ui/calendar'

export type ContractFormSchema = z.infer<typeof createContractSchema>

type FormControlChange = {
  value?: string
  onChange: (value: string) => void
}
interface FormProps {
  onFormSubmitted?: () => void
  defaultData?: Types.Clients | undefined
  propertyPicker: React.ComponentType<FormControlChange>
  clientPicker: React.ComponentType<FormControlChange>
  onSubmit: (e: any) => void
}

const ContractForm: React.FC<FormProps> = ({
  defaultData,
  onSubmit,
  propertyPicker: PropertyPicker,
  clientPicker: ClientPicker,
}) => {
  const form = useForm<ContractFormSchema>({
    resolver: zodResolver(createContractSchema),
    defaultValues: {
      startDate: new Date(),
    },
  })

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-3 py-4 '>
          <FormField
            control={form.control}
            name='propertyId'
            render={({ field }) => (
              <FormItem className='grid items-center mt-2'>
                <FormLabel>Select property</FormLabel>
                <FormControl>
                  <PropertyPicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='clientId'
            render={({ field }) => (
              <FormItem className='grid items-center mt-2'>
                <FormLabel>Select client</FormLabel>
                <FormControl>
                  <ClientPicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem className='grid items-center mt-2'>
                <FormLabel>Start date of contract</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          ' pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem className='grid items-center mt-2'>
                <FormLabel>When this contract ends</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          ' pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={date => date <= form.getValues('startDate')}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='grid items-center mt-2'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='short details, terms & conditions maybe'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='costPerMonth'
            render={({ field }) => (
              <FormItem className='grid items-center mt-2'>
                <FormLabel>Contract charges</FormLabel>
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

export default ContractForm
