import React from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import NewProductCardPage from "./NewProductCardPage";

function HomePage() {
  return (
    <div className="relative">
      <Header />
      <div className=" flex p-2">
       
        <Sidebar/>
         <NewProductCardPage />

        <div className="flex justify-start">
         {/* <ProductCard className="p-4" /> */}
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;
