import React, { useState, useEffect } from "react";
import { Search, Bell, ClipboardList } from "lucide-react";

export const Navbar = ({onUpdate}) => {
  const [date, setDate] = useState("");
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  const [health, setHealth] = useState({
    water_intake: { target: 0, progress: 0 },
    steps: { target: 0, progress: 0 },
    sleep: { target: 0, progress: 0 },
    screen_time: { target: 0, progress: 0 },
    mood: { progress: null },
  });

  const [inputs, setInputs] = useState({});

  // Date
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    setDate(today);
  }, []);

  // Fetch from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((data) => {
        const normalized = {
          water_intake: data.water_intake || { target: 0, progress: 0 },
          steps: data.steps || { target: 0, progress: 0 },
          sleep: data.sleep || { target: 0, progress: 0 },
          screen_time: data.screen_time || { target: 0, progress: 0 },
          mood: data.mood || { progress: null },
        };

        setHealth(normalized);
        setInputs(
          Object.fromEntries(
            Object.entries(normalized).map(([metric, v]) => [
              metric,
              {
                target: v.target ?? "",
                progress: v.progress ?? "",
              },
            ])
          )
        );
      })
      .catch((err) => console.error("Error fetching health data:", err));
  }, []);

  // Save all targets in one go
  const saveAllTargets = async () => {
    try {
      // ✅ filter out empty/invalid values
      const payload = Object.fromEntries(
        Object.entries(inputs)
          .filter(([metric, val]) => val.target && val.target > 0)
          .map(([metric, val]) => [metric, { target: val.target }])
      );

      const res = await fetch("http://localhost:5000/api/health/targets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save all targets");
      const updated = await res.json();
      setHealth(updated);
      setIsTargetModalOpen(false);
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error(err);
      alert("Error saving targets");
    }
  };

  // Save all progress in one go
  const saveAllProgress = async () => {
    try {
      // ✅ filter out empty/invalid values
      const payload = Object.fromEntries(
        Object.entries(inputs)
          .filter(
            ([metric, val]) =>
              val.progress !== "" && val.progress !== null && !isNaN(val.progress)
          )
          .map(([metric, val]) => [metric, { progress: val.progress }])
      );

      const res = await fetch("http://localhost:5000/api/health/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update all progress");
      const updated = await res.json();
      setHealth(updated);
      setIsProgressModalOpen(false);
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error(err);
      alert("Error updating progress");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#F3F4F6] px-4 py-3 rounded-xl shadow-sm">
        <div className="flex text-lg font-semibold gap-4 text-gray-800">
          <div className="border-2 rounded-full px-2 py-1">Logo</div>
          <div className="px-2 py-1">VITA</div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsTargetModalOpen(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-full hover:bg-green-600 text-sm"
          >
            <ClipboardList className="w-4 h-4" />
            Set Target
          </button>
          <button
            onClick={() => setIsProgressModalOpen(true)}
            className="flex items-center gap-2 bg-purple-500 text-white px-3 py-1.5 rounded-full hover:bg-purple-600 text-sm"
          >
            <ClipboardList className="w-4 h-4" />
            Update Progress
          </button>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Search className="w-5 h-5 text-white bg-black rounded-full" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Bell className="w-5 h-5 text-white bg-black rounded-full" />
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1.5 rounded-full">
            Online Consultation
          </button>
          <span className="text-xs text-gray-600">{date}</span>
        </div>
      </nav>

      {/* Target Modal */}
{isTargetModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-xl p-6 shadow-lg w-96 max-h-[90vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Set Targets</h3>
      <ul className="space-y-3">
        {Object.entries(health)
          .filter(([metric]) => !["_id", "__v", "mood"].includes(metric)) // 🚫 exclude unwanted keys
          .map(([metric]) => (
            <li key={metric} className="flex justify-between items-center">
              <span className="capitalize">{metric.replace("_", " ")}</span>
              <input
                type="number"
                min="1"
                value={inputs[metric]?.target ?? ""}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [metric]: {
                      ...prev[metric],
                      target: parseFloat(e.target.value) || "",
                    },
                  }))
                }
                className="border rounded px-2 py-1 w-20 text-sm"
              />
            </li>
          ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setIsTargetModalOpen(false)}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
        >
          Close
        </button>
        <button
          onClick={saveAllTargets}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm"
        >
          Save All
        </button>
      </div>
    </div>
  </div>
)}

{/* Progress Modal */}
{isProgressModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-xl p-6 shadow-lg w-96 max-h-[90vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Update Progress</h3>
      <ul className="space-y-3">
        {Object.entries(health)
          .filter(([metric]) => !["_id", "__v"].includes(metric)) // 🚫 exclude unwanted keys
          .map(([metric, data]) => (
            <li key={metric} className="flex justify-between items-center">
              <span className="capitalize">{metric.replace("_", " ")}</span>
              <input
                type="number"
                min={metric === "mood" ? 1 : 0}
                max={metric === "mood" ? 5 : data.target || 9999}
                value={inputs[metric]?.progress ?? ""}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [metric]: {
                      ...prev[metric],
                      progress: parseFloat(e.target.value) || "",
                    },
                  }))
                }
                className="border rounded px-2 py-1 w-20 text-sm"
              />
            </li>
          ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setIsProgressModalOpen(false)}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
        >
          Close
        </button>
        <button
          onClick={saveAllProgress}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 rounded text-sm"
        >
          Update All
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};
