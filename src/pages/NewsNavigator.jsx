import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Clock, Search, ExternalLink, X, PlayCircle, Sparkles, Cpu, Globe2, ArrowRight } from 'lucide-react';
import { fetchFeed } from '../services/api';

const MOCK_TRANSLATIONS = {
  hi: {
    title: "आर्थिक शिखर पर सेंसेक्स: नया रिकॉर्ड स्तर प्राप्त",
    desc: "घरेलू निवेश और वैश्विक संकेतों के बीच भारतीय शेयर बाजार में भारी उछाल। विशेषज्ञों का मानना है कि यह तेजी आने वाले हफ्तों में भी जारी रह सकती है।",
    fullContent: "भारतीय शेयर बाजार ने आज एक नया इतिहास रचते हुए अपने अब तक के उच्चतम स्तर को छू लिया है। सेंसेक्स में 400 अंकों से अधिक की बढ़ोतरी दर्ज की गई, जिसका मुख्य कारण घरेलू संस्थागत निवेशकों द्वारा की गई भारी खरीदारी है। विशेष रूप से आईटी और बैंकिंग क्षेत्रों में निवेशकों का उत्साह चरम पर देखा गया।\n\n[गहन विश्लेषण] हमारे क्षेत्रीय डेटा केंद्रों से प्राप्त जानकारी के अनुसार, यह विकास बाजार के बुनियादी ढांचे में एक गहरे बदलाव का संकेत देता है। विश्लेषकों का कहना है कि वैश्विक आपूर्ति श्रृंखला में सुधार और स्थिर ब्याज दरों ने निवेशकों के मनोबल को बढ़ाया है। आगामी तिमाही नतीजों से पहले बाजार में एक सकारात्मक वातावरण बना हुआ है।\n\n[भविष्य का अनुमान] अगले 12-18 महीनों में भारतीय अर्थव्यवस्था के विभिन्न क्षेत्रों में और अधिक विस्तार होने की संभावना है। हितधारकों को सलाह दी जाती है कि वे अपने पोर्टफोलियो में विविधता लाएं और दीर्घकालिक निवेश पर ध्यान केंद्रित करें। बाजार की वर्तमान स्थिति रणनीतिक निवेश के लिए एक उत्कृष्ट अवसर प्रदान करती है।"
  },
  ta: {
    title: "பொருளாதார உச்சத்தில் சென்செக்ஸ்: புதிய சாதனைப் பதிவு",
    desc: "உள்நாட்டு முதலீடுகள் மற்றும் உலகளாவிய சமிக்ஞைகளுக்கு மத்தியில் இந்திய பங்குச் சந்தையில் பெரும் ஏற்றம். இந்த உயர்வு வரும் வாரங்களிலும் தொடரக்கூடும் என்று நிபுணர்கள் கருதுகின்றனர்.",
    fullContent: "இந்திய பங்குச் சந்தை இன்று ஒரு புதிய வரலாற்றைப் படைத்துள்ளது, சென்செக்ஸ் இன்று தனது மிக உயர்ந்த அளவைத் தொட்டுள்ளது. உள்நாட்டு நிறுவன முதலீட்டாளர்களின் பெரும் கொள்முதல் காரணமாக சென்செக்ஸ் 400 புள்ளிகளுக்கு மேல் உயர்ந்துள்ளது. குறிப்பாக ஐடி மற்றும் வங்கித் துறைகளில் முதலீட்டாளர்களின் ஆர்வம் அதிகமாகக் காணப்பட்டது.\n\n[ஆழமான பகுப்பாய்வு] எங்கள் மண்டல தரவு மையங்களில் இருந்து பெறப்பட்ட தகவல்களின்படி, இந்த வளர்ச்சி சந்தையின் அடிப்படை கட்டமைப்பில் ஒரு ஆழமான மாற்றத்தைக் குறிக்கிறது. உலகளாவிய விநியோகச் சங்கிலியில் முன்னேற்றம் மற்றும் நிலையான வட்டி விகிதங்கள் முதலீட்டாளர்களின் நம்பிக்கையை அதிகரித்துள்ளதாக ஆய்வாளர்கள் கூறுகின்றனர். வரவிருக்கும் காலாண்டு முடிவுகளுக்கு முன்னதாக சந்தையில் ஒரு நேர்மறையான சூழல் நிலவுகிறது.\n\n[எதிர்கால கணிப்பு] அடுத்த 12-18 மாதங்களில் இந்தியப் பொருளாதாரத்தின் பல்வேறு துறைகளில் மேலும் விரிவாக்கம் ஏற்பட வாய்ப்புள்ளது. முதலீட்டாளர்கள் தங்கள் போர்ட்ஃபோலியோவை பல்வகைப்படுத்தவும், நீண்ட கால முதலீடுகளில் கவனம் செலுத்தவும் அறிவுறுத்தப்படுகிறார்கள். சந்தையின் தற்போதைய நிலை மூலோபாய முதலீடுகளுக்கு ஒரு சிறந்த வாய்ப்பை வழங்குகிறது."
  },
  te: {
    title: "ఆర్థిక శిఖరాగ్రాన సెన్సెక్స్: కొత్త రికార్డు స్థాయి నమోదు",
    desc: "దేశీయ పెట్టుబడులు మరియు గ్లోబల్ సిగ్నల్స్ మధ్య భారత స్టాక్ మార్కెట్ లో భారీ పెరుగుదల. ఈ పెరుగుదల రాబోయే వారాల్లో కూడా కొనసాగుతుందని నిపుణులు భావిస్తున్నారు.",
    fullContent: "భారత స్టాక్ మార్కెట్ ఈరోజు కొత్త చరిత్రను సృష్టించింది, సెన్సెక్స్ ఈరోజు తన అత్యున్నత స్థాయిని తాకింది. దేశీయ సంస్థాగత పెట్టుబడిదారులు చేసిన భారీ కొనుగోళ్ల కారణంగా సెన్సెక్స్ 400 పాయింట్ల కన్నా ఎక్కువ పెరిగింది. ముఖ్యంగా ఐటీ ఇంకా బ్యాంకింగ్ రంగాలలో పెట్టుబడిదారుల ఉత్సాహం ఎక్కువగా కనిపించింది.\n\n[లోతైన విశ్లేషణ] మా ప్రాంతీయ డేటా కేంద్రాల నుండి అందిన సమాచారం ప్రకారం, ఈ అభివృద్ధి మార్కెట్ ప్రాథమిక నిర్మాణంలో ఒక లోతైన మార్పును సూచిస్తుంది. గ్లోబల్ సరఫరా గొలుసులో మెరుగుదల మరియు స్థిరమైన వడ్డీ రేట్లు పెట్టుబడిదారుల నమ్మకాన్ని పెంచాయని విశ్లేషకులు చెబుతున్నారు. రాబోయే త్రైమాసిక ఫలితాలకు ముందు మార్కెట్లో సానుకూల వాతావరణం నెలకొంది.\n\n[భవిష్యత్తు అంచనా] వచ్చే 12-18 నెలలో భారత ఆర్థిక వ్యవస్థలోని వివిధ రంగాలలో మరింత విస్తరణ వచ్చే అవకాశం ఉంది. పెట్టుబడిదారులు తమ పోర్ట్‌ఫోలియోను వైవిధ్యపరుచుకోవాలని మరియు దీర్ఘకాలిక పెట్టుబడులపై దృష్టి సారించాలని సూచించడమైనది. మార్కెట్ ప్రస్తుత స్థితి వ్యూహాత్మక పెట్టుబడులకు ఒక అద్భుతమైన అవకాశాన్ని అందిస్తుంది."
  }
};

