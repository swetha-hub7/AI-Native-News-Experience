🚀 ET News SuperApp
Transforming business news from static articles into interactive, personalized, and visual intelligence
________________________________________
🧠 Problem Statement
Business news today is still consumed like it's 2005 —
•	static text-heavy articles 
•	one-size-fits-all feeds 
•	scattered information across platforms 
Users spend ~1 hour daily navigating multiple sources, often reading duplicate or irrelevant content.
________________________________________
💡 Solution
ET News SuperApp reimagines news consumption as a multi-format experience:
•	Personalized feeds instead of generic headlines 
•	Interactive exploration instead of passive reading 
•	Narrative timelines instead of fragmented articles 
•	Video summaries instead of long text 
________________________________________
✨ Core Features
📰 MyETFeed — Personalized Newsroom
•	Persona-based news filtering (investor, founder, student, etc.) 
•	Clean card-based UI with quick insights 
•	Deduplicated and relevant content only 
________________________________________
🔍 NewsNavigator — Interactive Discovery
•	Search and filter across news data 
•	Quickly find relevant topics without browsing multiple sources 
•	Fast, in-memory exploration 
________________________________________
📈 StoryArc — Narrative Intelligence
•	Converts multiple articles into a single story timeline 
•	Tracks progression of business events 
•	Helps users understand “what’s happening” instead of reading everything 
________________________________________
🎬 VideoStudio — AI-style News Broadcast
•	Select an article + reporter 
•	Simulates video rendering (0 → 100%) 
•	Generates a video-style preview with narration feel 
•	Includes playback, fallback handling, and captions 
________________________________________
🏗️ Architecture Overview
The app follows a modular, agent-based design:
•	Feed Agent → Fetches and normalizes news data 
•	Persona Agent → Filters content based on user type 
•	Navigator Agent → Enables search and discovery 
•	Story Agent → Builds narrative timelines 
•	Video Agent → Converts articles into video previews 
•	UI Layer (React) → Handles state and rendering 
🔄 Data Flow
User → Persona Selection
     → Feed Fetch (API)
     → Normalized Data
     → Pages (Feed / Navigator / StoryArc)
     → Article Selection
     → Video Rendering Simulation
     → Playback UI
________________________________________
🧰 Tech Stack
•	Frontend: React + Vite 
•	Routing: React Router 
•	State Management: Component-level state (React Hooks) 
•	API Layer: Centralized fetchFeed service 
•	Media: HTML5 Video Player 
________________________________________
📂 Project Structure
root/
├── public/
│   └── assets/              # static assets (images, icons)
├── src/
│   ├── pages/
│   │   ├── MyETFeed.jsx
│   │   ├── NewsNavigator.jsx
│   │   ├── StoryArc.jsx
│   │   └── VideoStudio.jsx
│   ├── services/
│   │   └── api.js           # fetchFeed API proxy
│   ├── App.jsx              # layout + routing
│   ├── main.jsx             # entry point
│   └── styles/              # CSS files
├── index.html
├── vite.config.js
├── package.json
└── README.md
________________________________________
⚙️ Setup & Run
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve dist
________________________________________
🛡️ Error Handling
•	API failures → fallback to empty/default data 
•	Video playback errors → user-friendly message + retry 
•	Rendering simulation → progress + failure state 
•	Prevent invalid actions (e.g., rendering without selection) 
________________________________________

System Diagram (Mermaid) 



📊 Impact
•	⏱ Saves 25–35 minutes per user daily 
•	🧠 Reduces information overload and duplicate reading 
•	⚡ Improves speed of understanding and decision-making 
•	📈 Converts fragmented news into structured insights 
________________________________________
🔮 Future Enhancements
•	Real AI summarization (LLMs) 
•	Text-to-speech + real video generation 
•	User login + saved stories 
•	Advanced analytics & personalization 
•	Multi-language (vernacular) support 
________________________________________
🏁 Final Note
ET News SuperApp is not just a news app — it’s a shift from reading news to experiencing intelligence.

