import React from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import FilterCard from "../components/FilterCard";
import Sidebar from "../components/Sidebar";

function HomePage() {
  return (
    <div>
      <Header />
      <div className=" flex flex-col p-2">
       <div>
        <Sidebar/>
       {/* <FilterCard/> */}
       </div>
        <div className="flex justify-start">
        <ProductCard className="p-4" />
        {/* <CommentCard/> */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
