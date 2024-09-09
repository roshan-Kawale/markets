import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import CustomerProfile from "./CustomerProfile";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  return (
    <header className="bg-black border-b-2 border-gray-800 z-10 fixed w-full text-white py-2 px-2">
      <div className="mx-auto flex justify-between items-center">

        <div className="sm:flex items-center">
          <h1 className="text-3xl font-bold ">Market</h1>
        </div>
       
        <form
          onSubmit={handleSubmit}
          className="bg-black border-2 border-gray-800 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-36 sm:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <nav className="flex space-x-8 sm:flex items-center">
          {user.role === "shopkeeper" && (
            <Link to={`/profile/${user._id}`} className="hover:text-gray-400 pr-2">
              <div className="flex items-center cursor-pointer">
                <img
                  src="https://picsum.photos/200"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </Link>
          )}
          {user.role === "consumer" && (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleProfileMenuToggle}
              >
                <img
                  src="https://picsum.photos/200"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          )}
        
       {/* {<div className="relative">
              <div
                className="flex items-center cursor-pointer text-black"
              >
                <Link to="/login">
                <button>
                Sign In
                </button>
                </Link>
              </div>
            </div>} */}
         
          {profileMenuOpen && <CustomerProfile />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
