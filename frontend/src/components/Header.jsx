import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import CustomerProfile from "./CustomerProfile";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user] = useAtom(userAtom);
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleSubmit = () => {
    // Your search logic here
  }

  return (
    <header className="bg-white border-2 z-10 fixed w-full text-white py-2 px-2">
      <div className="mx-auto flex justify-between items-center">
        {/* Mobile navigation menu */}
        {/* <div className="sm:hidden flex gap-3 py-2">
          <div
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={handleMobileMenuToggle}
          >
            <RiMenu2Line />
          </div>
          {mobileMenuOpen && (
            <div className="absolute top-0 left-0 bg-white w-full shadow-md px-2 py-2">
              <div
                className="  hover:bg-gray-200 w-12 text-black border-2 shadow-xl font-semibold py-2 px-4 rounded"
                onClick={handleMobileMenuToggle}
              >
                <RxCross2 />
              </div>
              <nav className="">
                
                {user.role === "shopkeeper" && (
                  <Link to={`/profile/${user._id}`} className="hover:text-gray-400">
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
                  <Link to={`/profile/${user._id}`} className="block px-2 py-2 text-gray-800 hover:text-gray-400">
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
                  </Link>
                )}
              </nav>
              <div className="flex gap-2 mr-2">
                <Link to="https://play.google.com/store/apps/details?id=com.ropbop">
                  <div className="text-black gap-1 px-3 border-2 shadow-xl rounded-3xl flex justify-center items-center hover:bg-[#272629] hover:text-white">
                    <FaGooglePlay alt="Google Play" className="text-2xl" />
                    <div className="mr-2">
                      <p className="text-sm font-light">coming soon</p>
                      <h1 className="font-semibold">Google Play</h1>
                    </div>
                  </div>
                </Link>
                <Link to="https://apps.apple.com/app/ropbop/id123456789">
                  <div className="text-black gap-1 px-3 border-2 shadow-xl rounded-3xl flex justify-center items-center hover:bg-[#272629] hover:text-white">
                    <FaApple alt="App Store" className="text-2xl" />
                    <div className="mr-2">
                      <p className="text-sm font-light">coming soon</p>
                      <h1 className="font-semibold">App Store</h1>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">RopBop</h1>
          </div>
        </div> */}

        <div className="sm:flex items-center">
          <h1 className="text-3xl font-bold text-black">RopBop</h1>
        </div>
        {/* <div className="flex gap-2 mr-2">
          <Link to="https://play.google.com/store/apps/details?id=com.ropbop">
            <div className="hidden gap-1 px-3 border rounded-3xl sm:flex justify-center items-center hover:text-gray-400">
              <FaGooglePlay alt="Google Play" className="text-2xl" />
              <div className="mr-2">
                <p className="text-sm font-light">coming soon</p>
                <h1 className="font-semibold">Google Play</h1>
              </div>
            </div>
          </Link>
          <Link to="https://apps.apple.com/app/ropbop/id123456789">
            <div className="hidden gap-1 px-3 border rounded-3xl sm:flex justify-center items-center hover:text-gray-400">
              <FaApple alt="App Store" className="text-2xl" />
              <div className="mr-2">
                <p className="text-sm font-light">coming soon</p>
                <h1 className="font-semibold">App Store</h1>
              </div>
            </div>
          </Link>
        </div> */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
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
          {profileMenuOpen && <CustomerProfile />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
