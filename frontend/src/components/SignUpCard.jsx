import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAtom } from "../atoms/store";
import { useAtom } from "jotai";
import { createCustomer } from "../api/customer";

function SignUpCard() {
  const [formData, setFormData] = useState({role : "consumer"});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [msg , setMsg] = useState("");
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleRoleChange = (role) => {
    setFormData({
        ...formData,
        role : role
      });
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      console.log(data);
      setMsg(data.message);
      setLoading(false);
      setError(null);
      if (data.role !== "shopkeeper") {
        const value = await createCustomer(data._id);
        if (value) {
          console.log(value , "consumer create successfully");
        }
      }
      // setUser(data);
      // if (data.role === "shopkeeper") {
      //   navigate("/detail");
      // } else {
      //   const value = await createCustomer(data._id);
      //   if (value) {
      //     navigate("/", { replace: true });
      //   }
      // }
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md rounded-xl shadow-md border-gray-800 border-2  p-6 space-y-6">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-2xl font-bold ">Sign Up</h2>
          <p className="flex flex-col justify-center items-center  text-md font-semibold">
            Hey, Enter your details to get sign Up <br />
            <span>to your account</span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <input
              type="text"
              id="name"
              onChange={handleChange}
              className="shadow appearance-none  bg-gray-600/20 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col mb-4">
            <input
              type="text"
              id="email"
              onChange={handleChange}
              className="shadow appearance-none bg-gray-600/20 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>
          <div className="flex mb-6 shadow rounded bg-gray-600/20 w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={handleChange}
              className="focus:outline-none appearance-none bg-gray-600/20 w-full px-3 py-2  "
              placeholder="Password"
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="mx-2 text-sm hover: transition duration-300 ease-in-out"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className=" flex justify-evenly mb-4">
            <div onClick={()=>handleRoleChange("shopkeeper")} id="role" value="shopkeeper" className={` cursor-pointer text-center font-semibold ${formData.role === "shopkeeper" ? "bg-gray-800" : ""} shadow appearance-none border border-gray-800 rounded w-5/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}>
               Shopkeeper
            </div>
            <div onClick={()=>handleRoleChange("consumer")} id="role" value="shopkeeper" className={` cursor-pointer text-center font-semibold ${formData.role === "consumer" ? "bg-gray-800" : ""} shadow appearance-none border border-gray-800  rounded w-5/12 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}>
               Consumer
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center  text-sm font-semibold mt-4">
          -- Or Sign Up with? --
        </p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            className="border border-gray-800 text-gray-800 hover:bg-gray-200  font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Google
          </button>
          <button
            type="button"
            className="border border-gray-800 text-gray-800 hover:bg-gray-200  font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Apple ID
          </button>
          <button
            type="button"
            className="border border-gray-800 text-gray-800 hover:bg-gray-200  font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Facebook
          </button>
        </div>
        <div className="text-center text-sm font-semibold">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-600 hover:text-gray-400">
            Request Now
          </Link>
        </div>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      {msg && <p className="text-green-500 mt-5">{msg}</p>}
    </div>
  );
}

export default SignUpCard;
