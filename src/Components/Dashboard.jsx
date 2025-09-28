import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";

// Progress circle
function ProgressCircle({ percent, color }) {
  const radius = 20;
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width="50" height="50">
      <circle
        cx="25"
        cy="25"
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={stroke}
        fill="none"
      />
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
        transform="rotate(-90 25 25)" // makes it start from top
      />
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



const listVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
  }),
};

// Health Goal Card
// Health Goal Card with dismiss button
function HealthGoal({ percent, color, title, desc, onDismiss }) {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm">
      <div className="flex items-center gap-3">
        <ProgressCircle percent={percent} color={color} />
        <div>
          <h4 className="font-semibold text-sm text-gray-800">{title}</h4>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="text-gray-400 hover:text-red-500 transition"
      >
        ✕
      </button>
    </div>
  );
}

// ✅ Mood emojis + texts
const moodEmoji = {
  1: "🧘", // Focused
  2: "😢", // Sad
  3: "😌", // Relaxed
  4: "🤩", // Inspired
  5: "😁", // Elated
};

const moodMap = {
  1: { text: "Focused", color: "bg-green-300 text-green-800" },
  2: { text: "Sad", color: "bg-blue-200 text-blue-700" },
  3: { text: "Relaxed", color: "bg-purple-200 text-purple-700" },
  4: { text: "Inspired", color: "bg-pink-300 text-pink-800" },
  5: { text: "Elated", color: "bg-orange-300 text-orange-800" },
};

