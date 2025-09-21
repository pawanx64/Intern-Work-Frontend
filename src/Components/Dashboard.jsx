import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Progress circle
function ProgressCircle({ percent, color }) {
  const radius = 20;
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width="50" height="50">
      {/* Background Circle */}
      <circle
        cx="25"
        cy="25"
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={stroke}
        fill="none"
      />
      {/* Progress Circle */}
      <circle
        cx="25"
        cy="25"
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 25 25)"  // ✅ rotate only this circle
      />
      {/* Percentage Text */}
      <text
        x="25"
        y="30"
        textAnchor="middle"
        className="fill-gray-800 text-xs font-semibold"
      >
        {percent}%
      </text>
    </svg>
  );
}

// Health Goal Card
function HealthGoal({ percent, color, title, desc }) {
  return (
    <div className="flex items-center gap-3 bg-gray-300  bg-white p-3 rounded-xl shadow-sm">
      <ProgressCircle percent={percent} color={color} />
      <div>
        <h4 className="font-semibold text-sm text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
    </div>
  );
}

// Steps placeholder
const stepsData = [
  { day: "Mon", steps: 4200 },
  { day: "Tue", steps: 5300 },
  { day: "Wed", steps: 6100 },
  { day: "Thu", steps: 8750 },
  { day: "Fri", steps: 6750 },
  { day: "Sat", steps: 7200 },
  { day: "Sun", steps: 5900 },
];

// Dashboard
export const Dashboard = () => {
  const [mood, setMood] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 sm:p-6 bg-gray-50 items-start">
      
      {/* LEFT PANEL */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center h-full">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 flex items-center justify-center text-4xl">
          😊
        </div>
        <h2 className="mt-3 font-semibold text-base sm:text-lg text-center">
          WHAT’S YOUR MOOD TODAY?
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 text-center">
          Tell Vita how you’re feeling today
        </p>
        <div className="flex gap-2 sm:gap-3 mt-4 flex-wrap justify-center">
          {["bg-red-400", "bg-yellow-400", "bg-green-400", "bg-blue-400", "bg-purple-400"].map((color, i) => (
            <button
              key={i}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${color} ${mood === i ? "ring-2 ring-black" : ""}`}
              onClick={() => setMood(i)}
            />
          ))}
        </div>
      </div>

      {/* MIDDLE PANEL */}
      
     <div className="flex flex-col gap-4 h-full">
  {/* Header */}
  <div className="flex items-center justify-between">
    <h3 className="font-semibold text-base sm:text-lg text-gray-800">
      General Metrics
    </h3>
    <span className="text-xs sm:text-sm text-gray-500 cursor-pointer">
      Last Week ▼
    </span>
  </div>

  {/* Mood + Sleep/Water */}
  <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Mood card */}
    <div className="bg-gray-200 rounded-2xl p-4 shadow-md flex flex-col">
      <h4 className="font-semibold text-sm sm:text-base text-gray-800">
        Mood <span className="text-gray-400">➕</span>
      </h4>
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { text: "Focused", color: "bg-green-300 text-green-800" },
          { text: "Sad", color: "bg-blue-200 text-blue-700" },
          { text: "Relaxed", color: "bg-purple-200 text-purple-700" },
          { text: "Inspired", color: "bg-pink-300 text-pink-800" },
          { text: "Elated", color: "bg-orange-300 text-orange-800" },
        ].map((m, i) => (
          <span
            key={i}
            className={`px-3 py-1 text-xs rounded-full ${m.color}`}
          >
            {m.text}
          </span>
        ))}
      </div>
    </div>

    {/* Sleep + Water Intake stacked */}
    <div className="flex flex-col gap-4">
      {/* Sleep */}
      <div className="bg-gray-200 rounded-2xl p-4 shadow-md flex flex-col justify-between">
        <h4 className="text-xs sm:text-sm font-medium text-gray-600">
          Sleep <span className="text-green-500 ml-1">● Synced</span>
        </h4>
        <p className="text-xl sm:text-2xl font-bold">
          7 <span className="text-gray-500">/ 8 h</span>
        </p>
      </div>

      {/* Water Intake */}
      <div className="bg-gray-200 rounded-2xl p-4 shadow-md flex flex-col justify-between">
        <h4 className="text-xs sm:text-sm font-medium text-gray-600">
          Water Intake <span className="text-green-500 ml-1">● Synced</span>
        </h4>
        <p className="text-xl sm:text-2xl font-bold">
          5 <span className="text-gray-500">/ 8 🥤</span>
        </p>
      </div>
    </div>
  </div>

  {/* Steps (full width) */}
 <div className="bg-gray-200 rounded-2xl p-4 h-full shadow-md">
      <h4 className="font-semibold text-sm sm:text-base text-gray-800">
        Steps <span className="text-green-500 ml-1">● Synced</span>
      </h4>

      {/* Chart */}
      <div className="h-40 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stepsData}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
              formatter={(value) => [`${value} steps`, ""]}
            />
            <Line
              type="monotone"
              dataKey="steps"
              stroke="#7C3AED"
              strokeWidth={3}
              dot={{ r: 4, fill: "#7C3AED" }}
              activeDot={{ r: 6, fill: "#7C3AED" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-500 mt-2">Fri: 6,750 steps</p>
    </div>
</div>


      {/* RIGHT PANEL */}
      <div className="flex flex-col gap-4 h-full">
  {/* Section Header */}
  <h3 className="font-semibold text-base sm:text-lg text-gray-800">
    Health Goals
  </h3>

  {/* Health Goals List */}
  <div className="flex flex-col bg-gray-300 gap-3">
    <HealthGoal
       
      percent={62}
      color="#10b981"
      title="Drink 3 liters of water daily"
      desc="0.9 liters more needed by the end of the day"
    />
    <HealthGoal
      percent={65}
      color="#6366f1"
      title="Daily proteins 1000 Kcal"
      desc="You have almost met today’s protein goal"
    />
    <HealthGoal
      percent={80}
      color="#ec4899"
      title="New habit: Start daily yoga"
      desc="Just one more this week to stay on track"
    />
  </div>

  {/* Yoga Banner */}
  <div className="bg-white rounded-2xl shadow-md overflow-hidden relative">
    <img
      src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1"
      alt="Yoga"
      className="h-36 w-full object-cover"
    />
    
  </div>
</div>

    </div>
  );
};
