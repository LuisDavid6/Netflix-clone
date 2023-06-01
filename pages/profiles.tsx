import ProfileIcon from '@/components/ProfileIcon'
import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

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

const Profiles = () => {
  const router = useRouter()
  const { data: user } = useCurrentUser()

  return (
    <div className='flex items-center h-full justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-3xl md:text-6xl text-white text-center'>Who is watching?</h1>
        <div className='flex items-center justify-center gap-3 mt-10'>
          <ProfileIcon image='/profile-blue.png' name={user.name} />
          <ProfileIcon image='/profile-green.png' name='invitado' />
          <ProfileIcon image='/profile-red.png' name='invitado' />
          <ProfileIcon image='/profile-slate.png' name='invitado' />
        </div>
      </div>
    </div>
  )
}

export default Profiles
