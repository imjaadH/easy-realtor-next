'use client'
import React, { useRef, useState, memo } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface FileUploadProps {
  children: React.ReactNode
  onSelection: (files: File[]) => void
}
const FileUpload: React.FC<FileUploadProps> = ({ children, onSelection }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      {children}
      <Input
        ref={inputRef}
        type='file'
        multiple
        accept='image/*'
        onChange={e => onSelection([...e.target?.files!!])}
        className='w-0 h-0 p-0'
      />

      <Button onClick={() => inputRef?.current?.click()} className='mt-2'>
        Select files
      </Button>
    </div>
  )
}

export default memo(FileUpload)
