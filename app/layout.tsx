import type { Metadata } from 'next'
import { Inter, Noto_Sans, Open_Sans } from 'next/font/google'
import QueryProvider from '@/providers/QueryProvider'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Easy Realtor',
  description: 'Easy property management for you',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <main className='min-h-screen max-w-screen-2xl mx-auto w-full bg-neutral-50 '>
          <QueryProvider>{children}</QueryProvider>
        </main>
        <Toaster />
      </body>
    </html>
  )
}
