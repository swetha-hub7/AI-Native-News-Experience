import React, { useState, useEffect, useRef } from 'react';
import { PlayCircle, Clock, Search, SlidersHorizontal, X, Globe, Sparkles, ArrowUpRight, Zap, RefreshCw, Download, ChevronRight } from 'lucide-react';
import { fetchFeed } from '../services/api';

const REPORTERS = [
  { id: 'maya', name: 'Maya', role: 'Business Anchor', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', voice: 'Professional' },
  { id: 'sam', name: 'Sam', role: 'Markets Expert', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', voice: 'Authoritative' },
  { id: 'ananya', name: 'Ananya', role: 'Startup Analyst', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=150', voice: 'Energetic' }
];

const REPORTER_VIDEO_PREVIEWS = {
  maya: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  sam: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  ananya: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
};

export default function VideoStudio() {
  const [selectedReporter, setSelectedReporter] = useState(REPORTERS[0]);
  const [feed, setFeed] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderedVideoUrl, setRenderedVideoUrl] = useState('');
  const [renderedVideoCaption, setRenderedVideoCaption] = useState('');
  const [renderStatus, setRenderStatus] = useState('');
  const [renderFailed, setRenderFailed] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchFeed('topStories').then(data => setFeed(data.slice(0, 5)));
  }, []);

  useEffect(() => {
    if (renderedVideoUrl && videoRef.current) {
      videoRef.current.load();
      const playResult = videoRef.current.play();
      if (playResult && playResult.catch) {
        playResult.catch(() => {
          setRenderStatus('Video ready. Press play if auto-play is blocked by the browser.');
        });
      }
    }
  }, [renderedVideoUrl]);

  const handleCreateBroadcast = () => {
    if (!selectedArticle) return;

    setIsRendering(true);
    setRenderProgress(0);
    setRenderedVideoUrl('');
    setRenderedVideoCaption('');
    setRenderStatus('Rendering is starting...');

    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);

          const previewUrl = REPORTER_VIDEO_PREVIEWS[selectedReporter.id] || 'https://www.w3schools.com/html/mov_bbb.mp4';
          setRenderedVideoUrl(previewUrl);
          setRenderedVideoCaption(`${selectedReporter.name} narrates the article: "${selectedArticle.title}"`);
          setRenderStatus('Rendering complete! Video is ready below.');
          setRenderFailed(false);

          return 100;
        }

        const next = prev + 5;
        setRenderStatus(`Rendering in progress... ${next}% complete`);
        return next;
      });
    }, 500);

    setTimeout(() => {
      if (renderProgress < 100) {
        setRenderFailed(true);
        setRenderStatus('Rendering may have timed out. Please try again.');
      }
    }, 12000);
  };

  return (
    <div className="fadeIn" style={{ maxWidth: '1200px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>AI Video Studio</h1>
        <p>Convert any business article into a high-quality news broadcast with AI news anchors.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 320px', gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>1. Select Reporter</h3>
          {REPORTERS.map(rep => (
            <div key={rep.id} onClick={() => setSelectedReporter(rep)} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px', background: selectedReporter.id === rep.id ? '#f1f5f9' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s' }}>
              <img src={rep.avatar} alt={rep.name} style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{rep.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{rep.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>2. Select Article</h3>
          {feed.map((item, idx) => (
             <div key={idx} onClick={() => setSelectedArticle(item)} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px', background: selectedArticle?.link === item.link ? '#f1f5f9' : 'white', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 700 }}>{item.title}</h4>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Breaking News • {new Date(item.pubDate).toLocaleTimeString()}</div>
             </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>3. Studio Dashboard</h3>
          <div className="card" style={{ padding: '2rem', textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem', background: '#f8fafc' }}>
            {isRendering ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                  <RefreshCw size={40} className="spin" color="#0b57d0" />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem' }}>{renderProgress}%</div>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Synthesizing "{selectedReporter.name}" video script for latest business data...</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <Zap size={48} color="#e2e8f0" />
                <button onClick={handleCreateBroadcast} disabled={!selectedArticle} style={{ width: '100%', background: selectedArticle ? '#0b57d0' : '#cbd5e1', color: 'white', padding: '1rem', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: selectedArticle ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  Start Rendering <PlayCircle size={18} />
                </button>
              </div>
            )}
              <p style={{ fontSize: '0.9rem', color: '#0b554a', fontWeight: 700, marginTop: '1rem' }}>{renderStatus}</p>

            {renderProgress === 100 && renderedVideoUrl && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{renderedVideoCaption}</h4>
                <video
                  ref={videoRef}
                  controls
                  muted
                  autoPlay
                  playsInline
                  onError={() => {
                    setRenderStatus('Video playback failed. Click Play to retry or use the link below.');
                  }}
                  style={{ width: '100%', maxHeight: '360px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                >
                  <source src={renderedVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p style={{ margin: 0, color: '#064e3b', fontWeight: 700 }}>Rendered video is ready and can be played directly above.</p>
                <button onClick={() => videoRef.current?.play()} style={{ background: '#0b57d0', color: '#fff', borderRadius: '10px', padding: '0.6rem 1rem', border: 'none', cursor: 'pointer' }}>Play</button>
                <a href={renderedVideoUrl} target="_blank" rel="noreferrer" style={{ color: '#0b57d0', textDecoration: 'underline' }}>Open source URL</a>
              </div>
            )}

            {!isRendering && renderProgress === 100 && !renderedVideoUrl && (
              <p style={{ color: '#b91c1c', fontWeight: 700 }}>No video URL was generated. Please try again.</p>
            )}

            {renderFailed && (
              <p style={{ color: '#b91c1c', fontWeight: 700 }}>Video load failed. Reload the page and try rerendering.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
