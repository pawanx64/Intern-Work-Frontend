import React from 'react'
import { Navbar } from '../Components/Navbar'
import { Dashboard } from '../Components/Dashboard'
import { Bottom } from '../Components/Bottom'
import { Sidebar } from '../Components/Sidebar'
import { useState } from 'react'
export const Homes = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);
  return (
      <div className="flex h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 flex flex-col">
        {/* Navbar at the top */}
        <Navbar onUpdate={triggerRefresh}/>

        {/* Main Dashboard in the middle */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Dashboard refreshKey={refreshKey}/>
          <Bottom />
        </div>
      </div>
    </div>
  )
}
