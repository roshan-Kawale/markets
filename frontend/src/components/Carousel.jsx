import React, { useState } from 'react'
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

function Carousel({imageUrls}) {
    const [currentIndex , setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? imageUrls.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === imageUrls.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

  return (
    <div className='relative h-96 w-full group'>
      <div>
      <img
            className="w-full h-96 content-center"
            src={imageUrls[currentIndex]}
            alt="Product"
          />
      </div>
      {imageUrls.length > 1 && <div className = "absolute hidden group-hover:block top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronLeft onClick={prevSlide} size={30}/>
      </div>}
      {imageUrls.length > 1 && <div className = "absolute hidden group-hover:block top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
       <BsChevronRight onClick={nextSlide} size={30}/>
      </div>}
    </div>
  )
}

export default Carousel
