import { useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [storyTitle, setStoryTitle] = useState('');

  const handleStartStory = () => {
    // Navigate to sign-up flow or store the title
    console.log('Starting story with title:', storyTitle);
    // Here you would typically use router navigation
    // e.g., navigate('/signup') or similar
  };

  return (
    <div className='landing-page'>
      <div className='logo-container'>
        <h1 className='logo'>MyStory</h1>
      </div>

      <div className='hero-section'>
        <p className='tagline'>
          "Your life is a story waiting to be written. Let's start documenting
          it together."
        </p>

        <div className='start-form'>
          <label htmlFor='story-title' className='question-label'>
            If your life had a title, what would it be?
          </label>
          <input
            id='story-title'
            type='text'
            className='title-input'
            value={storyTitle}
            onChange={(e) => setStoryTitle(e.target.value)}
            placeholder="Enter your life's title..."
          />
          <button
            className='start-button'
            onClick={handleStartStory}
            disabled={!storyTitle.trim()}
          >
            Start Your Story
          </button>
        </div>
      </div>

      <div className='benefits-section'>
        <ul className='benefits-list'>
          <li className='benefit-item'>
            <span className='benefit-icon'>🤖</span>
            AI helps you document your life effortlessly
          </li>
          <li className='benefit-item'>
            <span className='benefit-icon'>🎙️</span>
            Voice and text journaling with AI organization
          </li>
          <li className='benefit-item'>
            <span className='benefit-icon'>🕰️</span>
            Relive past moments with deep timeline dives
          </li>
        </ul>
      </div>

      <div className='preview-section'>
        <div className='preview-card'>
          <h3 className='preview-title'>Sample Story Preview</h3>
          <p className='preview-text'>
            "My journey began with a simple dream to connect stories across
            time. Each day brought new discoveries, challenges, and moments of
            joy..."
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
