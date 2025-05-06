import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import LottieAnimation from '../LottieAnimations/LottieAnimations';
import welcomeAnimation from '../../assets/animations/welcome-animation.json';
import './Welcome.css';

const Welcome = () => {
  const { currentUser, userProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Use data from location state or from auth context
    if (location.state?.userData) {
      setUserData(location.state.userData);
    } else if (userProfile) {
      setUserData(userProfile);
    } else if (!currentUser) {
      // Redirect to home if no user data
      navigate('/');
    }
  }, [location, currentUser, userProfile, navigate]);

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  if (!userData) {
    return (
      <div className="loading-container">
        <LottieAnimation 
          animationData={welcomeAnimation} 
          width={160} 
          className="welcome-loading-animation"
        />
        <p>Loading your journal...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="welcome-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div className="welcome-header">
        <h1 className="welcome-title">Welcome back!</h1>
      </div>
      
      <motion.div
        className="welcome-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="ai-avatar">
          <LottieAnimation 
            animationData={welcomeAnimation} 
            width={60} 
            className="welcome-animation"
          />
        </div>
        
        <div className="welcome-message">
          <p>Hello {userData.name}!</p>
          <p>Your {userData.aiPersonality.toLowerCase()} journal companion is ready to continue your "{userData.lifeWord}" journey.</p>
        </div>
        
        <div className="welcome-actions">
          <button
            className="action-button primary"
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Open Journal
          </button>
        </div>
      </motion.div>
      
      <div className="welcome-footer">
        <p className="footer-text">Time to capture today's moments</p>
      </div>
    </motion.div>
  );
};

export default Welcome;