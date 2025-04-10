import './SettingsPage.css';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className='settings-page'>
      <header className='settings-header'>
        <h1>Settings</h1>
      </header>

      <div className='settings-content'>
        <p>Settings page will be here soon.</p>
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
        <button className='nav-button' onClick={() => navigate('/ai')}>
          <span className='nav-icon'>🤖</span>
          <span className='nav-label'>AI</span>
        </button>
        <button className='nav-button' onClick={() => navigate('/timeline')}>
          <span className='nav-icon'>📊</span>
          <span className='nav-label'>Timeline</span>
        </button>
        <button className='nav-button active'>
          <span className='nav-icon'>⚙️</span>
          <span className='nav-label'>Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default SettingsPage;
