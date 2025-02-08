import type { Metadata } from 'next'
import { Inter, Noto_Sans, Roboto_Mono } from 'next/font/google'
import QueryProvider from '@/providers/QueryProvider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
        <main className='min-h-screen max-w-screen-2xl mx-auto bg-neutral-100'>
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  )
}
