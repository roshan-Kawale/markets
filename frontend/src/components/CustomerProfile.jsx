import React from "react";

function CustomerProfile() {
  return (
    <div className="absolute right-5 top-10 text-black rounded-md shadow-md ">
   <div class="p-4 flex flex-col justify-center items-center gap-1 backdrop-blur-md border w-80 rounded-xl shadow-2xl">
    <div class="rounded-lg w-64 bg-[#f1f2f5] py-2 my-2 flex shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.1)]">
   <p class="font-semibold ml-4">Roshan Kawale <span className="text-sm font-light">(Account)</span></p>
</div>
<div class="rounded-lg w-64 bg-[#d0d7ee] py-2 my-2 flex shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.1)]">
   <p class="font-semibold ml-4">WishList</p>
</div>
<div class="rounded-lg w-64 bg-[#d0d7ee] py-2 my-2 flex shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.1)]">
   <p class="font-semibold ml-4">Orders</p>
</div>
    </div>
    </div>
  );
}

export default CustomerProfile;
