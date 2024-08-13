import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

function EmployeeProfile() {
  
  return (
    <div className="bg-zinc-700 text-white p-4 sm:h-screen">
      <div className="flex flex-col gap-4 sm:fixed justify-start items-center">
        <div className="bg-gray-950  sm:fixed sm:w-[96vw] sm:h-[33vh] rounded-3xl p-4 flex flex-col">
         
          <div className="flex items-start sm:flex-row gap-8 px-4 py-4 ">
            <div className="">
              <img
                src="https://i.pravatar.cc/300"
                alt="Employee Profile"
                className="rounded-full w-20 h-20 mx-auto mb-4"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-2">
              <div>
                <h3 className="text-lg font-bold mb-2">Natashia Khaleira</h3>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-8">
                <div className="text-sm mb-2 flex flex-col gap-1">
                  <span className="text-gray-400 ">Role</span>
                   <span className="font-semibold">Head of UX Design</span>
                </div>
                <div className="text-sm mb-2 flex flex-col gap-1">
                  <span className="text-gray-400 ">Phone Number</span>
                  <span className="font-semibold">(+62) 812 3456-7890</span>
                </div>
                <div className="text-sm mb-2 flex flex-col gap-1">
                  <span className="text-gray-400 ">Email Adress</span>
                  
                  <span className="font-semibold">natasiakhaleira@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="absolute right-8 top-6 cursor-pointer"><CiEdit size={25}/>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:px-4">
            <div className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#2e2d2d]/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>

              <div className="flex flex-col gap-1">
                <p className="text-sm">309</p>
                <p className="text-xs">Total Attendance</p>
              </div>
            </div>

            <div className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#2e2d2d]/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex flex-col gap-1">
                <p className="text-sm">08:46</p>
                <p className="text-xs">Avg Check In Time</p>
              </div>
            </div>
            <div className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#2e2d2d]/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex flex-col gap-1">
                <p className="text-sm">17:04</p>
                <p className="text-xs">Avg Check Out Time</p>
              </div>
            </div>
            <div className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#2e2d2d]/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm">Role Model</p>
                <p className="text-xs">Employee Predicate</p>
              </div>
            </div>
          </div>
        </div>
        {/* second div */}
        <div className="bg-gray-950 rounded-3xl sm:mt-[34vh] h-[62vh] w-[96vw] relative overflow-y-scroll">
         <div className="flex px-8 py-4 gap-2 justify-start items-center sm:fixed w-[95vw] rounded-tl-3xl bg-gray-950">
          <div className="w-2 h-9 rounded-md bg-[#1ed41e]"></div>
          <h2 className="text-xl">Posts</h2>
         </div>
        <div className="rounded-md sm:p-8 flex flex-wrap justify-center items-center sm:justify-normal gap-3 sm:mt-12">
        {[...Array(50)].map(()=>(
          <div>
          <img
            src="https://i.pravatar.cc/300"
            alt="Employee Profile"
            className="w-32 h-32 sm:h-40 sm:w-40 rounded-xl mx-auto mb-4"
          />
        </div>
        ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
