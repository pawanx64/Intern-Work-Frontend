
# Mood-Based Productivity Dashboard

This project is a React-based frontend for a productivity dashboard that adapts to your mood. It features journal entries, mood-based playlists, hydration reminders, activity suggestions, and inspiration prompts.

## Features

- **Journal & Thought Garden**: Write and save journal entries, thoughts, and dreams. Entries are displayed in a list for easy review.
- **Mood Playlist**: Automatically selects a playlist based on your current mood (fetched from a backend API). Includes play/pause and skip controls, with animated progress bar.
- **Hydration Reminder**: Friendly prompt to set a reminder to drink water after lunch.
- **Activity Suggestion**: Suggests fun activities to do with friends.
- **Inspiration Card**: Encourages you to turn your thoughts into music.

## Technologies Used

- React
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

## File Structure

```
frontend/
├── public/
│   └── ...
├── src/
│   ├── Components/
│   │   ├── Bottom.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── Pages/
│   │   └── Homes.jsx
│   ├── App.js
│   └── ...
├── package.json
└── README.md
```

## Getting Started

1. **Install dependencies:**
	```bash
	npm install
	```
2. **Start the development server:**
	```bash
	npm start
	```
3. **Backend API:**
	- The mood is fetched from `http://localhost:5000/api/health`. Make sure your backend is running and provides the required endpoint.

## Customization

- **Playlists:** You can edit the playlists per mood in `Bottom.jsx`.
- **Styling:** Tailwind CSS classes are used throughout for easy customization.

## License

MIT

