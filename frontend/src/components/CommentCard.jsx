import React, { useEffect, useState } from "react";
import { CgMoreVerticalO } from "react-icons/cg";
import { FaImage } from "react-icons/fa";
import { fetchData } from "./ProductCard";
import { useAtom } from "jotai";
import { productAtom, userAtom } from "../atoms/store";
import { Link } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";

const CommentCardData = ({ Comments, productId }) => {
  const [commentValue, setCommentValue] = useState("");
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useAtom(productAtom);

  const fetchData = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `/api/product/getall?${searchQuery}`
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addCommentHandler = async ({ e, id }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `/api/product/comment/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id, comment: commentValue }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    } finally {
      fetchData(); // Call fetchData again to re-fetch the product data
    }
  };

  return (
    <ScrollArea >
      {Comments.map((comment, index) => (
        <div className="border-y-2 border-gray-800 rounded-md p-4 mb-4 cursor-text">
          <div className="flex items-center mb-2">
            <img
              src="https://placehold.co/64"
              alt="Profile Picture"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className='flex flex-wrap items-center'>
              <h3 className="font-medium text-white">
                {comment?.user.name}
              </h3>

              {comment?.user.role === "shopkeeper" && (
                <Link  to={`/profile/${comment?.user._id}`} className="text-gray-200 ml-1 text-sm">({comment?.user.role})</Link>
              )}
            </div>
            {/* <div className="ml-auto">
              <CgMoreVerticalO className="text-xl" />
            </div> */}
          </div>
          <p className="text-white flex flex-wrap">{comment?.comment}</p>
        </div>
      ))}
      <div className="md:mb-[500px] lg:mb-[460px] mb-[90px]"></div>
      <div className="hidden sm:block"> 
        <form
          onSubmit={(e) => addCommentHandler({ e, id: productId })}
          className="fixed md:bottom-0 lg:bottom-0 md:w-1/2 md:right-4 lg:w-1/4 lg:right-10 bg-black rounded-md"
        >
          <div className="border-2 border-gray-800 p-2">
            <div className="flex items-center mb-2">
              <img
                src="https://placehold.co/64"
                alt="Profile Picture"
                className="w-8 h-8 rounded-full mr-2"
              />
              <input
                type="text"
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="Share something"
                className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="flex gap-2 items-center px-4 py-2 rounded-md bg-black border-2 border-gray-800 hover:border-gray-200">
                <FaImage />
                <span>Images</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-900 text-white"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="block sm:hidden"> 
        <form
          onSubmit={(e) => addCommentHandler({ e, id: productId })}
          className="fixed bg-black rounded-md right-4 bottom-0 w-11/12"
        >
          <div className="border-2 border-gray-800 p-2">
            <div className="flex items-center mb-2">
              <img
                src="https://placehold.co/64"
                alt="Profile Picture"
                className="w-8 h-8 rounded-full mr-2"
              />
              <input
                type="text"
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="Share something"
                className="w-full px-3 py-2 rounded-md border bg-transparent text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="flex gap-2 items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200">
                <FaImage />
                <span>Images</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-900 text-white"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
};

function CommentCard({ Comments, productId }) {
  return (
    <>
      <div className="relative  md:flex flex-col h-screen p-2 right-0 lg:right-10 md:fixed md:w-1/2 lg:w-1/4 border-2 border-gray-800 lg:mt-14 md:mt-28 hidden">

        <CommentCardData Comments={Comments} productId={productId} />
        
      </div>
      <div className="relative sm:hidden flex flex-col right-0">
        <CommentCardData Comments={Comments} productId={productId} />
      </div>
    </>
  );
}

export default CommentCard;
