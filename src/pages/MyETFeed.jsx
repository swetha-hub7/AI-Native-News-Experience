import React, { useState, useEffect } from 'react';
import { PlayCircle, Clock, Search, SlidersHorizontal, X, Globe, Sparkles, ArrowUpRight, Radio } from 'lucide-react';
import { fetchFeed } from '../services/api';

const PERSONA_CONFIGS = {
  founder: {
    headerContent: { personaRole: 'Founder', highlight: 'Daily Brief' },
    subtitle: 'Strategic intelligence on funding, tech trends, and competitor moves.',
    categories: ['investor', 'student', 'topStories', 'industry', 'markets'],
    getAiTag: (i) => ['Funding Alert', 'Competitor Move', 'Market Trend'][i % 3]
  },
  investor: {
    headerContent: { personaRole: 'Investor', highlight: 'Insight' },
    subtitle: 'Alpha signals, regulatory shifts, and institutional flow analysis.',
    categories: ['markets', 'topStories', 'wealth', 'economy', 'tech'],
    getAiTag: (i) => ['Yield Pulse', 'Institutional Flow', 'Macro Pivot'][i % 3]
  },
  student: {
    headerContent: { personaRole: 'Student', highlight: 'Learning Brief' },
    subtitle: 'Deconstructing complex business news into clear, actionable insights.',
    categories: ['economy', 'topStories', 'tech', 'startups', 'panache'],
    getAiTag: (i) => ['Concept Note', 'Basic Principle', 'Key Fact'][i % 3]
  },
  policy: {
    headerContent: { personaRole: 'Policy Maker', highlight: 'Strategic Radar' },
    subtitle: 'Structural shifts, economic policy, and governance updates.',
    categories: ['economy', 'topStories', 'markets', 'industry', 'tech'],
    getAiTag: (i) => ['Policy Pivot', 'Admin Update', 'Governance Node'][i % 3]
  },
  techworker: {
    headerContent: { personaRole: 'Tech Worker', highlight: 'Stack Intel' },
    subtitle: 'Engineering culture, architectural shifts, and AI ecosystem scaling.',
    categories: ['tech', 'startups', 'topStories', 'panache', 'industry'],
    getAiTag: (i) => ['Stack Alert', 'Dev Trend', 'Neural Node'][i % 3]
  },
  retail: {
    headerContent: { personaRole: 'Retailer', highlight: 'Supply Pulse' },
    subtitle: 'Tracking consumer demand, distribution shifts, and mid-market velocity.',
    categories: ['markets', 'industry', 'topStories', 'startups', 'panache'],
    getAiTag: (i) => ['Demand Signal', 'Supply Logic', 'Retail Pivot'][i % 3]
  }
};

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
    fullContent: "భారత స్టాక్ మార్కెట్ ఈరోజు కొత్త చరిత్రను సృష్టించింది, సెన్సెక్స్ ఈరోజు తన అత్యున్నత స్థాయిని తాకింది. దేశీయ సంస్థాగత పెట్టుబడిదారులు చేసిన భారీ కొనుగోళ్ల కారణంగా సెన్సెక్స్ 400 పాయింట్లకు పైగా పెరిగింది. ముఖ్యంగా ఐటీ మరియు బ్యాంకింగ్ రంగాలలో పెట్టుబడిదారుల ఉత్సాహం ఎక్కువగా కనిపించింది.\n\n[లోతైన విశ్లేషణ] మా ప్రాంతీయ డేటా కేంద్రాల నుండి అందిన సమాచారం ప్రకారం, ఈ అభివృద్ధి మార్కెట్ ప్రాథమిక నిర్మాణంలో ఒక లోతైన మార్పును సూచిస్తుంది. గ్లోబల్ సరఫరా గొలుసులో మెరుగుదల మరియు స్థిరమైన వడ్డీ రేట్లు పెట్టుబడిదారుల నమ్మకాన్ని పెంచాయని విశ్లేషకులు చెబుతున్నారు. రాబోయే త్రైమాసిక ఫలితాలకు ముందు మార్కెట్లో సానుకూల వాతావరణం నెలకొంది.\n\n[భవిష్యత్తు అంచనా] వచ్చే 12-18 నెలల్లో భారత ఆర్థిక వ్యవస్థలోని వివిధ రంగాలలో మరింత విస్తరణ వచ్చే అవకాశం ఉంది. పెట్టుబడిదారుల తమ పోర్ట్‌ఫోలియోను వైవిధ్యపరుచుకోవాలని మరియు దీర్ఘకాలిక పెట్టుబడులపై దృష్టి సారించాలని సూచించడమైనది. మార్కెట్ ప్రస్తుత స్థితి వ్యూహాత్మక పెట్టుబడులకు ఒక అద్భుతమైన అవకాశాన్ని అందిస్తుంది."
  }
};

