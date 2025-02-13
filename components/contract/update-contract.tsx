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
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useMutation, useQueries } from '@tanstack/react-query'
import {
  createClient,
  getClients,
  updateClient,
} from '@/app/(dashboard)/clients/actions'
import { useToast } from '@/hooks/use-toast'
import { Session } from 'next-auth'
import Loader from '../loader'
import { Types } from '@/types'
import ContractForm, { ContractFormSchema } from '../forms/create-contract-form'
import FormSelect from './form-select'
import { getAllAssets } from '@/app/(dashboard)/assets/actions'
import { createContract } from '@/app/(dashboard)/contracts/actions'

type Props = {
  session: Session
  defaultData?: Types.Contract
  defaultOpen: boolean
  trigger: ReactNode
}

const UpdateContract = ({
  session,
  defaultData,
  defaultOpen,
  trigger,
}: Props) => {
  const [sheetOpen, setOpenSheet] = useState(false)
  const { toast } = useToast()

  const [assetsFn, clientsFn] = useQueries({
    queries: [
      {
        queryKey: ['all-assets'],
        queryFn: async () => await getAllAssets(session.user?.id!, 50),
      },
      {
        queryKey: ['all-clients'],
        queryFn: async () => await getClients(session.user?.id!, 50),
      },
    ],
  })
  const mutation = useMutation({
    mutationFn: async (values: ContractFormSchema & { id?: string }) =>
      await createContract({ ...values, createdBy: session.user?.id! }),

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

  async function onSubmit(values: ContractFormSchema) {
    mutation.mutate(values)

    console.log(values)
  }

  useEffect(() => {
    setOpenSheet(prev => !prev)
  }, [defaultOpen])

  const loading = mutation.status === 'pending'

  const clientsData = useMemo(() => {
    return clientsFn.data?.length
      ? clientsFn.data.map(item => ({ label: item.name, value: item.id }))
      : []
  }, [clientsFn.data])

  const assetsData = useMemo(() => {
    return assetsFn.data?.length
      ? assetsFn.data.map(item => ({ label: item.name, value: item.id }))
      : []
  }, [assetsFn.data])

  return (
    <div>
      <Sheet onOpenChange={setOpenSheet} open={sheetOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className='overflow-y-auto'>
          <SheetHeader>
            <SheetTitle>
              {defaultData?.id ? 'Edit contract' : 'Add new contract'}
            </SheetTitle>
            <SheetDescription>
              Create new contract or make changes to existing contract here.
              Click save when you're done.
            </SheetDescription>
          </SheetHeader>

          {mutation.error && (
            <div className='text-red-600'>Could not perform this action..</div>
          )}

          <div className='grid gap-4 py-4'>
            <ContractForm
              propertyPicker={props => (
                <FormSelect items={assetsData} formProps={props} />
              )}
              clientPicker={props => (
                <FormSelect items={clientsData} formProps={props} />
              )}
              onSubmit={onSubmit}
            />
            {loading && <Loader />}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default UpdateContract
