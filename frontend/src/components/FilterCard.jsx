import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productAtom } from "../atoms/store";

const FilterCard = () => {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [likes, setLikes] = useState("");
  const [rating, setRating] = useState("");
  const [filterData, setFilterData] = useState("");
  const [ratingToggle, setRatingToggle] = useState(false);
  const [products, setProducts] = useAtom(productAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const categoryFromUrl = urlParams.get("category");
    const cityFromUrl = urlParams.get("city");
    const ratingFromUrl = urlParams.get("rating");

    if (searchTermFromUrl || categoryFromUrl || cityFromUrl || ratingFromUrl) {
      setFilterData({
        searchTerm: searchTermFromUrl || "",
        category: categoryFromUrl || "",
        city: cityFromUrl || "",
        rating: ratingFromUrl || "",
      });
    }

    const fetchProducts = async () => {
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(
          `/api/product/getall?${searchQuery}`
        );
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, [window.location.search]);

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Philadelphia",
    "Gadchiroli",
    "fdkljflka",
  ];
  const categories = [
    "Food",
    "Drinks",
    "Shopping",
    "Entertainment",
    "Travel",
    "thwemape",
    "file003",
    "File002",
  ];
  const likesOptions = ["1-10", "11-20", "21-30", "31-40", "41-50"];

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setFilterData({ ...filterData, searchTerm: e.target.value });
    }
    if (e.target.id === "category") {
      setFilterData({ ...filterData, category: e.target.value });
    }
    if (e.target.id === "city") {
      setFilterData({ ...filterData, city: e.target.value });
    }
    if (e.target.id === "rating") {
      setFilterData({ ...filterData, rating: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (filterData.searchTerm !== undefined) {
      urlParams.set("searchTerm", filterData.searchTerm);
    }
    if (filterData.category !== undefined) {
      urlParams.set("category", filterData.category);
    }
    if (filterData.city !== undefined) {
      urlParams.set("city", filterData.city);
    }
    if (filterData.rating !== undefined) {
      urlParams.set("rating", filterData.rating);
    }
    const searchQuery = urlParams.toString();
    navigate(`/?${searchQuery}`);
  };

  return (
    <div>
      <div className="lg:hidden md:fixed w-full bg-white z-10  border-b-2 border-gray-950 py-2 mt-[53px]">
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
                id="city"
                value={filterData.city}
                onChange={handleChange}
                className="w-full text-sm text-gray-700 border-2 p-2 my-2"
              >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full px-4 py-2 mb-4 border-y-2 border-gray-300">
              <label className="block text-sm font-bold mb-2">Category</label>
              <select
                value={filterData.category}
                id="category"
                onChange={handleChange}
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
            <div className="w-full px-4 py-2 mb-4 border-y-2 border-gray-300">
            <label className="block text-sm font-bold mb-2">Rating</label>
              <div className="flex p-2 justify-between border-2 rounded-xl shadow-lg w-full">
                <div
                  onMouseOver={()=> setRatingToggle(true)}
                  className="flex flex-col justify-center items-center w-full"
                >
                  <input
                    type="range"
                    id="rating"
                    value={filterData.rating}
                    min="1"
                    max="5"
                    step="0.1"
                    onChange={handleChange}
                    className="w-full"
                  />

                  {ratingToggle && (
                    <span className="text-lg font-bold ml-2">
                      {filterData.rating}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            className="bg-gray-700 w-full hover:bg-gray-900 text-white font-bold py-2 px-4 my-2 rounded"
            onClick={handleSubmit}
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