export default function NewsNavigator() {
  const [allArticles, setAllArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const [localTranslations, setLocalTranslations] = useState({});
  const [globalLang, setGlobalLang] = useState('');

  useEffect(() => {
    loadNewsPool();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const loadNewsPool = async () => {
    setLoading(true);
    const [top, tech, startups, markets] = await Promise.all([
      fetchFeed('topStories'),
      fetchFeed('tech'),
      fetchFeed('startups'),
      fetchFeed('markets')
    ]);
    const combined = [...top, ...tech, ...startups, ...markets];
    const unique = Array.from(new Set(combined.map(a => a.link)))
      .map(link => combined.find(a => a.link === link));
    setAllArticles(unique);
    setDisplayedArticles(unique.slice(0, 15));
    setLoading(false);
  };

  const handleGlobalTranslate = async (lang) => {
    setGlobalLang(lang);
    if (!lang) {
      setLocalTranslations({});
      return;
    }
    const newTranslations = {};
    displayedArticles.forEach((item, idx) => {
      const mock = MOCK_TRANSLATIONS[lang];
      const translatedFull = mock?.fullContent || item.fullContent.split('\n\n').map(p => `[${lang.toUpperCase()}] ` + p).join('\n\n');
      
      newTranslations[idx] = { 
        title: mock?.title || `[${lang.toUpperCase()}] ` + item.title, 
        desc: mock?.desc || `[${lang.toUpperCase()}] ` + item.description,
        fullContent: translatedFull,
        lang: lang
      };
    });
    setLocalTranslations(newTranslations);
  };

  const handleLocalTranslate = (idx, lang) => {
    if (!lang) {
      setLocalTranslations(prev => {
        const next = { ...prev };
        delete next[idx];
        return next;
      });
      return;
    }

    const item = displayedArticles[idx];
    const mock = MOCK_TRANSLATIONS[lang];
    const translatedFull = mock?.fullContent || item.fullContent.split('\n\n').map(p => `[${lang.toUpperCase()}] ` + p).join('\n\n');
    
    const translation = {
      title: mock?.title || `[${lang.toUpperCase()}] ` + item.title,
      desc: mock?.desc || `[${lang.toUpperCase()}] ` + item.description,
      fullContent: translatedFull,
      lang: lang
    };
    
    setLocalTranslations(prev => ({ ...prev, [idx]: translation }));
  };

  const getAIResponse = (userMsg) => {
    const msg = userMsg.toLowerCase();
    const filtered = allArticles.filter(a => a.title.toLowerCase().includes(msg) || a.description.toLowerCase().includes(msg));
    
    if (filtered.length > 0) {
      setDisplayedArticles(filtered.slice(0, 10));
      setLocalTranslations({});
      return `I've analyzed the live wire and found ${filtered.length} relevant intelligence nodes for "${userMsg}". I've updated your focal feed with the most significant developments.`;
    }
    
    return "I've scanned the indexed business feeds but no direct matches were found for that specific term. macro-sentiment analysis suggests broadening your query.";
  };

  const handleSend = () => {
    if (!query.trim()) return;
    const userMsg = query;
    setChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setQuery('');
    setIsTyping(true);
    setTimeout(() => {
      const assistantReply = getAIResponse(userMsg);
      setChat(prev => [...prev, { role: 'assistant', content: assistantReply }]);
      setIsTyping(false);
    }, 1200);
  };

  const formatTimestamp = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
    } catch { return "Live Wire"; }
  };

  return (
    <div className="fadeIn" style={{ height: 'calc(100vh - 8rem)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Global News Navigator</h1>
          <p style={{ color: '#64748b' }}>Talk to the ET live seed. Search and synthesize any news event with the Business AI.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', border: '1px solid #e2e8f0', shadow: '0 2px 4px rgba(0,0,0,0.02)', borderRadius: '12px', background: 'white' }}>
          <Globe2 size={18} color="#0b57d0" />
          <select 
            value={globalLang}
            onChange={(e) => handleGlobalTranslate(e.target.value)}
            style={{ border: 'none', background: 'transparent', fontWeight: 700, fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
          >
            <option value="">Full Feed Translation</option>
            <option value="hi">Hindi (हिन्दी)</option>
            <option value="ta">Tamil (தமிழ்)</option>
            <option value="te">Telugu (తెలుగు)</option>
          </select>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '2rem', flex: 1, overflow: 'hidden' }}>
        {/* Left Side: Syndicated Intelligence Feed */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', paddingRight: '0.75rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '12px', color: '#1a1a1a', fontWeight: 900 }}>
             <Radio size={14} className="pulse" /> Syndicated Intelligence
          </h3>
          {loading ? [1,2,3,4].map(i => <div key={i} className="card shimmer" style={{ height: '160px', marginBottom: '1.25rem', borderRadius: '16px' }}></div>) :
            displayedArticles.map((item, idx) => {
              const translation = localTranslations[idx];
              return (
                <div 
                  key={idx} 
                  className="card fadeIn" 
                  style={{ 
                    padding: '1.5rem', 
                    display: 'flex', 
                    gap: '1.75rem', 
                    cursor: 'pointer', 
                    transition: 'all 0.3s', 
                    background: 'white',
                    borderRadius: '20px',
                    border: '1px solid #f1f5f9',
                    minHeight: '160px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                  }} 
                  onClick={() => setSelectedArticle({ ...item, translated: translation })}
                >
                  <div style={{ 
                    width: '150px', 
                    height: '110px', 
                    borderRadius: '12px', 
                    backgroundImage: `url(${item.image}), url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800')`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    flexShrink: 0 
                  }}></div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '1rem' }}>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, lineHeight: 1.3, color: '#1a1a1a', flex: 1, margin: 0 }}>
                        {translation?.title || item.title}
                      </h4>
                      <div onClick={(e) => e.stopPropagation()} style={{ flexShrink: 0 }}>
                        <select 
                          onChange={(e) => handleLocalTranslate(idx, e.target.value)}
                          value={translation?.lang || ''}
                          style={{ 
                            padding: '0.35rem 0.6rem', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '8px', 
                            fontSize: '0.75rem', 
                            fontWeight: 800, 
                            background: '#f8fafc',
                            cursor: 'pointer',
                            outline: 'none',
                            color: '#0b57d0'
                          }}
                        >
                          <option value="">Translate</option>
                          <option value="hi">Hindi</option>
                          <option value="ta">Tamil</option>
                          <option value="te">Telugu</option>
                        </select>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.95rem', color: '#64748b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.6, marginBottom: '1rem', margin: '0 0 1rem 0' }}>
                      {translation?.desc || item.description}
                    </p>
                    <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: '#0b57d0', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Clock size={16} /> {formatTimestamp(item.pubDate)} <span style={{ color: '#e2e8f0' }}>|</span> <Radio size={14} className="pulse" /> LIVE STREAM
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>

        {/* Right Side: Chat Bot */}
        <div style={{ width: '420px', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', shadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
          <div style={{ padding: '1.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ background: '#0b57d0', padding: '0.6rem', borderRadius: '14px', shadow: '0 4px 10px rgba(11, 87, 208, 0.3)' }}>
              <Bot size={26} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.15rem', color: '#1e293b' }}>Navigator AI</div>
              <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span> High-Speed Synthesis
              </div>
            </div>
          </div>
          <div style={{ flex: 1, padding: '1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.75rem', background: '#fdfefe' }}>
            {chat.length === 0 && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#94a3b8', padding: '2.5rem' }}>
                 <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '50%', marginBottom: '2rem' }}>
                    <Search size={54} style={{ opacity: 0.15, color: '#0b57d0' }} />
                 </div>
                 <h4 style={{ color: '#1e293b', fontWeight: 900, fontSize: '1.25rem', marginBottom: '0.75rem' }}>Ask your queries</h4>
                 <p style={{ fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '250px' }}>Discover startup rounds, regulatory shifts, or global market trends instantly.</p>
              </div>
            )}
            {chat.map((msg, idx) => (
              <div key={idx} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', 
                background: msg.role === 'user' ? '#0b57d0' : 'white', 
                color: msg.role === 'user' ? 'white' : '#1e293b', 
                padding: '1.25rem 1.5rem', 
                borderRadius: '22px', 
                borderTopRightRadius: msg.role === 'user' ? '6px' : '22px', 
                borderTopLeftRadius: msg.role === 'assistant' ? '6px' : '22px', 
                border: msg.role === 'assistant' ? '1px solid #e2e8f0' : 'none', 
                maxWidth: '85%', 
                fontSize: '1rem', 
                fontWeight: 500, 
                lineHeight: 1.5,
                boxShadow: msg.role === 'user' ? '0 12px 20px -5px rgba(11, 87, 208, 0.4)' : '0 2px 5px rgba(0,0,0,0.03)' 
              }}>
                {msg.content}
              </div>
            ))}
            {isTyping && <div style={{ fontSize: '0.9rem', color: '#0b57d0', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '0.5rem' }}>
              <Cpu size={18} className="spin" /> Cross-referencing ET data lake...
            </div>}
            <div ref={chatEndRef} />
          </div>
          <div style={{ padding: '1.75rem', borderTop: '1px solid #f1f5f9', background: 'white', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}>
             <div style={{ display: 'flex', gap: '0.75rem', background: '#f1f5f9', padding: '0.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask Business Navigator..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '0 1.25rem', fontSize: '1.05rem', fontWeight: 600, color: '#1e293b' }} />
                <button onClick={handleSend} style={{ background: '#0b57d0', color: 'white', width: '48px', height: '48px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }} onMouseMove={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}><Send size={22} /></button>
             </div>
          </div>
        </div>
      </div>

      {/* Navigator Article Modal */}
      {selectedArticle && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div className="fadeIn" style={{ background: 'white', width: '100%', maxWidth: '900px', maxHeight: '95vh', overflowY: 'auto', borderRadius: '28px', position: 'relative', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.5)' }}>
            <button onClick={() => setSelectedArticle(null)} style={{ position: 'absolute', top: '1.75rem', right: '1.75rem', background: 'white', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, shadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
               <X size={28} />
            </button>
            <img src={selectedArticle.image} style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
            <div style={{ padding: '4.5rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0b57d0', fontWeight: 900, fontSize: '1rem', marginBottom: '1.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  <Sparkles size={24} /> Neural Intelligence Synthesis
               </div>
               <h1 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {selectedArticle.translated?.title || selectedArticle.title}
               </h1>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3.5rem', color: '#64748b', fontSize: '1.1rem', fontWeight: 700 }}>
                  <Clock size={22} /> {formatTimestamp(selectedArticle.pubDate)} <span style={{ color: '#e2e8f0' }}>•</span> Verified Business Node
               </div>
               <div style={{ fontSize: '1.25rem', lineHeight: 1.9, color: '#334155' }}>
                  <div style={{ background: '#f8fafc', padding: '3rem', borderRadius: '24px', borderLeft: '10px solid #0b57d0', marginBottom: '4rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
                    <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.5 }}>
                      {selectedArticle.translated?.desc || selectedArticle.description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {(selectedArticle.translated?.fullContent || selectedArticle.fullContent || "").split('\n').map((para, i) => para.trim() ? (
                      <p key={i}>{para}</p>
                    ) : null)}
                  </div>
                  <div style={{ marginTop: '5rem', pt: '3rem', borderTop: '2px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem', color: '#64748b', fontWeight: 700 }}>
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981', shadow: '0 0 12px rgba(16, 185, 129, 0.5)' }}></span>
                        Source Identification Verified
                     </div>
                     <a href={selectedArticle.link} target="_blank" rel="noreferrer" style={{ fontSize: '1.1rem', color: '#0b57d0', fontWeight: 900, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        Source Wire <ArrowRight size={22} />
                     </a>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper icons
function Radio({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8a6 6 0 0 1 0 8.4" />
      <path d="M19.2 4.8a10 10 0 0 1 0 14.4" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4" />
      <path d="M4.8 4.8a10 10 0 0 0 0 14.4" />
    </svg>
  );
}
