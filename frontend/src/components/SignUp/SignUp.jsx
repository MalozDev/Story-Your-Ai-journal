// src/components/SignUp/SignUp.jsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    title: location.state?.title || '',
    name: '',
    birthday: '',
    timezone: '',
    lifeWord: '',
    aiPersonality: '',
    email: '',
    password: '',
  });
  const [currentInput, setCurrentInput] = useState('');

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleContinue = () => {
    let updatedUserData = { ...userData };

    switch (currentStep) {
      case 1:
        updatedUserData.name = currentInput;
        break;
      case 2:
        updatedUserData.birthday = currentInput;
        break;
      case 3:
        updatedUserData.lifeWord = currentInput;
        break;
      case 4:
        updatedUserData.aiPersonality = currentInput;
        break;
      case 5:
        updatedUserData.email = currentInput;
        break;
      default:
        break;
    }

    setUserData(updatedUserData);
    setCurrentInput('');

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/welcome', { state: { userData: updatedUserData } });
    }
  };

  const getStepQuestion = () => {
    switch (currentStep) {
      case 1:
        return 'What should I call you?';
      case 2:
        return "When's your birthday? Where are you located?";
      case 3:
        return 'If you had to describe your life in one word?';
      case 4:
        return 'How should I interact with you? (Supportive, Direct, Curious, etc.)';
      case 5:
        return "Let's secure your journal! What's your email?";
      default:
        return '';
    }
  };

  const getInputConfig = () => {
    switch (currentStep) {
      case 1:
        return {
          type: 'text',
          placeholder: 'Your name...',
          autoFocus: true,
        };
      case 2:
        return {
          type: 'text',
          placeholder: 'Birthday & timezone...',
        };
      case 3:
        return {
          type: 'text',
          placeholder: 'One word...',
        };
      case 4:
        return {
          type: 'text',
          placeholder: 'AI personality preference...',
        };
      case 5:
        return {
          type: 'email',
          placeholder: 'Your email address...',
        };
      default:
        return {
          type: 'text',
          placeholder: '',
        };
    }
  };

  const inputConfig = getInputConfig();

  return (
    <div className='signup-container'>
      <div className='signup-header'>
        <h1 className='signup-title'>MyStory - Get Started</h1>
      </div>

      <div className='conversation-container'>
        <div className='ai-message'>
          <div className='ai-avatar'>🤖</div>
          <div className='message-bubble'>
            <p>
              Hey there! I'm Story, your personal memory companion. Before we
              begin, let's get to know each other!
            </p>
          </div>
        </div>

        <div className='ai-message'>
          <div className='ai-avatar'>🤖</div>
          <div className='message-bubble'>
            <p>{getStepQuestion()}</p>
          </div>
        </div>

        <div className='user-input-container'>
          <input
            type={inputConfig.type}
            value={currentInput}
            onChange={handleInputChange}
            placeholder={inputConfig.placeholder}
            className='user-input'
            autoFocus={inputConfig.autoFocus}
          />

          <button
            className='continue-button'
            onClick={handleContinue}
            disabled={!currentInput.trim()}
          >
            Continue
          </button>
        </div>
      </div>

      <div className='progress-container'>
        <div className='progress-text'>Sign-up Progress: {currentStep}/5</div>
        <div className='progress-dots'>
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`progress-dot ${currentStep === step ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
