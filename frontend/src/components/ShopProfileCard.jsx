import React, { useEffect, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";
import { CiEdit } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const ShopProfileCard = () => {
  const [shopkeeperData, setShopkeeperData] = useState();
  const { userId } = useParams();
  const [user] = useAtom(userAtom);

  useEffect(() => {
    const fetchShopkeeperData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/shopkeeper/get/${userId}`
        );
        const data = await res.json();
        console.log(data);
        setShopkeeperData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchShopkeeperData();
  }, [userId]);

  return (
    <>
      {/* <div className="lg:flex  justify-between ">
      <div className="lg:fixed  sm:flex-2 lg:w-[350px] flex flex-col md:flex-row md:justify-evenly md:items-center lg:flex-col lg:justify-normal lg:h-screen gap-y-6 bg-gray-950 p-6">
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
      <div className=" bg-[#272629] lg:ml-[350px] text-white sm:flex-1 flex flex-col">
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

<div className="text-center mt-5">
          <h1 className="text-4xl font-bold mb-4">Share Products</h1>
          <p className="mb-8">
            When you share products, they will appear on your profile.
          </p>
          <Link to="/productcreate">
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Share your product
            </div>
          </Link>
        </div>
        
         </div>
         </div>
    </div> */}
      <div className="bg-zinc-700 text-white p-4 sm:h-screen">
        <div className="flex flex-col gap-4 sm:fixed justify-start items-center">
          <div className="bg-gray-950  sm:fixed sm:w-[96vw] sm:h-[33vh] rounded-3xl p-4 flex flex-col">
            <div className="flex sm:flex-row gap-8 p-4">
              <div>
                <img
                  src="https://i.pravatar.cc/300"
                  alt="Employee Profile"
                  className="rounded-full w-20 h-14 sm:h-20 mx-auto mb-4"
                />
              </div>
              <div className="flex flex-col justify-center items-start gap-2">
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    {shopkeeperData?.userData.name}
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-8">
                  <div className="text-sm mb-2 flex flex-col gap-1">
                    <span className="text-gray-400 ">Shop Name</span>
                    <span className="font-semibold">
                      {shopkeeperData?.shopkeeper.shopName}
                    </span>
                  </div>
                  <div className="text-sm mb-2 flex flex-col gap-1">
                    <span className="text-gray-400 ">Shop Address</span>
                    <span className="font-semibold flex flex-wrap">
                      {shopkeeperData?.shopkeeper.shopAddress.area},{" "}
                      {shopkeeperData?.shopkeeper.shopAddress.city},{" "}
                      {shopkeeperData?.shopkeeper.shopAddress.district},{" "}
                      {shopkeeperData?.shopkeeper.shopAddress.state},{" "}
                      {shopkeeperData?.shopkeeper.shopAddress.country}
                    </span>
                  </div>
                </div>
              </div>
              {user._id === userId &&<div className="absolute right-8 top-10 sm:top-6 cursor-pointer hover:text-green-300">
                <CiEdit size={25} />
              </div>}
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:px-4">
              <div className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#2e2d2d]/70">
                <MdOutlinePostAdd className="text-xl" />

                <div className="flex flex-col gap-1">
                  <p className="text-sm">Posts</p>
                  <p className="text-xs">
                    {shopkeeperData?.shopkeeper.products.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#2e2d2d]/70">
                <MdEmail className="text-xl" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Email</p>
                  <p className="text-xs">{shopkeeperData?.userData.email}</p>
                </div>
              </div>
              <div className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#2e2d2d]/70">
                <FaPhoneAlt className="text-xl" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Phone number</p>
                  <p className="text-xs">
                    {shopkeeperData?.shopkeeper.contactNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* second div */}
          <div className="bg-gray-950 rounded-3xl sm:mt-[34vh] h-[62vh] w-[96vw] relative overflow-y-scroll">
            <div className="flex px-8 py-4 gap-2 justify-start items-center sm:fixed w-[95vw] rounded-tl-3xl bg-gray-950">
              <div className="w-2 h-9 rounded-md bg-[#2cb6bd]"></div>
              <h2 className="text-xl">Posts</h2>
              <Link to="/productcreate" className="text-xl cursor-pointer">
                <MdOutlinePostAdd />
              </Link>
            </div>
            <div className="rounded-md sm:p-8 flex flex-wrap justify-center items-center sm:justify-normal gap-3 sm:mt-12">
              {shopkeeperData?.shopkeeper.products.map((product, index) => (
                <div>
                  <img
                    src={`${product.imageUrls}`}
                    alt="Employee Profile"
                    className="w-32 h-32 sm:h-40 sm:w-40 rounded-xl mx-auto mb-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopProfileCard;
