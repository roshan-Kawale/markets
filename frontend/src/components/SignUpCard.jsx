import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUpCard() {
  const [formData, setFormData] = useState({role : "consumer"});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
      const res = await fetch("/api/auth/signup", {
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
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md rounded-xl shadow-md bg-white p-6 space-y-6">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
          <p className="flex flex-col justify-center items-center text-gray-600 text-md font-semibold">
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col mb-4">
            <input
              type="text"
              id="email"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>
          <div className="flex mb-6 shadow rounded border w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={handleChange}
              className="focus:outline-none appearance-none w-full px-3 py-2  text-gray-700"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="mx-2 text-gray-600 text-sm hover:text-gray-800 transition duration-300 ease-in-out"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className=" flex justify-evenly mb-4">
            <div onClick={()=>handleRoleChange("shopkeeper")} id="role" value="shopkeeper" className={` cursor-pointer text-center font-semibold ${formData.role === "shopkeeper" ? "bg-orange-200" : ""} shadow appearance-none border rounded w-5/12 py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline`}>
               Shopkeeper
            </div>
            <div onClick={()=>handleRoleChange("consumer")} id="role" value="shopkeeper" className={` cursor-pointer text-center font-semibold ${formData.role === "consumer" ? "bg-orange-200" : ""} shadow appearance-none border rounded w-5/12 py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline`}>
               Consumer
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-900 text-sm font-semibold mt-4">
          -- Or Sign Up with? --
        </p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            className="border hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Google
          </button>
          <button
            type="button"
            className="border hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Apple ID
          </button>
          <button
            type="button"
            className="border hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Facebook
          </button>
        </div>
        <div className="text-center text-gray-600 text-sm font-semibold">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Request Now
          </Link>
        </div>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default SignUpCard;
