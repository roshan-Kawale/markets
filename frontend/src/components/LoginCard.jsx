import { useAtom } from "jotai";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAtom } from "../atoms/store";
import { useToast } from "../hooks/use-toast"

function LoginCard() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useAtom(userAtom);
  const { toast } = useToast()

  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

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
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}api/auth/signin`, {
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
        return data.message;
      }
      
      if(!data.verified) {
        setLoading(false);
        setError(null);
        return "Verification email sent! Please check your inbox to verify your account.";
      }

      if (data.role ==="shopkeeper") {
        setLoading(false);
        setError(null);
        navigate("/detail");
      } 
      setUser(data);
      setLoading(false);
      setError(null);
      navigate("/")
      return data.message || "Login successful";

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md rounded-2xl shadow-md border-gray-800 border-2 p-6 space-y-6">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="flex flex-col justify-center items-center text-md font-semibold">
            Hey, Enter your details to get sign in <br />
            <span>to your account</span>
          </p>
        </div>
        <form 
          onSubmit={async (e) => {
            const reply = await handleSubmit(e);
            toast({
              className: 'bg-black border-gray-800 text-white capitalize font-semibold text-lg',
              title: `${reply}`,
            });
          }}
        >
          <div className="flex flex-col mb-4">
            <input
              type="text"
              id="email"
              onChange={handleChange}
              className="shadow appearance-none rounded w-full py-2 px-3 bg-gray-600/20 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email/Phone No"
            />
          </div>
          <div className="flex mb-6 shadow rounded bg-gray-600/20 w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={handleChange}
              className="focus:outline-none appearance-none w-full px-3 py-2 bg-gray-600/20"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="mx-2  text-sm transition duration-300 ease-in-out"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <p className="text-center  text-sm font-semibold mt-4">
          -- Or Sign in with? --
        </p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            className="border border-gray-800 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Google
          </button>
          <button
            type="button"
            className="border border-gray-800 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Apple ID
          </button>
          <button
            type="button"
            className="border border-gray-800 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Facebook
          </button>
        </div>
        <div className="text-center text-sm font-semibold">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gray-600 hover:text-gray-400">
            Request Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
