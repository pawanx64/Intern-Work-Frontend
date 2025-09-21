import React from 'react'
import { Home, Heart, RotateCcw, HelpCircle, Settings } from "lucide-react";


export const Sidebar = () => {
  return (
    <div className="flex flex-col items-center w-16 bg-purple-50 rounded-2xl py-6 justify-between h-screen shadow-md">
      
      {/* Top Section */}
      <div className="flex flex-col items-center gap-6">
        {/* Profile */}
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* MAIN label */}
        <span className="text-[10px] font-semibold text-gray-500">MAIN</span>

        {/* Main Icons */}
        <div className="flex flex-col items-center gap-6 mt-2">
          <button className="p-2 rounded-full bg-black text-white">
            <Home className="w-5 h-5" />
          </button>
          <button className="relative p-2 text-gray-700 hover:text-purple-600">
            <Heart className="w-5 h-5" />
            {/* Red dot indicator */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 text-gray-700 hover:text-purple-600">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center gap-6">
        <span className="text-[10px] font-semibold text-gray-500">EXTRA</span>
        <button className="p-2 text-gray-700 hover:text-purple-600">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-700 hover:text-purple-600">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
