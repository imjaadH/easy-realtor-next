'use client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { formatFileSize, shortenFileName } from '@/lib/utils'
import Image from 'next/image'

interface FileListProps {
  files?: File[]
  onDelete: (name: string) => void
}
const FileList: React.FC<FileListProps> = ({ files, onDelete }) => {
  return (
    <div className='flex flex-wrap gap-1 mt-4'>
      {files &&
        [...files].map(file => (
          <Card className='p-2'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-1 flex-col'>
                <div className='h-28 w-40 flex relative rounded'>
                  <Image
                    className='rounded object-cover'
                    fill
                    src={URL.createObjectURL(file)}
                    
                    alt='image'
                  />
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => onDelete(file.name)}
                    className='absolute z-14 right-0'
                  >
                    <Trash2 className='text-red-500' />
                  </Button>
                </div>

                <div>
                  <p className='text-xs'>{shortenFileName(file.name)}</p>
                  <p className='text-xs text-muted-foreground'>
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
    </div>
  )
}

export default FileList
