import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 🎶 Define playlists per mood
const playlists = {
  1: { mood: "Focused", color: "text-green-600", songs: ["🎧 Lofi beats", "🎵 Calm piano", "🎶 White noise"] },
  2: { mood: "Sad", color: "text-blue-600", songs: ["💔 Sad ballad", "🎻 Violin vibes", "🎤 Soft rock"] },
  3: { mood: "Relaxed", color: "text-purple-600", songs: ["🌊 Ocean waves", "🎶 Chillhop", "🛋️ Acoustic guitar"] },
  4: { mood: "Inspired", color: "text-pink-600", songs: ["🚀 Epic soundtrack", "🎸 Indie vibes", "🎤 Motivational pop"] },
  5: { mood: "Elated", color: "text-orange-600", songs: ["🎉 Party mix", "🥁 Dance beats", "🎺 Jazz fusion"] },
};

export const Bottom = () => {
  const [activeTab, setActiveTab] = useState("Journal");
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ MongoDB mood + playlist
  const [mood, setMood] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // ✅ Tasks & Journal
  const [tasks, setTasks] = useState([]);
  const [journalText, setJournalText] = useState("");

  // Fetch Mood from MongoDB
  const fetchMood = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/health");
      const data = await res.json();
      setMood(data.mood?.progress || null);
    } catch (err) {
      console.error("Error fetching mood:", err);
    }
  };

  useEffect(() => {
    fetchMood();
  }, []);

  // Save Journal
  const saveJournal = () => {
    if (!journalText.trim()) return;
    const newEntry = {
      id: Date.now(),
      title: "Journal Entry",
      content: journalText,
    };
    setTasks([...tasks, newEntry]);
    setJournalText("");
  };

  // Song controls
  const handleNext = () => {
    if (mood && playlists[mood]) {
      setCurrentSongIndex((prev) => (prev + 1) % playlists[mood].songs.length);
    }
  };

  const handlePrev = () => {
    if (mood && playlists[mood]) {
      setCurrentSongIndex((prev) =>
        (prev - 1 + playlists[mood].songs.length) % playlists[mood].songs.length
      );
    }
  };

  const currentPlaylist = playlists[mood] || null;

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Journal (2 cols) */}
      <motion.div
        className="lg:col-span-2 bg-gray-300 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col gap-4"
        whileHover={{ scale: 1.01 }}
      >
        {/* Tabs */}
        <div className="bg-purple-400 rounded-full p-1 flex">
          {["Journal", "Thought Garden", "Dream Assistant"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 px-4 py-2 rounded-full text-sm sm:text-base font-medium transition ${
                activeTab === tab
                  ? "bg-white text-purple-600 shadow"
                  : "text-white hover:bg-purple-500"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          placeholder="Describe your dream..."
          className="w-full h-28 sm:h-32 p-3 resize-none border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
        />

        {/* Save Button */}
        <motion.button
          onClick={saveJournal}
          whileTap={{ scale: 0.9 }}
          className="self-end bg-purple-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow hover:bg-purple-700"
        >
          Save Entry
        </motion.button>

        {/* Entries */}
        <div className="border-t pt-3 text-xs sm:text-sm text-gray-700 space-y-2">
          <AnimatePresence>
            {tasks.length > 0 ? (
              tasks.map((t) => (
                <motion.p
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="font-semibold">✍️ {t.title}: </span>
                  {t.content}
                </motion.p>
              ))
            ) : (
              <motion.p
                className="text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No journal entries yet.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mood Playlist Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-4"
          whileHover={{ scale: 1.03 }}
        >
          <h4 className="font-semibold text-sm sm:text-base text-gray-800">
            Mood ={" "}
            <span className={currentPlaylist?.color || "text-gray-600"}>
              {currentPlaylist?.mood || "Not Set"}
            </span>
          </h4>
          <p className="text-xs sm:text-sm text-gray-500">
            {currentPlaylist
              ? `Now playing: ${currentPlaylist.songs[currentSongIndex]}`
              : "No playlist available"}
          </p>

          {/* Controls */}
          {currentPlaylist && (
            <div>
              <div className="flex items-center justify-between mt-3">
                <button onClick={handlePrev}>
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-600 flex items-center justify-center text-white"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </motion.button>
                <button onClick={handleNext}>
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-2 w-full bg-gray-200 h-1.5 sm:h-2 rounded-full">
                <motion.div
                  className="h-full bg-purple-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: isPlaying ? "70%" : "0%" }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Hydration Reminder */}
        <motion.div
          className="bg-blue-200 rounded-2xl shadow-md p-4"
          whileHover={{ scale: 1.03 }}
        >
          <h4 className="font-semibold text-sm sm:text-base text-gray-800">
            Hydration Reminder 💧
          </h4>
          <p className="text-xs sm:text-sm text-gray-500">
            You typically forget to drink water after lunch — set a reminder.
          </p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="mt-2 bg-purple-600 text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:bg-purple-700"
          >
            Set Reminder
          </motion.button>
        </motion.div>

        {/* Activity Suggestion */}
        <motion.div
          className="bg-pink-200 rounded-2xl shadow-md p-4"
          whileHover={{ scale: 1.03 }}
        >
          <p className="text-xs sm:text-sm text-gray-700">
            Wanna show you amazing active effect with friend ✨
          </p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="mt-2 bg-purple-600 text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:bg-purple-700"
          >
            Try now →
          </motion.button>
        </motion.div>

        {/* Inspiration */}
        <motion.div
          className="bg-green-300 rounded-2xl shadow-md p-4"
          whileHover={{ scale: 1.03 }}
        >
          <p className="text-xs sm:text-sm text-gray-700">
            Feeling inspired? Let’s turn your thoughts into music today 🎶
          </p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="mt-2 text-purple-600 font-semibold text-xs sm:text-sm"
          >
            →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
