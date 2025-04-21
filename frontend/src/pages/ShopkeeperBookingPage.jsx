import React from 'react'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ShopkeeperBooking from '../components/ShopkeeperBooking';

const ShopkeeperBookingPage = () => {
  return (
    <div className="bg-[#272629]">
      <Header />
      <div className=" flex p-2">
         <Sidebar/>
         <ShopkeeperBooking/>
      </div>
    </div>
  )
}

export default ShopkeeperBookingPage
