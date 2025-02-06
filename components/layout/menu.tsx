'use client'

import { cn } from '@/lib/utils'
import { Banknote, Building2, ChartSpline, Users } from 'lucide-react'
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
        icon: ChartSpline,
        label: 'Analytics',
        active: pathname === '/analytics',
        href: '/analytics',
      },
    ],
    [pathname],
  )
  return (
    <>
      <ul className='flex gap-2 rounded-full p-2 border border-gray-100 bg-white'>
        {routes.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <div className=' flex gap-2 px-2 items-center text-gray-700  hover:text-black'>
                <item.icon
                  size={15}
                  className={cn(
                    `text-inherit`,
                    item.active && 'text-slate-800 dark:text-neutral-200',
                  )}
                />
                <p
                  className={cn(
                    `text-inherit text-sm font-normal  `,
                    item.active && 'text-slate-800',
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
