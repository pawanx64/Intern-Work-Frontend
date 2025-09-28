🌟 Health & Mood Tracker
A fullstack Health & Mood Tracking Web App to manage your daily goals, moods, and reflections — with a beautiful dashboard, playlists based on mood, and a personal journal.
⚡ Features
•	✅ Track health metrics: Steps, Water Intake, Sleep, Screen Time
•	✅ Log & visualize your Mood (Sad, Relaxed, Inspired, etc.)
•	✅ 🎶 Get Random Playlists based on your current mood
•	✅ ✍️ Maintain Journal, Thought Garden, Dream Assistant
•	✅ 💧 Hydration & Activity reminders
•	✅ 📊 Animated Dashboard with charts and progress rings
•	✅ ⚛️ Smooth UI/UX with Tailwind + Framer Motion
🛠️ Tech Stack
Frontend: React, TailwindCSS, Recharts, Framer Motion, Lucide-react
Backend: Node.js, Express.js, MongoDB (Mongoose)
📂 Project Structure
/backend   → Express server + MongoDB models + routes
/frontend  → React app (Dashboard, Navbar, Sidebar, Bottom components)
🚀 Setup & Installation
1️⃣ Clone Repository
git clone https://github.com/your-username/health-mood-tracker.git
cd health-mood-tracker
2️⃣ Backend Setup
cd backend
npm install

Create a .env file:
PORT=5000
MONGO_URI=mongodb://localhost:27017/healthtracker

npm start
3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev

Runs on 👉 http://localhost:5173
🔗 API Endpoints
GET /api/health → Fetch all health data
POST /api/health/:metric/target → Set a target (steps, water, sleep)
PUT /api/health/:metric/progress → Update progress
Example:
POST http://localhost:5000/api/health/steps/target
Body: { "target": 10000 }

PUT http://localhost:5000/api/health/steps/progress
Body: { "progress": 2500 }
🎨 Screens (UI Flow)
• Dashboard → Health goals, charts, progress circles
• Mood Tracker → Pick mood → Playlists update instantly
• Bottom Panel → Journal, Reminders, Activity Suggestions
• Sidebar + Navbar → Easy navigation
🤝 Contributing
1. Fork the repo
2. Create a feature branch → git checkout -b feature-name
3. Commit → git commit -m "Added feature"
4. Push → git push origin feature-name
5. Create a Pull Request 🚀
📜 License
MIT License © 2025
