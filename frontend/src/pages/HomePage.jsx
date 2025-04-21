import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewProductCardPage from "./NewProductCardPage";

function HomePage() {
  return (
    <div className="relative bg-[#272629]">
      <Header />
      <div className=" flex p-2">
         <Sidebar/>
         <NewProductCardPage />
      </div>
    </div>
  );
}

export default HomePage;
