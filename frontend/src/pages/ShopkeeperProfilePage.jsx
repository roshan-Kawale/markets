import React from 'react'
import ShopProfileCard from '../components/ShopProfileCard'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function ShopkeeperProfilePage() {
  return (
    <div className='bg-[#272629]'>
      <div className="relative">
      <Header />
      <div className=" flex p-2">
         <Sidebar/>
         <ShopProfileCard/>
      </div>
    </div>
    </div>
  )
}

export default ShopkeeperProfilePage
