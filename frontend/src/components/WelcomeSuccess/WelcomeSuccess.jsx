// src/components/WelcomeSuccess/WelcomeSuccess.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './WelcomeSuccess.css';
import LottieAnimation from '../LottieAnimations/LottieAnimations';
import WelcomeAnimation from '../../assets/animations/welcome.json';

const WelcomeSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData || { name: 'Friend' };

  useEffect(() => {
    // Additional effect logic can go here
  }, []);

  const handleContinue = (action) => {
    if (action === 'write') {
      navigate('/dashboard', { state: { userData } });
    } else {
      navigate('/dashboard', { state: { userData } });
    }
  };

  return (
    <motion.div
      className='welcome-container'
      initial={{ opacity: 0, x: 100, rotateY: 90 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: -100, rotateY: -90 }}
      transition={{ duration: 0, ease: 'easeInOut' }}
    >
      <LottieAnimation
        animationData={WelcomeAnimation}
        width={280}
        className='signup-animation'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />

      <div className='welcome-header'>
        <h1 className='welcome-title'>Welcome On Board, {userData.name}</h1>
      </div>

      <div className='welcome-card'>
        <div className='ai-avatar'>🤖</div>
        <div className='welcome-message'>
          <p>Awesome! You're in.</p>
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
    </motion.div>
  );
};

export default WelcomeSuccess;
