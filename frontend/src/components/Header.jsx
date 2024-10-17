import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    <header className="bg-zinc-800/40 z-10 fixed w-full text-white py-2 px-2">
      <div className="mx-auto flex justify-center items-center">
       
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
      </div>
    </header>
  );
};

export default Header;
