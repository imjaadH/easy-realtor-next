'use client'

import { cn } from '@/lib/utils'
import { MenuItems } from './menu'
import ProfileButton from './profile-button'
import Link from 'next/link'
interface NavbarProps {
  children?: React.ReactNode
  className?: string
}
const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
  return (
    <header
      className={cn(
        `flex items-center justify-between sticky top-0  p-3 px-6 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 max-w-screen-2xl mx-auto `,
        className,
      )}
    >
      <Link href={'/'}>
        <p className='text-indigo-700 font-extrabold'>EasyRealtor</p>
      </Link>

      <MenuItems />
      <Link href={'/profile'}>
        <ProfileButton />
      </Link>
    </header>
  )
}

export default Navbar
