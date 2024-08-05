import React from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import FilterCard from "../components/FilterCard";
import CommentCard from "../components/CommentCard";

function HomePage() {
  return (
    <div className="">
      <Header />
      <div className=" flex flex-col p-2 gap-2">
       <div>
       <FilterCard/>
       </div>
        <div className="flex justify-start">
        <ProductCard className="p-4" />
        <CommentCard/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
