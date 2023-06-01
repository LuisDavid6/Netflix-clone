import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  image: string
  name: string
}

const ProfileIcon: React.FC<Props> = ({ image, name }) => {
  const router = useRouter()

  return (
    <div onClick={() => router.push('/')}>
      <div className='group flex-row w-24 mx-auto'>
        <div
          className='w-24 h-24 rounded-md flex items-center justify-center border-2 
            border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'
        >
          <Image src={image} width={120} height={100} alt='user'></Image>
        </div>
        <div className='mt-2 text-gray-400 text-xl text-center group-hover:text-white'>{name}</div>
      </div>
    </div>
  )
}

export default ProfileIcon
