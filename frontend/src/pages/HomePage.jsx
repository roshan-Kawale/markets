import React from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import FilterCard from "../components/FilterCard";

function HomePage() {
  return (
    <div>
      <Header />
      <div className=" flex flex-col p-2">
       <div>
       <FilterCard/>
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
