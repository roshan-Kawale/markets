import React, { useEffect, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { Link , useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";

const ShopProfileCard = () => {

  const [shopkeeperData , setShopkeeperData] = useState();
  const { userId } = useParams();
  const [user] = useAtom(userAtom)

  useEffect(() => {
    const fetchShopkeeperData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/shopkeeper/get/${userId}`);
        const data = await res.json();
        console.log(data)
        setShopkeeperData(data)
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchShopkeeperData();
  }, [userId]);

  return (
    <div className="lg:flex  justify-between">
      <div className="lg:fixed sm:flex-2 w-[350px] flex flex-col md:flex-row md:justify-evenly md:items-center lg:flex-col lg:justify-normal lg:h-screen gap-y-6 bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="flex items-center">
          <img
            src="https://picsum.photos/200"
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
        </div>

        <div className="flex flex-col items-start gap-y-4">
          <div className="flex space-x-4 items-center">
            <h2 className="text-xl font-bold text-white">{shopkeeperData?.shopName}</h2>
           {user._id === userId && <div className="flex justify-center items-center gap-4">
            <div className="border-2 cursor-pointer hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-2xl">
              Edit profile
            </div>
            <IoSettingsSharp className="cursor-pointer text-white text-3xl" />
            </div>}
          </div>
          <div className="">
            <p className="text-gray-400 text-center">
              {shopkeeperData?.products.length} posts • {144} followers • {149} following
            </p>
          </div>
          <div className="">
          <p className="text-gray-400">{shopkeeperData?.shopDescription}</p>
          <p className="text-gray-400">Contact no : {shopkeeperData?.contactNumber}</p>
          
          <p className="text-gray-400 flex flex-wrap">{shopkeeperData?.shopAddress.area}, {shopkeeperData?.shopAddress.city}, {shopkeeperData?.shopAddress.district}, {shopkeeperData?.shopAddress.state}, {shopkeeperData?.shopAddress.country}</p>
        
          </div>
        </div>
      </div>
      <div className=" bg-[#272629] lg:ml-[350px] h-screen text-white sm:flex-1 flex flex-col">
        <div className="flex justify-center items-center">
        <div className="flex justify-between lg:absolute top-2 border-t-2 shadow-xl-2 py-1">
          <div className="flex gap-1 items-center text-gray-500 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <MdOutlinePostAdd className="text-xl" />
            <div>Post</div>
          </div>
          <button className="flex gap-1 items-center text-gray-500 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <IoBookmarkOutline className="text-xl" />
            <div>Saved</div>
          </button>
        </div>
         
        {!shopkeeperData?.products && <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Share Photos</h1>
          <p className="mb-8">
            When you share photos, they will appear on your profile.
          </p>
          <Link to="/productcreate">
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Share your first photo
            </div>
          </Link>
        </div>}
        </div>
        <div className="lg:mt-16 p-2 flex flex-wrap justify-center items-center gap-2">
        {shopkeeperData?.products.map((product , index) => (
          <div key={index} className="flex cursor-pointer gap-2">
          <img
            src={`${product.imageUrls}`}  
            alt="Profile"
            className="w-96 h-96 rounded-lg"
          />

    </div>
        )) }
        
         </div>
         </div>
    </div>
  );
};

export default ShopProfileCard;
