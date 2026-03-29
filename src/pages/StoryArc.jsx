import React from 'react';
import { Network, TrendingUp, AlertTriangle, Sparkles, Zap, ArrowRight, Clock } from 'lucide-react';

export default function StoryArc() {
  const events = [
    {
      date: 'Jan 24, 2023',
      title: 'The Hindenburg Report',
      desc: 'The initial report on the Adani Group was released, triggering a massive market sell-off and regulatory scrutiny.',
      sentiment: 'negative',
    },
    {
      date: 'Aug 15, 2023',
      title: 'Reliance Retail Expansion',
      desc: 'Reliance Retail raised $1B from Qatar Investment Authority, valuing the firm at over $100B.',
      sentiment: 'positive',
    },
    {
      date: 'Nov 10, 2023',
      title: 'UPI Global Expansion',
      desc: 'India expanded UPI to Singapore and France, marking a major milestone for Indian fintech on the world stage.',
      sentiment: 'positive',
    },
    {
      date: 'Feb 15, 2026',
      title: 'Zomato Record Profits',
      desc: 'The food tech giant reported record quarterly profits, signaling a sustainable turn for the consumer internet ecosystem.',
      sentiment: 'positive',
    },
    {
      date: 'Today',
      title: 'The Mid-Market Surge',
      desc: 'New data suggests Tier-2 and Tier-3 cities now contribute to 45% of total e-commerce growth in India.',
      sentiment: 'neutral',
    }
  ];

  return (
    <div className="fadeIn" style={{ maxWidth: '1000px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>The Market Story Arc</h1>
        <p>Visually synthesizing how major business stories have evolved over time with AI sentiment mapping.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '4rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '1.5rem', background: '#f8fafc' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={20} color="#0b57d0" />
              Sentiment Matrix
            </h3>
            <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              <div style={{ flex: 1, background: '#ef4444', height: '40%', borderRadius: '4px' }}></div>
              <div style={{ flex: 1, background: '#ef4444', height: '15%', borderRadius: '4px' }}></div>
              <div style={{ flex: 1, background: '#0b57d0', height: '60%', borderRadius: '4px' }}></div>
              <div style={{ flex: 1, background: '#0b57d0', height: '90%', borderRadius: '4px' }}></div>
              <div style={{ flex: 1, background: '#94a3b8', height: '70%', borderRadius: '4px' }}></div>
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', background: '#fffbeb', border: '1px solid #fde68a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#b45309', marginBottom: '0.75rem' }}>
              <Zap size={20} />
              <h4 style={{ fontWeight: 800 }}>AI Prediction</h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: 1.5 }}>Our models predict a major M&A event in the renewable energy sector within 45 days based on recent regulatory pivots.</p>
          </div>
        </div>

        <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative' }}>
          {events.map((evt, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-50px', top: '4px', width: '20px', height: '20px', borderRadius: '50%', background: evt.sentiment === 'positive' ? '#0b57d0' : evt.sentiment === 'negative' ? '#ef4444' : '#94a3b8', border: '4px solid white', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}></div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{evt.date}</div>
              <div className="card" style={{ padding: '1.5rem', borderLeft: `4px solid ${evt.sentiment === 'positive' ? '#0b57d0' : evt.sentiment === 'negative' ? '#ef4444' : '#94a3b8'}` }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>{evt.title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#475569' }}>{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
