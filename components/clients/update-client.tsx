'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '../ui/button'
import ClientForm, { ClientFormSchema } from '../forms/create-client-form'
import { ReactNode, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createClient, updateClient } from '@/app/(dashboard)/clients/actions'
import { useToast } from '@/hooks/use-toast'
import { Session } from 'next-auth'
import Loader from '../loader'
import { Types } from '@/types'

type Props = {
  session: Session
  defaultData?: Types.Clients
  defaultOpen: boolean
  trigger: ReactNode
}

const UpdateClient = ({
  session,
  defaultData,
  defaultOpen,
  trigger,
}: Props) => {
  const [sheetOpen, setOpenSheet] = useState(false)
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: async (values: ClientFormSchema & { id?: string }) =>
      defaultData
        ? await updateClient({ ...values }, defaultData.id)
        : await createClient({ ...values, manager: session.user?.id }),

    onSuccess(data) {
      if (data.type == 'success') {
        setOpenSheet(prev => !prev)
      } else {
        toast({
          variant: 'destructive',
          title: data.error,
        })
      }
    },
  })

  async function onSubmit(values: ClientFormSchema) {
    mutation.mutate(values)
  }

  useEffect(() => {
    setOpenSheet(prev => !prev)
  }, [defaultOpen])

  const loading = mutation.status === 'pending'

  return (
    <div>
      <Sheet onOpenChange={setOpenSheet} open={sheetOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {defaultData?.contact ? 'Edit client' : 'Add new client'}
            </SheetTitle>
            <SheetDescription>
              Make changes to your client here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          {mutation.error && (
            <div className='text-red-600'>Could not perform this action..</div>
          )}
          <div className='grid gap-4 py-4'>
            <ClientForm defaultData={defaultData} onSubmit={onSubmit} />
            {loading && <Loader />}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default UpdateClient
