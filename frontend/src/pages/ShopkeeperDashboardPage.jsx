import React from 'react'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ShopkeeperDashboard from '../components/ShopkeeperDashboard';

const ShopkeeperDashboardPage = () => {
  return (
    <div className="bg-[#272629]">
      <Header />
      <div className=" flex p-2">
         <Sidebar/>
         <ShopkeeperDashboard/>
      </div>
    </div>
  )
}

export default ShopkeeperDashboardPage
