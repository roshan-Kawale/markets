import React from 'react'
import { Link } from 'react-router-dom';
import { ScrollArea } from './ui/scroll-area';

const LikeCardData = ({Likes}) => {
  return (
    <ScrollArea>
    { Likes && Likes.map((Like , index) => (
        <div key={index} className=" border-y-2 border-gray-800 rounded-md p-4 py-2 mb-4">
        <div className="flex items-center mb-2">
          <img
            src="https://placehold.co/64"
            alt="profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className='flex gap-2 items-center'>
            <h3 className="font-medium text-white">{Like?.name}</h3>

            {Like?.role=== "shopkeeper" && <Link to={`/profile/${Like?._id}`} className="text-gray-200 text-sm cursor-pointer">
              ({Like?.role})
              </Link>}
          </div>
        </div>
      </div>
      )) }
    </ScrollArea>
  )
}


function LikeCard({Likes}) {

  return (
    <>
    <div className="relative md:flex flex-col h-screen p-2 right-0 lg:right-10 md:fixed md:w-1/2 lg:w-1/4 border-2 border-gray-800 lg:mt-14 md:mt-28 hidden">   
       <LikeCardData Likes={Likes}/>
      </div>

<div className="relative  sm:hidden flex flex-col right-0">   
<LikeCardData Likes={Likes}/>

</div>

</>
  )
}

export default LikeCard
