import Navbar from '@/components/Navbar'
import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function Home() {
  const { data } = useCurrentUser()
  return (
    <main className='text-white'>
      {/* HOLA
      {JSON.stringify(data)}
      <button onClick={() => signOut()} className='bg-red-500 rounded text-white'>
        Signout
      </button> */}
      <Navbar />
    </main>
  )
}
