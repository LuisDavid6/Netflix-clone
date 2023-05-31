import Input from '@/components/Input'
import axios from 'axios'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { NextPageContext } from 'next'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Auth = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'))
  }, [])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      })
    } catch (error) {
      console.log(error)
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        name,
        email,
        password,
      })

      login()
    } catch (error) {
      console.log(error)
    }
  }, [name, email, password])

  return (
    <div className='relative w-full h-full bg-[url("/background.jpg")] bg-no-repeat bg-fixer bg-cover'>
      <div className='bg-black w-full h-full sm:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <Image src='/logo.png' alt='logo' width='200' height='200' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 md:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  id='name'
                  type='text'
                  label='Username'
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              )}
              <Input
                id='email'
                type='email'
                label='Email'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <Input
                id='password'
                type='password'
                label='Password'
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>
            <button
              className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
              onClick={variant === 'login' ? login : register}
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FaGoogle size={32} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FaGithub size={32} />
              </div>
            </div>
            <p className='text-neutral-500 mt-12'>
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
