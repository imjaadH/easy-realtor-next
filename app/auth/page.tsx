import { Group, Button } from '@mantine/core'
import Image from 'next/image'
import GoogleIcon from '@/public/images/google-icon.svg'
import GithubIcon from '@/public/images/github-icon.svg'
import LoginForm from '@/components/auth/login-form'
import { signIn } from '@/lib/auth'

type Props = {}
const AuthPage = ({}: Props) => {
  return (
    <div>
      <section className='flex flex-col items-center justify-center body-font mx-auto h-screen'>
        <form
          action={async () => {
            'use server'
            await signIn('google')
          }}
        >
          <Button
            variant='outline'
            type='submit'
            leftSection={
              <Image src={GoogleIcon} alt='google' width={20} height={20} />
            }
          >
            Login With Google
          </Button>
        </form>
        <form
          action={async () => {
            'use server'
            await signIn('github')
          }}
        >
          <Button
            variant='outline'
            type='submit'
            leftSection={
              <Image src={GithubIcon} alt='github' width={20} height={20} />
            }
          >
            Login With Github
          </Button>
        </form>

        <LoginForm />
      </section>
    </div>
  )
}

export default AuthPage
