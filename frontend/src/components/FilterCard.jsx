import React, { useState } from "react";

const FilterCard = () => {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [likes, setLikes] = useState("");
  const [rating, setRating] = useState("");

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Philadelphia",
  ];
  const categories = ["Food", "Drinks", "Shopping", "Entertainment", "Travel"];
  const likesOptions = ["1-10", "11-20", "21-30", "31-40", "41-50"];
  const ratingOptions = ["1-2", "2-3", "3-4", "4-5"];

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleLikesChange = (e) => {
    setLikes(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  return (
    <div>
       <div className="lg:hidden md:fixed w-full bg-white  border-b-2 border-gray-950 py-2 mt-[53px]">
        <h2 className="text-xl font-bold mb-2 tracking-wide">Filter xyz</h2>
      </div>
      <div className="hidden md:hidden lg:block">
    <div className="lg:fixed lg:w-1/4 w-full lg:h-screen mt-14 bg-white shadow-xl border-2 rounded px-4 py-6">
      <div className="border-b-2 border-gray-950 mb-2">
        <h2 className="text-xl font-bold mb-2 tracking-wide">Filter</h2>
      </div>
      <div className="flex flex-wrap gap-2 flex-col mx-4">
        <div className="w-full px-4 py-2 mb-4 border-y-2 border-gray-300">
          <label className="text-sm font-bold">City</label>
          <select
            value={city}
            onChange={handleCityChange}
            className="w-full text-sm text-gray-700 border-2 p-2 my-2"
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
                <option
                  key={index}
                  value={city}
            
                >
                  {city}
                </option>
            ))}
          </select>
        </div>
        <div className="w-full px-4 py-2 mb-4 border-y-2 border-gray-300">
          <label className="block text-sm font-bold mb-2">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="block w-full text-sm text-gray-700 border-2 p-2 my-2"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full px-4 py-2 mb-4 border-y-2 border-gray-3">
          <label className="block text-sm font-bold mb-2">Likes</label>
          <select
            value={likes}
            onChange={handleLikesChange}
            className="block w-full text-sm text-gray-700 border-2 p-2 my-2"
          >
            <option value="">Select Likes</option>
            {likesOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full px-4 py-2 mb-4 border-y-2 border-gray-300">
          <label className="block text-sm font-bold mb-2">Rating</label>
          <select
            value={rating}
            onChange={handleRatingChange}
            className="block w-full text-sm text-gray-700 border-2 p-2 my-2"
          >
            <option value="">Select Rating</option>
            {ratingOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="bg-gray-700 w-full hover:bg-gray-900 text-white font-bold py-2 px-4 my-2 rounded"
        onClick={() => console.log("Filter applied!")}
      >
        Apply Filter
      </button>
    </div>
    </div>
    </div>
  );
};

export default FilterCard;