export const Dashboard = ({ refreshKey }) => {
  const [mood, setMood] = useState(null);
  const [health, setHealth] = useState({
    water_intake: { target: 0, progress: 0 },
    steps: { target: 0, progress: 0 },
    sleep: { target: 0, progress: 0 },
    screen_time: { target: 0, progress: 0 },
    mood: { progress: null },
  });

   const [recommendations, setRecommendations] = useState([]);

const dismissGoal = async (goalId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/recommendations/dismiss/${goalId}`, {
      method: "POST",
    });
    const data = await res.json();

    if (data.task && data.task.title) {
      // dynamically update the UI with new title/substitution
      setHealth((prev) => {
        const updated = { ...prev };

        if (goalId === "water") {
          updated.water_intake = { ...updated.water_intake, customTitle: data.task.title };
        }
        if (goalId === "sleep") {
          updated.sleep = { ...updated.sleep, customTitle: data.task.title };
        }
        if (goalId === "steps") {
          updated.steps = { ...updated.steps, customTitle: data.task.title };
        }
        if (goalId === "mood") {
          updated.mood = { ...updated.mood, customTitle: data.task.title };
        }

        return updated;
      });
    }
  } catch (err) {
    console.error("Error dismissing goal:", err);
  }
};



  // ✅ Fetch health data from backend
  const fetchHealth = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/health");
      const data = await res.json();
      setHealth({
        water_intake: data.water_intake || { target: 0, progress: 0 },
        steps: data.steps || { target: 0, progress: 0 },
        sleep: data.sleep || { target: 0, progress: 0 },
        screen_time: data.screen_time || { target: 0, progress: 0 },
        mood: data.mood || { progress: null },
      });
      setMood(data.mood?.progress || null);
    } catch (err) {
      console.error("Error fetching health data:", err);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, [refreshKey]);


  
  // Fetch recommendations
  const fetchRecommendations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/recommendations");
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    }
  };

  useEffect(() => {
    fetchHealth();
    fetchRecommendations();
  }, [refreshKey]);

  // ✅ Save mood to backend + update frontend + MongoDB
  const updateMood = async (val) => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/health/mood/progress", // backend route
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ progress: val }),
        }
      );
      if (!res.ok) throw new Error("Failed to update mood");
      const updated = await res.json();
      setMood(updated.progress); // updates emoji in left panel
      setHealth((prev) => ({ ...prev, mood: updated })); // updates mood card
    } catch (err) {
      console.error("Error updating mood:", err);
    }
  };

  const calcPercent = (progress, target) =>
    target ? Math.min(100, Math.round((progress / target) * 100)) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 sm:p-6 bg-gray-50 items-start">
      {/* LEFT PANEL */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center h-full">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 flex items-center justify-center text-4xl">
          {mood ? moodEmoji[mood] : "😐"}
        </div>
        <h2 className="mt-3 font-semibold text-base sm:text-lg text-center">
          WHAT’S YOUR MOOD TODAY?
        </h2>
        <div className="flex gap-2 sm:gap-3 mt-4 flex-wrap justify-center">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              className={`w-6 h-6 rounded-full ${
                mood === val ? "ring-2 ring-black" : ""
              }`}
              style={{
                backgroundColor:
                  val === 1
                    ? "#4ade80"
                    : val === 2
                    ? "#60a5fa"
                    : val === 3
                    ? "#c084fc"
                    : val === 4
                    ? "#f472b6"
                    : "#f97316",
              }}
              onClick={() => updateMood(val)} // ✅ updates MongoDB + UI
            />
          ))}
        </div>
      </div>

      {/* MIDDLE PANEL */}
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-base sm:text-lg text-gray-800">
            General Metrics
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mood card */}
          <div className="bg-gray-200 rounded-2xl p-4 shadow-md flex flex-col">
            <h4 className="font-semibold text-sm sm:text-base text-gray-800">
              Mood
            </h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {mood && moodMap[mood] ? (
                <span
                  className={`px-3 py-1 text-xs rounded-full ${moodMap[mood].color}`}
                >
                  {moodMap[mood].text}
                </span>
              ) : (
                <span className="text-gray-400 text-xs">Not set yet</span>
              )}
            </div>
          </div>

          {/* Sleep + Water Intake */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-200 rounded-2xl p-4 shadow-md">
              <h4 className="text-xs sm:text-sm font-medium text-gray-600">
                Sleep <span className="text-green-500 ml-1">● Synced</span>
              </h4>
              <p className="text-xl sm:text-2xl font-bold">
                {health.sleep?.progress ?? 0}{" "}
                <span className="text-gray-500">
                  / {health.sleep?.target ?? 0} h
                </span>
              </p>
            </div>
            <div className="bg-gray-200 rounded-2xl p-4 shadow-md">
              <h4 className="text-xs sm:text-sm font-medium text-gray-600">
                Water Intake{" "}
                <span className="text-green-500 ml-1">● Synced</span>
              </h4>
              <p className="text-xl sm:text-2xl font-bold">
                {health.water_intake?.progress ?? 0}{" "}
                <span className="text-gray-500">
                  / {health.water_intake?.target ?? 0} 🥤
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-gray-200 rounded-2xl p-4 h-full shadow-md">
          <h4 className="font-semibold text-sm sm:text-base text-gray-800">
            Steps <span className="text-green-500 ml-1">● Synced</span>
          </h4>
          <div className="h-40 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { day: "Mon", steps: health.steps?.progress || 0 },
                  { day: "Tue", steps: health.steps?.progress || 0 },
                  { day: "Wed", steps: health.steps?.progress || 0 },
                  { day: "Thu", steps: health.steps?.progress || 0 },
                  { day: "Fri", steps: health.steps?.progress || 0 },
                  { day: "Sat", steps: health.steps?.progress || 0 },
                  { day: "Sun", steps: health.steps?.progress || 0 },
                ]}
              >
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
          <p className="text-xs text-gray-500 mt-2">
            Today: {health.steps?.progress ?? 0} / {health.steps?.target ?? 0}{" "}
            steps
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col gap-4 h-full">
        <h3 className="font-semibold text-base sm:text-lg text-gray-800">
          Health Goals
        </h3>

        <motion.div
  className="flex flex-col gap-3"
  initial="hidden"
  animate="visible"
>
  {[
    {
      id: "water",
      percent: calcPercent(
        health.water_intake?.progress ?? 0,
        health.water_intake?.target ?? 0
      ),
      color: "#10b981",
      title: `Drink ${health.water_intake?.target ?? 0} glasses of water`,
      desc: `${
        (health.water_intake?.target ?? 0) -
        (health.water_intake?.progress ?? 0)
      } more to go`,
    },
    {
      id: "sleep",
      percent: calcPercent(
        health.sleep?.progress ?? 0,
        health.sleep?.target ?? 0
      ),
      color: "#6366f1",
      title: `Sleep ${health.sleep?.target ?? 0} hours`,
      desc: `You slept ${health.sleep?.progress ?? 0}h out of ${
        health.sleep?.target ?? 0
      }h`,
    },
    {
      id: "steps",
      percent: calcPercent(
        health.steps?.progress ?? 0,
        health.steps?.target ?? 0
      ),
      color: "#ec4899",
      title: `Walk ${health.steps?.target ?? 0} steps`,
      desc: `${
        (health.steps?.target ?? 0) - (health.steps?.progress ?? 0)
      } steps left`,
    },
  ]
    // ✅ filter out completed goals
    .filter((goal) => goal.percent < 100)
    .map((goal, i) => (
      <motion.div
        key={goal.id}
        custom={i}
        variants={listVariants}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <HealthGoal
          percent={goal.percent}
          color={goal.color}
          title={health[goal.id]?.customTitle || goal.title}
          desc={goal.desc}
          onDismiss={() => dismissGoal(goal.id)}
        />
      </motion.div>
    ))}
</motion.div>



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
