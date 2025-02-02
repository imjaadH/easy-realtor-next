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
              <div className=' flex gap-2 px-2 items-center'>
                <item.icon
                  size={15}
                  className={cn(
                    `text-gray-600`,
                    item.active && 'text-slate-800 dark:text-slate-800',
                  )}
                />
                <p
                  className={cn(
                    `text-gray-500 text-sm font-normal`,
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
