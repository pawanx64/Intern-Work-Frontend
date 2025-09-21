import React from 'react'
import { Search, Bell } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#F3F4F6] px-4 py-3 rounded-xl shadow-sm gap-3 sm:gap-0">
      {/* Left - Logo */}
      <div className="flex  text-lg font-semibold gap-4 text-gray-800">
        <div className='border-2 rounded-full px-2 py-1'>
            Logo
        </div>
        <div className='px-2 py-1'>
            VITA
        </div>
      </div>

     

      {/* Right - Button + Date */}
      <div className="flex items-center gap-3 justify-end">
        <div className="flex items-center gap-3 justify-center">
            <button className="p-2 rounded-full hover:bg-gray-200">
            <Search className="w-5 h-5  text-white bg-black rounded-full " />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200">
            <Bell className="w-5 h-5 text-white bg-black rounded-full" />
            </button>
        </div>
        <button className="bg-purple-500 hover:bg-purple-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full transition">
          Online Consultation
        </button>
        <span className="text-xs sm:text-sm text-gray-600">Wed,18 Apr</span>
      </div>
    </nav>
  )
}
