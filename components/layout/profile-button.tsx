import Image from 'next/image'

type Props = {}
const ProfileButton = ({}: Props) => {
  return (
    <div className='flex items-center gap-2'>
      <div className='rounded h-7 w-7 relative'>
        <Image
          alt='profileImage'
          fill
          priority
          src={
            'https://static.wikia.nocookie.net/gtawiki/images/a/a8/MichaelDeSanta-GTAVee.png/revision/latest?cb=20220318234033'
          }
          className='rounded'
          placeholder='empty'
        />
      </div>
      <p className='text-sm text-slate-950'>Franklin</p>
    </div>
  )
}

export default ProfileButton
