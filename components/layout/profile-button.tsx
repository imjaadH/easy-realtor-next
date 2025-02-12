import { Session } from 'next-auth'
import Image from 'next/image'

type Props = {
  session: Session
}
const ProfileButton = ({ session }: Props) => {
  if (!session.user) return 'Please login'
  return (
    <div className='flex items-center gap-2'>
      <div className='rounded h-7 w-7 relative'>
        <Image
          alt='profileImage'
          fill
          priority
          src={session.user.image!}
          className='rounded'
          placeholder='empty'
        />
      </div>
      <p className='text-sm text-slate-950'>{session.user.name}</p>
    </div>
  )
}

export default ProfileButton
