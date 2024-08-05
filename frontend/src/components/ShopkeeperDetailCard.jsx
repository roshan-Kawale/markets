import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdPersonalInjury } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { userAtom } from "../atoms/store";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";

function ShopkeeperDetailCard() {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({});
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useAtom(userAtom);

  const navigate = useNavigate();

  const Data = {
    userId: user._id,
    shopName: formData.shopName,
    shopDescription: formData.shopDescription,
    shopAddress: {
      area: formData.area,
      city: formData.city,
      district: formData.district,
      state: formData.state,
      country: formData.country,
    },
    contactNumber: [formData.contactNumber],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/shopkeeper/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    setUser(RESET);
  };

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[3] w-full h-screen flex gap-10 flex-wrap p-5"
    >
      <motion.div
        drag
        dragConstraints={ref}
        whileDrag={{ scale: 1.2 }}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
        className="flex flex-col h-52 bg-white"
      >
        <div className="w-72 rounded-xl shadow-md bg-white space-y-6 p-2">
          <div className="flex justify-between items-center px-4 py-3 bg-gray-700 font-semibold text-white rounded-t-xl">
            <h1>Personal Detail</h1>
            <span className="text-2xl">
              <MdPersonalInjury />
            </span>
          </div>
          <div>
            <div className="flex flex-col mb-4">
              <input
                type="text"
                id="shopName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Shop Name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                type="text"
                id="shopDescription"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Shop Description"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        drag
        dragConstraints={ref}
        whileDrag={{ scale: 1.2 }}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
        className="flex flex-col h-52 "
      >
        <div className="w-72 rounded-xl shadow-md bg-white space-y-6 p-2">
          <div className="flex justify-between items-center px-4 py-3 bg-gray-700 font-semibold text-white rounded-t-xl">
            <h1>Address</h1>
            <span className="text-2xl">
              <FaMapMarkedAlt />
            </span>
          </div>
          <div>
            <div className="flex flex-col mb-4">
              <input
                type="text"
                id="area"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Area"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                type="text"
                id="city"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="City"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                type="text"
                id="district"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="District"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                type="text"
                id="state"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="State"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                type="text"
                id="country"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Country"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        drag
        dragConstraints={ref}
        whileDrag={{ scale: 1.2 }}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
        className="flex flex-col h-52 "
      >
        <div className="w-72 rounded-xl shadow-md bg-white space-y-6 p-2">
          <div className="flex justify-between items-center px-4 py-3 bg-gray-700 font-semibold text-white rounded-t-xl">
            <h1>Contact Detail</h1>
            <span className="text-2xl">
              <IoMdCall />
            </span>
          </div>
          <div>
            <div className="flex flex-col ">
              <input
                type="text"
                id="contactNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Phone number"
                onChange={handleChange}
              />
            </div>
            {[...Array(count)].map((_, index) => (
              <input
                type="text"
                key={index}
                id="contactNumber"
                className="shadow mt-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Phone number"
                onChange={handleChange}
              />
            ))}

            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCount(count + 1);
                }}
                className="text-black mt-4 text-2xl mx-1 mb-1"
              >
                <IoMdAddCircleOutline />
              </button>

              {count > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCount(count - 1);
                  }}
                  className="text-black mt-4 text-2xl mx-1 mb-1 px-2"
                >
                  <IoMdRemoveCircleOutline />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      {error && (
        <p className="fixed right-22 bottom-5  text-red-600">{error}</p>
      )}
      <p>{user.name}</p>
      <button disabled={loading}
        onClick={handleSubmit}
        className="text-black h-[30px] fixed right-5 bottom-5 px-5 font-semibold  border-2 shadow-xl rounded-3xl hover:bg-[#272629] hover:text-white"
      >
        Submit
      </button>
      <button
        onClick={handleSignOut}
        className="text-black h-[30px] fixed right-15 bottom-5 px-5 font-semibold  border-2 shadow-xl rounded-3xl hover:bg-[#272629] hover:text-white"
      >
        sign out
      </button>
    </div>
  );
}

export default ShopkeeperDetailCard;
