import { signIn } from '@/lib/auth'

const RegisterForm = () => {
  return (
    <form
      className='flex flex-col gap-2'
      action={async formData => {
        'use server'
        await signIn('credentials', formData)
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

export default RegisterForm
