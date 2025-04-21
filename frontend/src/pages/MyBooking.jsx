import React from 'react'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CustomerBookings from '../components/CustomerBookings';

const MyBooking = () => {
  return (
    <div className="bg-[#272629]">
      <Header />
      <div className=" flex p-2">
         <Sidebar/>
         <CustomerBookings/>
      </div>
    </div>
  )
}

export default MyBooking
