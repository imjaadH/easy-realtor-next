'use client'

import { cn } from '@/lib/utils'
import {
  Banknote,
  Building2,
  ChartSpline,
  ReceiptText,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export const MenuItems = () => {
  const pathname = usePathname()
  const routes = useMemo(
    () => [
      {
        icon: Building2,
        label: 'My Units',
        active: pathname == '/assets',
        href: '/assets/',
      },
      {
        icon: Users,
        label: 'Clients',
        active: pathname === '/clients',
        href: '/clients',
      },
      {
        icon: Banknote,
        label: 'Payments',
        active: pathname === '/payments',
        href: '/payments',
      },

      {
        icon: ReceiptText,
        label: 'Contracts',
        active: pathname === '/contracts',
        href: '/contracts',
      },
    ],
    [pathname],
  )
  return (
    <>
      <ul className='flex gap-2 p-1 rounded-full border border-gray-100 bg-white'>
        {routes.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <div
                className={cn(
                  `flex gap-2 p-2 px-2 items-center rounded-full text-gray-700  hover:text-black hover:bg-neutral-100`,
                  item.active && 'bg-neutral-100',
                )}
              >
                <item.icon
                  size={15}
                  className={cn(
                    `text-inherit`,
                    item.active && 'text-indigo-800 dark:text-neutral-200',
                  )}
                />
                <p
                  className={cn(
                    `text-inherit text-sm font-normal  `,
                    item.active && 'text-indigo-800 font-semibold',
                  )}
                >
                  {item.label}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
