import React from 'react'

interface Props {
  label: string
  active?: boolean
}

const NavbarItem: React.FC<Props> = ({ label, active }) => {
  return (
    <div
      className={
        active
          ? 'text-white cursor-default'
          : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'
      }
    >
      {label}
    </div>
  )
}

export default NavbarItem
