import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import LottieAnimation from '../LottieAnimations/LottieAnimations';
import botSignupAnimation from '../../assets/animations/bot-puzzle.json';
import { registerUser } from '../../services/authService';
import './SignUp.css';

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    title: location.state?.title || '',
    name: '',
    birthday: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    lifeWord: '',
    aiPersonality: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [currentInput, setCurrentInput] = useState('');

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
    // Clear any previous errors when user starts typing
    if (error) setError('');
  };

  const handleContinue = async () => {
    let updatedUserData = { ...userData };
    let canProceed = true;

    switch (currentStep) {
      case 1: // Name
        if (currentInput.trim().length < 2) {
          setError('Please enter a valid name (at least 2 characters)');
          canProceed = false;
        } else {
          updatedUserData.name = currentInput;
        }
        break;
      case 2: // Birthday
        // Basic date validation
        if (!currentInput || !Date.parse(currentInput)) {
          setError('Please enter a valid date');
          canProceed = false;
        } else {
          updatedUserData.birthday = currentInput;
        }
        break;
      case 3: // Life word
        if (!currentInput.trim()) {
          setError('Please enter a word');
          canProceed = false;
        } else {
          updatedUserData.lifeWord = currentInput;
        }
        break;
      case 4: // AI Personality
        if (!currentInput.trim()) {
          setError('Please describe how I should interact with you');
          canProceed = false;
        } else {
          updatedUserData.aiPersonality = currentInput;
        }
        break;
      case 5: // Email
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(currentInput)) {
          setError('Please enter a valid email address');
          canProceed = false;
        } else {
          updatedUserData.email = currentInput;
        }
        break;
      case 6: // Password
        // Basic password strength validation
        if (currentInput.length < 6) {
          setError('Password must be at least 6 characters long');
          canProceed = false;
        } else {
          updatedUserData.password = currentInput;
        }
        break;
      case 7: // Confirm Password
        if (currentInput !== updatedUserData.password) {
          setError('Passwords do not match!');
          canProceed = false;
        } else {
          updatedUserData.confirmPassword = currentInput;
        }
        break;
      default:
        break;
    }

    if (!canProceed) return;

    setUserData(updatedUserData);
    setCurrentInput('');

    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - Register user with Firebase
      try {
        setIsLoading(true);
        await registerUser(updatedUserData.email, updatedUserData.password, updatedUserData);
        
        // Smooth route transition after successful registration
        setTimeout(() => {
          navigate('/welcome', { state: { userData: updatedUserData } });
        }, 300);
      } catch (error) {
        console.error('Registration error:', error);
        let errorMessage = 'Registration failed. Please try again.';
        
        // Handle specific Firebase auth errors
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already registered. Please use a different email or try logging in.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email format.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak. Please use a stronger password.';
        }
        
        setError(errorMessage);
        setIsLoading(false);
      }
    }
  };

  const getStepQuestion = () => {
    switch (currentStep) {
      case 1:
        return 'What should I call you?';
      case 2:
        return "When's your birthday?";
      case 3:
        return 'If you had to describe your life in one word?';
      case 4:
        return 'How should I interact with you? (Supportive, Direct, Curious, etc.)';
      case 5:
        return "Let's secure your journal! What's your email?";
      case 6:
        return 'Create a password for your journal';
      case 7:
        return 'Please confirm your password';
      default:
        return '';
    }
  };

  const inputConfig = (() => {
    switch (currentStep) {
      case 1:
        return { type: 'text', placeholder: 'Your name...', autoFocus: true };
      case 2:
        return { type: 'date', placeholder: '' };
      case 3:
        return { type: 'text', placeholder: 'One word...' };
      case 4:
        return { type: 'text', placeholder: 'AI personality preference...' };
      case 5:
        return { type: 'email', placeholder: 'Your email address...' };
      case 6:
        return { type: 'password', placeholder: 'Enter password...' };
      case 7:
        return { type: 'password', placeholder: 'Confirm password...' };
      default:
        return { type: 'text', placeholder: '' };
    }
  })();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      handleContinue();
    }
  };

  return (
    <motion.div
      className='signup-container'
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.95 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      <LottieAnimation
        animationData={botSignupAnimation}
        width={160}
        className='signup-animation'
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className='signup-header'>
        <h1 className='signup-title'>MyStory - Get Started</h1>
      </div>

      <div className='conversation-container'>
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='ai-message'
          >
            <div className='ai-avatar'>🤖</div>
            <div className='message-bubble'>
              <p>
                Hey there! I'm Story, your personal memory companion. Before we
                begin, let's get to know each other!
              </p>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentStep}
            className='ai-message'
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className='ai-avatar'>🤖</div>
            <div className='message-bubble'>
              <p>{getStepQuestion()}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='error-message'
          >
            <p>{error}</p>
          </motion.div>
        )}

        <div className='user-input-container'>
          <input
            type={inputConfig.type}
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={inputConfig.placeholder}
            className='user-input'
            autoFocus={inputConfig.autoFocus}
            disabled={isLoading}
          />
          <button
            className='continue-button'
            onClick={handleContinue}
            disabled={!currentInput.trim() || isLoading}
          >
            {isLoading ? 'Processing...' : currentStep === 7 ? 'Sign Up' : 'Continue'}
          </button>
        </div>
      </div>

      <div className='progress-container'>
        <div className='progress-text'>Sign-up Progress: {currentStep}/7</div>
        <div className='progress-dots'>
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              className={`progress-dot ${currentStep === step ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;