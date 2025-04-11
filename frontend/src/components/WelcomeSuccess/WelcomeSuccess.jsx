// src/components/WelcomeSuccess/WelcomeSuccess.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './WelcomeSuccess.css';

const WelcomeSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData || { name: 'Friend' };

  useEffect(() => {
    // You could add any animations or effects here
  }, []);

  const handleContinue = (action) => {
    if (action === 'write') {
      navigate('/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className='welcome-container'>
      <div className='welcome-header'>
        <h1 className='welcome-title'>MyStory</h1>
      </div>

      <div className='welcome-card'>
        <div className='ai-avatar'>🤖</div>
        <div className='welcome-message'>
          <p>Awesome, {userData.name}! You're in.</p>
          <p>Let's start documenting your story!</p>
        </div>

        <div className='welcome-actions'>
          <button
            className='action-button primary'
            onClick={() => handleContinue('write')}
          >
            Write First Entry
          </button>

          <button
            className='action-button secondary'
            onClick={() => handleContinue('explore')}
          >
            Explore
          </button>
        </div>
      </div>

      <div className='welcome-footer'>
        <p className='footer-text'>Your journey begins now!</p>
      </div>
    </div>
  );
};

export default WelcomeSuccess;