export default function MyETFeed({ activePersona }) {
  const config = PERSONA_CONFIGS[activePersona] || PERSONA_CONFIGS.founder;
  
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(config.categories[0]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [localTranslations, setLocalTranslations] = useState({});
  const [globalLang, setGlobalLang] = useState('');

  useEffect(() => {
    if (!config.categories.includes(category)) {
      setCategory(config.categories[0]);
    }
    setLocalTranslations({}); 
    setGlobalLang('');
  }, [activePersona]);

  useEffect(() => {
    loadFeeds(category);
  }, [category, activePersona]);

  const loadFeeds = async (cat) => {
    setLoading(true);
    let data = await fetchFeed(cat);
    setFeed(data.slice(0, 10));
    setLoading(false);
  };

  const formatTimestamp = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleGlobalTranslate = async (lang) => {
    setGlobalLang(lang);
    if (!lang) {
      setLocalTranslations({});
      return;
    }
    const newTranslations = {};
    feed.forEach((item, idx) => {
      const mock = MOCK_TRANSLATIONS[lang];
      // Full recursive prefixing if no mock translation
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

    const item = feed[idx];
    const mock = MOCK_TRANSLATIONS[lang];
    
    // Full regional translation implementation
    const translatedFull = mock?.fullContent || item.fullContent.split('\n\n').map(p => `[${lang.toUpperCase()}] ` + p).join('\n\n');
    
    const translation = {
      title: mock?.title || `[${lang.toUpperCase()}] ` + item.title,
      desc: mock?.desc || `[${lang.toUpperCase()}] ` + item.description,
      fullContent: translatedFull,
      lang: lang
    };
    
    setLocalTranslations(prev => ({ ...prev, [idx]: translation }));
  };

  return (
    <div className="fadeIn" style={{ maxWidth: '1200px' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: '#f0f4ff', color: '#0b57d0', padding: '0.4rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', marginBottom: '1.5rem' }}>
            <Radio size={12} className="pulse" style={{ marginRight: '8px' }} /> LIVE INTELLIGENCE FEED
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem', color: '#1a1a1a', lineHeight: 1 }}>
            {config.headerContent.personaRole}
          </h1>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', color: '#1a1a1a', lineHeight: 1 }}>
            {config.headerContent.highlight}
          </h1>
          <p style={{ maxWidth: '450px', fontSize: '1.1rem', color: '#64748b' }}>{config.subtitle}</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
             <Globe size={18} color="#0b57d0" />
             <select 
               value={globalLang}
               onChange={(e) => handleGlobalTranslate(e.target.value)}
               style={{ border: 'none', background: 'transparent', fontWeight: 600, fontSize: '0.875rem', outline: 'none', cursor: 'pointer' }}
             >
                <option value="">Full Feed Translation</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="ta">Tamil (தமிழ்)</option>
                <option value="te">Telugu (తెలుగు)</option>
             </select>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {config.categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: category === cat ? 'white' : '#64748b',
                  background: category === cat ? '#0f172a' : 'transparent',
                  border: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
              >
                {cat.replace(/([A-Z])/g, ' $1').trim().charAt(0).toUpperCase() + cat.replace(/([A-Z])/g, ' $1').trim().slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {loading ? (
        <div className="feed-grid">
          {[1,2,3,4].map(i => <div key={i} className="card shimmer" style={{ height: '400px' }}></div>)}
        </div>
      ) : (
        <div className="feed-grid">
          {feed.map((item, idx) => {
            const translation = localTranslations[idx];
            return (
              <article 
                key={idx} 
                className="card fadeIn" 
                style={{ cursor: 'pointer', animationDelay: `${idx * 0.05}s` }}
                onClick={() => setSelectedArticle({ ...item, translated: translation })}
              >
                <div style={{ height: '220px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'white', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, color: '#1a1a1a', textTransform: 'uppercase' }}>
                    {config.getAiTag(idx)}
                  </div>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem' }} onClick={(e) => e.stopPropagation()}>
                    <select 
                      onChange={(e) => handleLocalTranslate(idx, e.target.value)}
                      value={translation?.lang || ''}
                      style={{ background: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                    >
                      <option value="">Translate</option>
                      <option value="hi">Hindi</option>
                      <option value="ta">Tamil</option>
                      <option value="te">Telugu</option>
                    </select>
                  </div>
                  <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '0.75rem 1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', color: 'white', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <Clock size={14} /> {formatTimestamp(item.pubDate)}
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', fontWeight: 700, lineHeight: 1.4 }}>
                    {translation?.title || item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {translation?.desc || item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Deep Link Modal */}
      {selectedArticle && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div className="fadeIn" style={{ background: 'white', width: '100%', maxWidth: '850px', maxHeight: '95vh', overflowY: 'auto', borderRadius: '20px', position: 'relative' }}>
            <button onClick={() => setSelectedArticle(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'white', border: '1px solid #e2e8f0', shadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
               <X size={24} />
            </button>
            <img src={selectedArticle.image} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            <div style={{ padding: '3.5rem' }}>
               <div style={{ color: '#0b57d0', fontWeight: 800, fontSize: '0.85rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={18} /> Regional Information Synthesis
               </div>
               <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1 }}>
                  {selectedArticle.translated?.title || selectedArticle.title}
               </h1>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', color: '#64748b', fontSize: '0.95rem', fontWeight: 600 }}>
                  <Clock size={18} /> {new Date(selectedArticle.pubDate).toLocaleString('en-IN')} • Verified Business Channel
               </div>
               <div style={{ fontSize: '1.15rem', lineHeight: 1.9, color: '#334155' }}>
                  <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', borderLeft: '6px solid #0b57d0', marginBottom: '3rem' }}>
                    <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#1e293b' }}>
                      {selectedArticle.translated?.desc || selectedArticle.description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {(selectedArticle.translated?.fullContent || selectedArticle.fullContent).split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  <div style={{ marginTop: '3.5rem', pt: '2rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span>
                        Source data verified against ET Live Wire
                     </div>
                     <a href={selectedArticle.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: '#0b57d0', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        View Original Article <ArrowUpRight size={16} />
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
