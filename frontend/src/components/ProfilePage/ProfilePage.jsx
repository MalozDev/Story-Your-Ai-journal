import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className='profile-page'>
      <header className='profile-header'>
        <h1>Your Profile</h1>
      </header>

      <div className='profile-content'>
        <p>Profile page coming soon...</p>
      </div>

      <nav className='bottom-nav'>
        <button className='nav-button' onClick={() => navigate('/dashboard')}>
          <span className='nav-icon'>🏠</span>
          <span className='nav-label'>Home</span>
        </button>
        <button className='nav-button active'>
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
        <button className='nav-button' onClick={() => navigate('/settings')}>
          <span className='nav-icon'>⚙️</span>
          <span className='nav-label'>Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default ProfilePage;
