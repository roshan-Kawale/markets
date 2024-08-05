import React from 'react'
import { MdOutlineBookmarkAdd } from "react-icons/md";

function ProductCardDetail() {
  
  return (
    <div className="bg-gray-100 font-sans">
      <div className="flex justify-evenly gap-4 px-10 items-center flex-col lg:flex-row border-2 h-screen">
        <div className="flex flex-col w-[250px] h-auto p-2 items-start gap-6">
          <h1 className="flex flex-wrap text-4xl font-bold text-gray-800">
            NIKE <br /> AIR MAX BOLT
          </h1>
          <p className="text-2xl font-bold text-gray-800">
            349,99 PLN
          </p>
          <div className="flex gap-2 items-center bg-white w-full border-2">
            <select
              id="size"
              className="w-full rounded px-3 py-2"
            >
              <option value="">Size</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
            </select>
          </div>
          <div className='flex justify-between items-center w-full bg-yellow-500'>
          <button className="hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
            ADD TO CART
          </button>
          <MdOutlineBookmarkAdd className='text-xl mr-2' />
          </div>
        </div>
        <div className='border-2 w-96 h-96'>
        <img
            src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?cs=srgb&dl=pexels-craytive-1456706.jpg&fm=jpg"
            alt="Nike Air Max Bolt"
            className="w-full h-full rounded-md bg-slate-200"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          
          <div className="flex lg:flex-col   justify-center mt-4 gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1695073621086-aa692bc32a3d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmlrZSUyMHNob2V8ZW58MHx8MHx8fDA%3D"
                alt="Nike Air Max Bolt"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1695073621086-aa692bc32a3d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmlrZSUyMHNob2V8ZW58MHx8MHx8fDA%3D"
                alt="Nike Air Max Bolt"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1695073621086-aa692bc32a3d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmlrZSUyMHNob2V8ZW58MHx8MHx8fDA%3D"
                alt="Nike Air Max Bolt"
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default ProductCardDetail
