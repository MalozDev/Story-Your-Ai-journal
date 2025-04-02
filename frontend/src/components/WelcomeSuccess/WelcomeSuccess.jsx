import { useEffect } from 'react';
import './WelcomeSuccess.css';

const WelcomeSuccess = ({ userData, onContinue }) => {
  // Optional animation on component mount
  useEffect(() => {
    // You could add any animations or effects here
  }, []);

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
            onClick={() => onContinue('write')}
          >
            Write First Entry
          </button>

          <button
            className='action-button secondary'
            onClick={() => onContinue('explore')}
          >
            Explore Features
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
