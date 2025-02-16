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
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
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
import FormSelect from '../form-select'
import { getAllAssets } from '@/app/(dashboard)/assets/actions'
import {
  createContract,
  editContract,
  getAllContracts,
} from '@/app/(dashboard)/contracts/actions'
import PaymentForm, { PaymentFormSchema } from '../forms/create-payment-form'
import { createPayment, editPayment } from '@/app/(dashboard)/payments/actions'

type Props = {
  session: Session
  defaultData?: Types.Payment
  defaultOpen: boolean
  trigger: ReactNode
}

const UpdatePayment = ({
  session,
  defaultData,
  defaultOpen,
  trigger,
}: Props) => {
  const [sheetOpen, setOpenSheet] = useState(false)
  const { toast } = useToast()

  const contractsFn = useQuery({
    queryKey: ['contracts-user'],
    queryFn: async () => await getAllContracts(session.user?.id!, 50),
    refetchOnWindowFocus: false,
  })
  const mutation = useMutation({
    mutationFn: async (values: PaymentFormSchema) =>
      defaultData
        ? await editPayment({ ...values }, defaultData.id)
        : await createPayment({ ...values, userId: session.user?.id! }),

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

  async function onSubmit(values: PaymentFormSchema) {
    mutation.mutate(values)
  }

  useEffect(() => {
    setOpenSheet(prev => !prev)
  }, [defaultOpen])

  const loading = mutation.status === 'pending'

  const contracts = useMemo(() => {
    return contractsFn.data?.length
      ? contractsFn.data.map(item => ({
          label: item.property?.name + '\n' + item.client?.name,
          value: item.id,
        }))
      : []
  }, [contractsFn.data])

  return (
    <div>
      <Sheet onOpenChange={setOpenSheet} open={sheetOpen}>
        {contractsFn.isPending ? null : (
          <SheetTrigger asChild>{trigger}</SheetTrigger>
        )}

        <SheetContent className='overflow-y-auto'>
          <SheetHeader>
            <SheetTitle>
              {defaultData?.id ? 'Edit payment' : 'Add new payment'}
            </SheetTitle>
            <SheetDescription>
              Create new payment or make changes to existing payment here. Click
              save when you're done.
            </SheetDescription>
          </SheetHeader>

          {mutation.error && (
            <div className='text-red-600'>Could not perform this action..</div>
          )}

          <div className='grid gap-4 py-4'>
            <PaymentForm
              defaultData={defaultData}
              contractPicker={props => (
                <FormSelect items={contracts} formProps={props} />
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

export default UpdatePayment
