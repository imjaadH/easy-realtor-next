import LoginForm from '@/components/auth/login-form'
import { signIn } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import RegisterForm from '@/components/auth/register-form'

type Props = {}
const AuthPage = ({}: Props) => {
  return (
    <div>
      <section className='flex flex-col items-center justify-center body-font mx-auto h-screen'>
        <form
          action={async () => {
            'use server'
            await signIn('google', { redirectTo: '/' })
          }}
        >
          <Button variant='outline' type='submit'>
            Login With Google
          </Button>
        </form>
        <form
          action={async () => {
            'use server'
            await signIn('github')
          }}
        >
          <Button variant='outline' type='submit'>
            Login With Github
          </Button>
        </form>

        <LoginForm />

        <h3>Register Form</h3>

        <RegisterForm />
      </section>
    </div>
  )
}

export default AuthPage
