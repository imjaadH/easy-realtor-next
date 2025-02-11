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
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { createClientSchema } from '@/schemas'
import { Types } from '@/types'

import { createClient } from '@/app/(dashboard)/clients/actions'

export type ClientFormSchema = z.infer<typeof createClientSchema>

interface FormProps {
  onFormSubmitted?: () => void
  defaultData?: Types.Clients | undefined
  onSubmit: (e: any) => void
}

const ClientForm: React.FC<FormProps> = ({
  onFormSubmitted,
  defaultData,
  onSubmit,
}) => {
  const form = useForm<ClientFormSchema>({
    resolver: zodResolver(createClientSchema),
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
