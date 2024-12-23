import React from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

function HomePage() {
  return (
    <div className="relative">
      <Header />
      <div className=" flex flex-col p-2">
       <div>
        <Sidebar/>

       </div>
        <div className="flex justify-start">
        <ProductCard className="p-4" />
       
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;
