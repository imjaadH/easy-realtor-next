'use client'
import { z } from 'zod'

import { credentialUserSchema } from '@/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { createUser } from '@/app/auth/actions'
import { Button } from '../ui/button'

type FormSchema = z.infer<typeof credentialUserSchema>

const RegisterForm = () => {
  const mutation = useMutation({
    mutationFn: async (values: FormSchema) => await createUser(values),
  })
  const form = useForm<FormSchema>({
    resolver: zodResolver(credentialUserSchema),
    defaultValues: {},
  })
  async function onSubmit(values: FormSchema) {
    //create vehicle
    mutation.mutate(values)
  }
  const loading = mutation.status === 'pending'
  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        {mutation.error && (
          <div className='text-red-600'>Could not perform this action..</div>
        )}
        <div className='grid gap-3 py-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Email</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='email address' type='email' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Password</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='password' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' disabled={loading}>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Save changes
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
