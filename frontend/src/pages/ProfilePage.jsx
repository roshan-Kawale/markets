import React from 'react'
import ShopProfileCard from '../components/ShopProfileCard'
import { useAtom } from 'jotai'
import { userAtom } from '../atoms/store'
import CustomerProfile from '../components/CustomerProfile';

function ProfilePage() {
  const [user] = useAtom(userAtom);
  return (
    <div className='bg-[#272629] h-screen'>
      { user.role=== "shopkeeper" && <ShopProfileCard/> }
    </div>
  )
}

export default ProfilePage
