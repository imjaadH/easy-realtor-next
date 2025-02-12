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
import { createClientSchema } from '@/schemas'
import { Types } from '@/types'

export type ClientFormSchema = z.infer<typeof createClientSchema>

interface FormProps {
  onFormSubmitted?: () => void
  defaultData?: Types.Clients | undefined
  onSubmit: (e: any) => void
}

const ClientForm: React.FC<FormProps> = ({ defaultData, onSubmit }) => {
  const form = useForm<ClientFormSchema>({
    resolver: zodResolver(createClientSchema),
    defaultValues: defaultData
      ? {
          contact: defaultData?.contact! ?? '',
          email: defaultData?.email ?? '',
          name: defaultData?.name,
        }
      : undefined,
  })

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid gap-3 py-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Full name</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='full name' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Email</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='name@provider.co' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='contact'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Contact</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='contact' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Save changes</Button>
      </form>
    </Form>
  )
}

export default ClientForm
