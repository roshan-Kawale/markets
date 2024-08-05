import React from 'react'
import { CgMoreVerticalO } from "react-icons/cg";
import { FaImage } from "react-icons/fa";

function CommentCard() {
  return (
    <div className="relative overflow-scroll md:flex flex-col p-2 right-0 md:fixed h-screen md:w-1/3 lg:w-1/4 border-2 lg:mt-14 md:mt-28 hidden">   
       
      { [...Array(6)].map(() => (
        <div className="bg-slate-200 border-2 rounded-md p-4 mb-4">
        <div className="flex items-center mb-2">
          <img
            src="https://placehold.co/64"
            alt="Profile Picture"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <h3 className="font-medium text-gray-800">Vitaliy Boyko</h3>
            <p className="text-gray-600 text-sm">3 hours ago</p>
          </div>
          <div className="ml-auto">
            <CgMoreVerticalO className="text-xl" />
          </div>
        </div>
        <p className="text-gray-700 flex flex-wrap">
          I chose a wonderful coffee today, I wanted to tell you what product they
          have in stock - it's a latte with coconut 🥥 milk... delicious... it's
          really incredibly tasty!!! 😀
        </p>
      </div>
      )) }
      <div className="md:mb-60 lg:mb-44">
      </div>

      <div className="fixed md:bottom-4 lg:bottom-4 md:w-1/3 md:right-4 lg:w-1/5 lg:right-10 bg-white rounded-md">
      <div className='border-2 p-2'>
        <div className="flex items-center mb-2">
          <img
            src="https://placehold.co/64"
            alt="Profile Picture"
            className="w-8 h-8 rounded-full mr-2"
          />
          <input
            type="text"
            placeholder="Share something"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <div className="flex items-center justify-between">
        
          <button className="flex gap-2 items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200">
          <FaImage />
          <span>Images</span>
          </button>
          
      
          <button className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-900 text-white">
            Send
          </button>
        </div>
        </div>
      </div>

      </div>
  )
}

export default CommentCard
