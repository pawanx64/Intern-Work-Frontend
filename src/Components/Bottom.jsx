import React from 'react'
import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export const Bottom = () => {
    const [activeTab, setActiveTab] = useState("Journal");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50">
      {/* Journal (takes 2 cols on large) */}
      <div className="lg:col-span-2 bg-gray-300 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col gap-4">
  {/* Tabs */}
  <div className="bg-purple-400 rounded-full p-1 flex">
    {["Journal", "Thought Garden", "Dream Assistant"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`flex-1 px-4 py-2 rounded-full text-sm sm:text-base font-medium transition ${
          activeTab === tab
            ? "bg-white text-purple-600 shadow"
            : "text-white hover:bg-purple-500"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Textarea */}
  <textarea
    placeholder="Describe your dream..."
    className="w-full h-28 sm:h-32 p-3 resize-none border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
  />

  {/* Analyse button */}
  <button className="self-end bg-purple-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow hover:bg-purple-700">
    Save Entry
  </button>

  {/* Journal entry */}
  <div className="border-t pt-3 text-xs sm:text-sm text-gray-700">
    <p>
      <span className="font-semibold">Dream Journal ✍️ </span> I was flying
      over a city filled with kittens 🐱
    </p>
  </div>
</div>


      {/* Right cards */}
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* Mood card */}
  <div className="bg-red-200 rounded-2xl shadow-md p-4">
    <h4 className="font-semibold text-sm sm:text-base text-gray-800">
      Mood = <span className="text-red-500">Sad</span>
    </h4>
    <p className="text-xs sm:text-sm text-gray-500">
      Here’s a playlist specially curated for you
    </p>

    {/* Controls */}
    <div className="flex items-center justify-between mt-3">
      <button><SkipBack className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" /></button>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-600 flex items-center justify-center text-white"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <Play className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>
      <button><SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" /></button>
    </div>

    {/* Progress Bar */}
    <div className="mt-2 w-full bg-gray-200 h-1.5 sm:h-2 rounded-full">
      <div className="h-full bg-purple-500 rounded-full" style={{ width: "40%" }}></div>
    </div>
  </div>

  {/* Hydration Reminder */}
  <div className="bg-blue-200 rounded-2xl shadow-md p-4">
    <h4 className="font-semibold text-sm sm:text-base text-gray-800">
      Hydration Reminder 💧
    </h4>
    <p className="text-xs sm:text-sm text-gray-500">
      You typically forget to drink water after lunch — set a reminder.
    </p>
    <button className="mt-2 bg-purple-600 text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:bg-purple-700">
      Set Reminder
    </button>
  </div>

  {/* Activity Suggestion */}
  <div className="bg-pink-200 rounded-2xl shadow-md p-4">
    <p className="text-xs sm:text-sm text-gray-700">
      Wanna show you amazing active effect with friend ✨
    </p>
    <button className="mt-2 bg-purple-600 text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:bg-purple-700">
      Try now →
    </button>
  </div>

  {/* Inspiration */}
  <div className="bg-green-300 rounded-2xl shadow-md p-4">
    <p className="text-xs sm:text-sm text-gray-700">
      Feeling inspired? Let’s turn your thoughts into music today 🎶
    </p>
    <button className="mt-2 text-purple-600 font-semibold text-xs sm:text-sm">
      →
    </button>
  </div>
</div>

    </div>
  )
}
