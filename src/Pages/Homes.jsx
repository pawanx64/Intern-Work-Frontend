import React from 'react'
import { Navbar } from '../Components/Navbar'
import { Dashboard } from '../Components/Dashboard'
import { Bottom } from '../Components/Bottom'
import { Sidebar } from '../Components/Sidebar'

export const Homes = () => {
  return (
      <div className="flex h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 flex flex-col">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main Dashboard in the middle */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Dashboard />
          <Bottom />
        </div>
      </div>
    </div>
  )
}
