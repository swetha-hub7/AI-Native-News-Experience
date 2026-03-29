import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Zap, BookOpen, Video, LineChart, Globe, Settings, Cpu } from 'lucide-react';
import MyETFeed from './pages/MyETFeed';
import NewsNavigator from './pages/NewsNavigator';
import StoryArc from './pages/StoryArc';
import VideoStudio from './pages/VideoStudio';

const PERSONAS = {
  founder: { id: 'founder', name: 'Founder', color: '#0b57d0', gradient: 'linear-gradient(135deg, #0b57d0, #01579b)' },
  investor: { id: 'investor', name: 'Investor', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  student: { id: 'student', name: 'Student', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
  policy: { id: 'policy', name: 'Policy Maker', color: '#64748b', gradient: 'linear-gradient(135deg, #64748b, #cbd5e1)' },
  techworker: { id: 'techworker', name: 'Tech Worker', color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
  retail: { id: 'retail', name: 'Retailer', color: '#f43f5e', gradient: 'linear-gradient(135deg, #f43f5e, #fb923c)' }
};

function Sidebar({ activePersona, setActivePersona }) {
  const location = useLocation();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const navItems = [
    { path: '/', name: 'My ET', icon: <Zap size={20} /> },
    { path: '/navigator', name: 'News Navigator', icon: <BookOpen size={20} /> },
    { path: '/storyarc', name: 'Story Arc', icon: <LineChart size={20} /> },
    { path: '/studio', name: 'Video Studio', icon: <Video size={20} /> }
  ];

  const currentPersona = PERSONAS[activePersona];

  return (
    <nav className="sidebar">
      <div className="logo">
        <div className="logo-et">ET</div>
        <div className="logo-text">SuperApp</div>
      </div>
      
      <div style={{ flex: 1, marginTop: '2rem' }}>
        {navItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>

      <div style={{ padding: '1rem 0.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(to bottom right, #10b981, #34d399)', overflow: 'hidden' }}></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>AI Agent Active</div>
        </div>
        <button onClick={() => setShowPersonaMenu(!showPersonaMenu)} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
          <Settings size={18} />
        </button>
        
        {showPersonaMenu && (
          <div style={{ position: 'absolute', bottom: '60px', left: '10px', right: '10px', background: 'white', borderRadius: '12px', padding: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', zIndex: 100 }}>
             {Object.values(PERSONAS).map(p => (
               <button
                 key={p.id}
                 onClick={() => { setActivePersona(p.id); setShowPersonaMenu(false); }}
                 style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: activePersona === p.id ? '#0b57d0' : '#64748b', fontWeight: activePersona === p.id ? 700 : 500 }}
               >
                 <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }}></div>
                 {p.name}
               </button>
             ))}
          </div>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [activePersona, setActivePersona] = useState('founder');

  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar activePersona={activePersona} setActivePersona={setActivePersona} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MyETFeed activePersona={activePersona} />} />
            <Route path="/navigator" element={<NewsNavigator />} />
            <Route path="/storyarc" element={<StoryArc />} />
            <Route path="/studio" element={<VideoStudio activePersona={activePersona} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
