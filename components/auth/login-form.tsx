import { signIn } from '@/lib/auth'

const LoginForm = () => {
  return (
    <form
      className='flex flex-col gap-2'
      action={async formData => {
        'use server'
        try {
          await signIn('credentials', formData)
        } catch (error) {
          console.log(error)
        }
      }}
    >
      <label>
        Email
        <input name='email' type='email' />
      </label>
      <label>
        Password
        <input name='password' type='password' />
      </label>
      <button>Sign In</button>
    </form>
  )
}

export default LoginForm
