'use client'
import { createAsset } from '@/app/(dashboard)/assets/actions'
import FileUpload from '@/components/file-upload'
import {
  AssetForm,
  AssetFormSchema,
} from '@/components/forms/create-asset-form'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import FileList from './file-list'
import { ActionResponse } from '@/app/auth/actions'
import Image from 'next/image'

type Props = {}
export const CreateAsset = ({}: Props) => {
  const { data: session } = useSession()
  const [files, setFiles] = useState<File[]>([])

  const { mutate: uploadFiles, status: uploadStatus } = useMutation({
    mutationFn: async (formData: FormData) =>
      await fetch('/api/create/upload-media', {
        method: 'post',
        body: formData,
      }),
  })
  const mutation = useMutation({
    onSuccess(data, variables, context) {
      console.log(data)
      if (files.length) {
        uploadMedia(data.data!!)
      }
    },
    mutationFn: async (values: AssetFormSchema & { id?: string }) =>
      await createAsset({ ...values, userId: session?.user?.id }),
  })

  const uploadMedia = (assetId: string) => {
    const mediaPaths: string[] = []
    const formData: FormData = new FormData()
    formData.append('path', `assets/${assetId}/`)
    files.forEach(file => {
      const ext = file.name.split('.').pop()
      const fileName = crypto.randomUUID()
      mediaPaths.push(`assets/${assetId}/${fileName}.${ext}`)
      formData.append('file', file, `${fileName}.${ext}`)
    })
    console.log(mediaPaths)

    uploadFiles(formData)
  }
  async function onSubmit(values: AssetFormSchema) {
    console.log(values)
    mutation.mutate(values)
  }

  const loading = mutation.status === 'pending'

  return (
    <section className='mt-6 mx-auto grid grid-cols-4 border gap-2'>
      <div className='col-span-2'>
        {mutation.error && (
          <div className='text-red-600'>Could not perform this action..</div>
        )}
        <AssetForm onSubmit={onSubmit} />
      </div>
      <div className='col-span-1'>
        <FileUpload
          onSelection={value => setFiles(prev => [...value, ...prev])}
        >
          <FileList
            files={files}
            onDelete={name =>
              setFiles(prev => prev?.filter(item => item.name !== name))
            }
          />
        </FileUpload>
      </div>
    </section>
  )
}

export default CreateAsset
