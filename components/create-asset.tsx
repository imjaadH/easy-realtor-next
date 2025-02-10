'use client'
import { createAsset, saveMediaPaths } from '@/app/(dashboard)/assets/actions'
import FileUpload from '@/components/file-upload'
import {
  AssetForm,
  AssetFormSchema,
} from '@/components/forms/create-asset-form'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'

import FileList from './file-list'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type Props = {}

const Loader = () => (
  <div className='flex items-center gap-2 text-gray-600 text-xs'>
    Please wait..
    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
  </div>
)

export const CreateAsset = ({}: Props) => {
  const { data: session } = useSession()
  const [files, setFiles] = useState<File[]>([])
  const [mediaPaths, setMediaPaths] = useState<string[]>([])
  const [assetId, setAssetId] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const { mutate: updateGallery, status: updateGalleryStatus } = useMutation({
    mutationFn: async () => await saveMediaPaths(mediaPaths, assetId!),
  })
  const { mutate: uploadFiles, status: uploadStatus } = useMutation({
    mutationFn: async (formData: FormData) =>
      await fetch('/api/create/upload-media', {
        method: 'post',
        body: formData,
      }),
    onSuccess(data, variables, context) {
      updateGallery()
    },
  })

  const mutation = useMutation({
    onSuccess(data, variables, context) {
      if (data.type === 'error') {
        toast({
          title: 'Error occured, please try again',
          variant: 'destructive',
        })
        return
      } else {
        if (files.length) {
          setAssetId(data.data!!)
          uploadMedia(data.data!!)
        }
      }

      router.push('/assets')
    },
    mutationFn: async (values: AssetFormSchema & { id?: string }) =>
      await createAsset({ ...values, userId: session?.user?.id }),
  })

  const uploadMedia = (assetId: string) => {
    const paths: string[] = []
    const formData: FormData = new FormData()
    formData.append('path', `assets/${assetId}/`)
    files.forEach(file => {
      const ext = file.name.split('.').pop()
      const fileName = crypto.randomUUID()
      paths.push(`assets/${assetId}/${fileName}.${ext}`)
      formData.append('file', file, `${fileName}.${ext}`)
    })
    setMediaPaths(paths)
    uploadFiles(formData)
  }
  async function onSubmit(values: AssetFormSchema) {
    console.log(values)
    mutation.mutate(values)
  }

  useEffect(() => {
    console.log(mutation.error)
  }, [mutation.error])
  const loading = mutation.status === 'pending'
  const galleryLoading = updateGalleryStatus === 'pending'
  return (
    <>
      <section className='mt-6 mx-auto grid grid-cols-4 gap-2 p-4'>
        <div className='col-span-4 md:col-span-2 flex flex-col gap-2'>
          {mutation.error && (
            <div className='text-red-600'>Could not perform this action..</div>
          )}

          <div className='rounded-lg border p-5'>
            <div className='flex justify-between'>
              <p className='font-semibold text-lg'>Property Information</p>
              {(loading || galleryLoading) && <Loader />}
            </div>

            <AssetForm onSubmit={onSubmit} />
          </div>
        </div>
        {/* Status panel */}
        <div className='col-span-4 md:col-span-2 rounded-lg border p-5'>
          <div className='flex justify-between'>
            <p className='font-semibold text-lg'>Property Images</p>
            {uploadStatus === 'pending' && <Loader />}
          </div>

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
    </>
  )
}

export default CreateAsset
