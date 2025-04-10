import './AIPage.css';
import { useNavigate } from 'react-router-dom';

const AIPage = () => {
  const navigate = useNavigate();

  return (
    <div className='ai-page'>
      <header className='ai-header'>
        <h1>AI Assistant</h1>
      </header>

      <div className='ai-content'>
        <p>Welcome to the AI page. More features coming soon!</p>
      </div>

      <nav className='bottom-nav'>
        <button className='nav-button' onClick={() => navigate('/dashboard')}>
          <span className='nav-icon'>🏠</span>
          <span className='nav-label'>Home</span>
        </button>
        <button className='nav-button' onClick={() => navigate('/profile')}>
          <span className='nav-icon'>👤</span>
          <span className='nav-label'>Profile</span>
        </button>
        <button className='nav-button active'>
          <span className='nav-icon'>🤖</span>
          <span className='nav-label'>AI</span>
        </button>
        <button className='nav-button' onClick={() => navigate('/timeline')}>
          <span className='nav-icon'>📊</span>
          <span className='nav-label'>Timeline</span>
        </button>
        <button className='nav-button' onClick={() => navigate('/settings')}>
          <span className='nav-icon'>⚙️</span>
          <span className='nav-label'>Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default AIPage;
