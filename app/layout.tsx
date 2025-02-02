import type { Metadata } from 'next'
import { Inter, Noto_Sans } from 'next/font/google'
import {
  ColorSchemeScript,
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  mergeMantineTheme,
} from '@mantine/core'

import './globals.css'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import { breakpoints, colors } from '../lib/theme'
import Navbar from '@/components/layout/navbar'

const inter = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Easy Realtor',
  description: 'Easy property management for you',
}

const theme = mergeMantineTheme(
  DEFAULT_THEME,
  createTheme({
    breakpoints,
    colors,
  }),
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <main className='min-h-screen max-w-screen-2xl mx-auto bg-neutral-100'>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </main>
      </body>
    </html>
  )
}
