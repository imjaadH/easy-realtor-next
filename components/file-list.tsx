'use client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { formatFileSize, shortenFileName } from '@/lib/utils'

interface FileListProps {
  files?: File[]
  onDelete: (name: string) => void
}
const FileList: React.FC<FileListProps> = ({ files, onDelete }) => {
  return (
    <div className='space-y-2'>
      {files &&
        [...files].map(file => (
          <Card className='p-2'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-1'>
                <img
                  className='w-10 h-10 rounded object-fill'
                  src={URL.createObjectURL(file)}
                  alt='image'
                />
                <div>
                  <p className='text-sm'>{shortenFileName(file.name)}</p>
                  <p className='text-xs text-muted-foreground'>
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              <Button
                variant='ghost'
                size='sm'
                onClick={() => onDelete(file.name)}
              >
                <Trash2 className='h-4 w-4 text-destructive' />
              </Button>
            </div>
          </Card>
        ))}
    </div>
  )
}

export default FileList
