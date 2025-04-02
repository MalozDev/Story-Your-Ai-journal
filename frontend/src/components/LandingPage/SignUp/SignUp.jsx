import { useState } from 'react';
import './SignUp.css';

const SignUp = ({ initialTitle = '', onComplete }) => {
  // Track current step in the sign-up process
  const [currentStep, setCurrentStep] = useState(1);

  // Store user data across all steps
  const [userData, setUserData] = useState({
    title: initialTitle,
    name: '',
    birthday: '',
    timezone: '',
    lifeWord: '',
    aiPersonality: '',
    email: '',
    password: '',
  });

  // Store current input for the active step
  const [currentInput, setCurrentInput] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  // Handle continue to next step
  const handleContinue = () => {
    // Update userData based on current step
    let updatedUserData = { ...userData };

    switch (currentStep) {
      case 1:
        updatedUserData.name = currentInput;
        break;
      case 2:
        // In a real app, you'd parse this more carefully
        updatedUserData.birthday = currentInput;
        break;
      case 3:
        updatedUserData.lifeWord = currentInput;
        break;
      case 4:
        updatedUserData.aiPersonality = currentInput;
        break;
      case 5:
        // In a real app, you'd validate email format
        updatedUserData.email = currentInput;
        break;
      default:
        break;
    }

    setUserData(updatedUserData);
    setCurrentInput('');

    // Move to next step or complete
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // If we're at the last step, call the completion handler
      onComplete && onComplete(updatedUserData);
    }
  };

  // Get question text based on current step
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

  // Get input type and placeholder based on current step
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
