import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ username = 'User' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get active tab from current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/ai')) return 'ai';
    if (path.includes('/timeline')) return 'timeline';
    if (path.includes('/settings')) return 'settings';
    return '';
  };
  const activeTab = getActiveTab();

  const handleTabClick = (route) => {
    navigate(route);
  };
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  const recentEntries = [
    {
      id: 1,
      date: 'April 2, 2025',
      title: 'Started building MyStory app',
      snippet:
        "Today I began working on my new app idea. I'm excited about the possibilities...",
      mood: 'happy',
      moodEmoji: '😊',
      hasCode: true,
    },
    {
      id: 2,
      date: 'April 1, 2025',
      title: 'Reflections on Q1',
      snippet:
        "Looking back at the first quarter of the year, I've made progress on...",
      mood: 'thoughtful',
      moodEmoji: '🤔',
      hasPhoto: true,
    },
  ];

  return (
    <div className='dashboard'>
      <div className='dashboard-content'>
        <header className='dashboard-header'>
          <h1>
            Good {getTimeOfDay()}, {username}
          </h1>
          <div className='profile-button' onClick={() => navigate('/profile')}>
            👤
          </div>
        </header>

        <section className='mood-visualization'>
          <div className='mood-graph'>
            <div className='mood-dots'>
              <span className='mood-dot happy'></span>
              <span className='mood-dot neutral'></span>
              <span className='mood-dot happy'></span>
              <span className='mood-dot reflective'></span>
              <span className='mood-dot happy'></span>
              <span className='mood-dot emotional'></span>
              <span className='mood-dot happy'></span>
            </div>
          </div>
        </section>

        <section className='daily-question'>
          <h2>Today's Question:</h2>
          <div className='question-card'>
            <p>How did your meeting go this morning?</p>
            <div className='question-actions'>
              <button className='action-button'>Answer</button>
              <button className='action-button secondary'>Skip</button>
            </div>
          </div>
        </section>

        <section className='quick-capture'>
          <h2>Quick Capture:</h2>
          <div className='capture-buttons'>
            <button className='capture-button'>
              <span className='capture-icon'>✏️</span>
              <span className='capture-label'>Write</span>
            </button>
            <button className='capture-button'>
              <span className='capture-icon'>🎙️</span>
              <span className='capture-label'>Record</span>
            </button>
            <button className='capture-button'>
              <span className='capture-icon'>📸</span>
              <span className='capture-label'>Photo</span>
            </button>
            <button className='capture-button'>
              <span className='capture-icon'>🤖</span>
              <span className='capture-label'>Ask AI</span>
            </button>
          </div>
        </section>

        <section className='recent-entries'>
          <h2>Recent Entries:</h2>
          <div className='entries-list'>
            {recentEntries.map((entry) => (
              <div key={entry.id} className='entry-card'>
                <div className='entry-header'>
                  <div className='entry-date'>{entry.date}</div>
                  <div className='entry-mood'>{entry.moodEmoji}</div>
                </div>
                <h3 className='entry-title'>{entry.title}</h3>
                <p className='entry-snippet'>{entry.snippet}</p>
                <div className='entry-indicators'>
                  {entry.hasPhoto && (
                    <span className='entry-indicator'>📷</span>
                  )}
                  {entry.hasCode && <span className='entry-indicator'>💻</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <nav className='bottom-nav'>
        <button
          className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleTabClick('home')}
        >
          <span className='nav-icon'>🏠</span>
          <span className='nav-label'>Home</span>
        </button>
        <button
          className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabClick('profile')}
        >
          <span className='nav-icon'>👤</span>
          <span className='nav-label'>Profile</span>
        </button>
        <button
          className={`nav-button ${activeTab === 'ai' ? 'active' : ''}`}
          onClick={() => handleTabClick('ai')}
        >
          <span className='nav-icon'>🤖</span>
          <span className='nav-label'>AI</span>
        </button>
        <button
          className={`nav-button ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => handleTabClick('timeline')}
        >
          <span className='nav-icon'>📊</span>
          <span className='nav-label'>Timeline</span>
        </button>
        <button
          className={`nav-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabClick('settings')}
        >
          <span className='nav-icon'>⚙️</span>
          <span className='nav-label'>Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
