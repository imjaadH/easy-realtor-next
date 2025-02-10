'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormControl,
} from '../ui/form'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '../ui/select'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { createAssetSchema } from '@/schemas'
import { Types } from '@/types'

export type AssetFormSchema = z.infer<typeof createAssetSchema>

interface FormProps {
  defaultData?: Types.Property
  onSubmit: (e: any) => void
}
export const AssetForm: React.FC<FormProps> = ({ defaultData, onSubmit }) => {
  const form = useForm<AssetFormSchema>({
    resolver: zodResolver(createAssetSchema),
    defaultValues: {},
  })

  return (
    <Form {...form}>
      <form className='space-y-4 w-full' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid gap-3 py-4'>
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem className='  items-center gap-4'>
                <FormLabel className='text-xs font-semibold'>
                  Property Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='col-span-3'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(Types.PropertyType).map(item => (
                      <SelectItem key={item} value={item.toString()}>
                        {item.toString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='  items-center gap-4'>
                <FormLabel className='text-xs font-semibold'>
                  Property Name
                </FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='friendly name' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className=' items-center gap-4'>
                <FormLabel className='text-xs font-semibold'>Address</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='short location' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='propertyValue'
            render={({ field }) => (
              <FormItem className=' items-center gap-4'>
                <FormLabel className='text-xs font-semibold'>Value</FormLabel>
                <FormControl className='col-span-3'>
                  <Input
                    type='number'
                    placeholder='$0.00'
                    maxLength={8}
                    {...field}
                  />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem className=' items-center gap-4'>
                <FormLabel className='text-xs font-semibold'>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='col-span-3'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(Types.PropertyStatus).map(item => (
                      <SelectItem key={item} value={item.toString()}>
                        {item.toString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
