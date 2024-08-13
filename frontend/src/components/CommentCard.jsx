import React, { useEffect, useState } from 'react'
import { CgMoreVerticalO } from "react-icons/cg";
import { FaImage } from "react-icons/fa";
import { fetchData } from './ProductCard';
import { useAtom } from "jotai";
import { productAtom, userAtom } from "../atoms/store";


function CommentCard({Comments , productId}) {
  const [products, setProducts] = useAtom(productAtom);
  const [commentValue, setCommentValue] = useState("");
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const searchQuery = urlParams.toString();
      const res = await fetch(`http://localhost:5000/api/product/getall?${searchQuery}`)
      const data = await res.json();
      setProducts(data)
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
      const res = await fetch(`http://localhost:5000/api/product/comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id , comment : commentValue }),
      });
      const data = await res.json();
      console.log(data)
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
    <div className="relative overflow-scroll md:flex flex-col h-screen p-2 right-0 md:fixed md:w-1/3 lg:w-1/4 border-2 lg:mt-14 md:mt-28 hidden">   
       
      { Comments.map((comment , index) => (
        <div className="bg-slate-200 border-2 rounded-md p-4 mb-4">
        <div className="flex items-center mb-2">
          <img
            src="https://placehold.co/64"
            alt="Profile Picture"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <h3 className="font-medium text-gray-800">{comment?.user.name}</h3>

            {comment?.user.role=== "shopkeeper" && <p className="text-gray-600 text-sm">{comment?.user.role}</p>}
          </div>
          <div className="ml-auto">
            <CgMoreVerticalO className="text-xl" />
          </div>
        </div>
        <p className="text-gray-700 flex flex-wrap">
         {comment?.comment}
        </p>
      </div>
      )) }
      <div className="md:mb-[500px] lg:mb-[400px]">
      </div>

      <form onSubmit={(e)=> addCommentHandler({e, id: productId})} className="fixed md:bottom-4 lg:bottom-4 md:w-1/3 md:right-4 lg:w-1/5 lg:right-10 bg-white rounded-md">
      <div className='border-2 p-2'>
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <div className="flex items-center justify-between">
        
          <button className="flex gap-2 items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200">
          <FaImage />
          <span>Images</span>
          </button>
          
      
          <button type="submit" className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-900 text-white">
            Send
          </button>
        </div>
        </div>
      </form>

      </div>
  )
}

export default CommentCard
