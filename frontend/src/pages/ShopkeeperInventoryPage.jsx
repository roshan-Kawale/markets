import React from 'react'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ShopkeeperInventory from '../components/ShopkeeperInventory';

const ShopkeeperInventoryPage = () => {
  return (
    <div className="bg-[#272629]">
      <Header />
      <div className=" flex p-2">
         <Sidebar/>
         <ShopkeeperInventory/>
      </div>
    </div>
  )
}

export default ShopkeeperInventoryPage
