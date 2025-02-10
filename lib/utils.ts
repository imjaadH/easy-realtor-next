import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function shortenFileName(fileName: string, maxLength = 20) {
  const extensionIndex = fileName.lastIndexOf('.')
  if (extensionIndex === -1 || fileName.length <= maxLength) return fileName

  const extension = fileName.slice(extensionIndex)
  const nameWithoutExt = fileName.slice(0, extensionIndex)

  if (nameWithoutExt.length + extension.length <= maxLength) return fileName

  const visibleChars = Math.floor((maxLength - extension.length - 3) / 2)
  return `${nameWithoutExt.slice(0, visibleChars)}...${nameWithoutExt.slice(
    -visibleChars,
  )}${extension}`
}
